import { type Request, type Response } from "express";
import NodeCache from "node-cache";
import { connection } from "../conn.js";

const cache = new NodeCache();

// Mock API call to get shipment status based on carrier and tracking number
function getStatus(carrier: string, trackingNumber: string) {
  return Promise.resolve({
    carrier,
    trackingNumber,
    status: "In Transit",
    location: "PH Distribution Center",
  });
  // return Promise.reject(new Error(`Third-party API is down for ${carrier}`));
}

export async function getShipmentStatus(request: Request, response: Response) {
  const cacheKey = `shipment:${request.params.id}:last-location`;
  let shipment, shipmentApiResult;
  let shipmentCache = cache.get(cacheKey);

  const dbPromise = connection.query("SELECT * FROM shipments WHERE id = ?", [
    request.params.id,
  ]);

  const apiPromise = getStatus("LBC", "LBC-01");

  const [dbResultRes, apiResultRes] = await Promise.allSettled([
    dbPromise,
    apiPromise,
  ]);

  if (dbResultRes.status === "fulfilled") {
    shipment = dbResultRes.value[0];
    cache.set(cacheKey, dbResultRes.value[0] || null, 3600);
  } else {
    console.error(`DB API call error: ${dbResultRes.reason.message}`);
  }

  if (apiResultRes.status === "fulfilled") {
    console.log("apiResValue", apiResultRes.value);
    shipmentApiResult = apiResultRes.value;
  } else {
    console.error(`API call error: ${apiResultRes.reason.message}`);
  }

  response.json({
    shipment: shipment ?? {},
    lastKnownLocation: shipmentCache ?? [],
    liveStatus: shipmentApiResult ?? "Unknown",
  });
}
