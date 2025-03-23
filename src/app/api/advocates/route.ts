import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";

const filterSpecialties = (specialties: string[], searchTerm: string): boolean => {
  const lowerCaseSpecialties = specialties.map((specialty) => specialty.toLowerCase());
  const joinedSpecialties = lowerCaseSpecialties.join(' ');

  return joinedSpecialties.includes(searchTerm.toLowerCase());
};

const filterResults = (searchTermType: string, searchTerm: string, advocates: any[]) => {
  const filteredAdvocates = advocates.filter((advocate) => {
    if (searchTermType === 'specialty') {
      return filterSpecialties(advocate.specialties, searchTerm);
    }

    if (searchTermType === 'yearsOfExperience' || searchTermType === 'phoneNumber') {
      return advocate.yearsOfExperience.toString().includes(searchTerm);
    }

    if (typeof advocate[searchTermType] === 'string') {
      return advocate[searchTermType].toLowerCase().includes(searchTerm.toLowerCase());
    }

  });

  return filteredAdvocates;
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchTermType = searchParams.get('searchTermType');
    const searchTerm = searchParams.get('searchTerm');
    
    const data = await db.select().from(advocates);

    if (searchTermType && searchTerm) {
      const filteredData = filterResults(searchTermType, searchTerm, data);

      return Response.json({ data: filteredData });
    }

    return Response.json({ data });
  } catch (e) {
    throw new Error('Database failure');
  }
}
