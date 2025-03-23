import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { eq, ilike } from "drizzle-orm";

async function buildQuery(column: string, value: string) {
  let whereStatement = ilike(advocates.firstName, `%${value}%`);

  switch(column) {
    case 'city':
      whereStatement = ilike(advocates.city, `%${value}%`);
    case 'lastName':
      whereStatement = ilike(advocates.lastName, `%${value}%`);
    case 'degree':
      whereStatement = ilike(advocates.degree, `%${value}%`);
    // case 'phoneNumber':
    //   whereStatement = eq(advocates.phoneNumber, parseInt(value));
    // case 'specialties':
    //   whereStatement = ilike(advocates.specialties, `%${value}%`);
    // case 'yearsOfExperience':
    //   whereStatement = eq(advocates.yearsOfExperience, parseInt(value));
    default:
      break;
  }

  // getting a strange type error here, `from` returns record[] | never[]
  // cannot call `where` on type never[]
  // does not prevent compilation
  // seems like I am returning no records regardless of search query
  return await db.select().from(advocates); // .where(whereStatement);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const column = searchParams.get('searchTermType');
    const value = searchParams.get('searchTerm');

    if (column && value) {
      const data = await buildQuery(column, value);
      return Response.json({ data });
    }
    
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } catch (e) {
    throw new Error('Database failure');
  }
}
