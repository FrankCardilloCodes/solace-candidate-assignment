import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } catch (e) {
    throw new Error('Database failure');
  }
}
