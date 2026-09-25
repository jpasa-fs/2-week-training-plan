import { type Request, type Response } from "express";
import NodeCache from "node-cache";
import { connection } from "../conn.js";

const cache = new NodeCache();

// Simulated third-party pricing API that is down
const thirdPartyPricingApi = {
  getCurrentPrice: async (sku: string) => {
    return Promise.reject(new Error(`Third-party API is down ${sku}`));
  },
};

// Get order cache
function getCache(id: string | string[] | undefined): [] {
  return cache.get(`order:${id}`) ?? [];
}

// Set order cache after DB call
function setCache(response: any): void {
  const id = response[0].order_id;
  cache.set(`order:${id}`, response);
}

export async function getOrderSummary(request: Request, response: Response) {
  try {
    let dbResult, cacheResult, pricingResult;

    const dbPromise = connection.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [request.params.id],
    );
    const pricingApiPromise = thirdPartyPricingApi.getCurrentPrice("100-ABC");

    const [dbResultRes, pricingResultRes] = await Promise.allSettled([
      dbPromise,
      pricingApiPromise,
    ]);

    if (dbResultRes.status === "fulfilled") {
      dbResult = dbResultRes.value[0];
      setCache(dbResult);
      cacheResult = getCache(request.params.id);
    } else {
      console.error(`DB API call error: ${dbResultRes.reason.message}`);
    }

    if (pricingResultRes.status === "fulfilled") {
      console.log("pricingResValue", pricingResultRes.value);
      pricingResult = pricingResultRes.value;
    } else {
      console.error(
        `Pricing API call error: ${pricingResultRes.reason.message}`,
      );
    }

    response.json({
      order: dbResult ?? [],
      cached: cacheResult ?? [],
      livePrice: pricingResult ?? [],
    });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
