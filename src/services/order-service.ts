import { type Request, type Response } from "express";
import { Team, Member } from "../models/order.js";

export async function getOrgTeamsWithMembers(
  request: Request,
  response: Response,
) {
  const org_id = Number(request.params.id);
  const teams = await Team.findAll({ where: { org_id }, include: Member });

  return response.json(teams);
}
