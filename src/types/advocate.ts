export type Advocate = {
  [key: string]: number | string | string[];
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  phoneNumber: number;
  specialties: string[];
  yearsOfExperience: number;
};