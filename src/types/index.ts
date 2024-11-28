export interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  location: string;
  religion: string;
  community: string;
  education: string;
  profession: string;
  about: string;
  photoUrl?: string;
  isPremium: boolean;
  createdAt: Date;
}

export interface Profile extends User {
  height: number;
  maritalStatus: string;
  motherTongue: string;
  familyType: string;
  familyValues: string;
  income: string;
  hobbies: string[];
  preferences: PartnerPreferences;
}

export interface PartnerPreferences {
  ageRange: { min: number; max: number };
  heightRange: { min: number; max: number };
  education: string[];
  profession: string[];
  location: string[];
  religion: string;
  community: string[];
  maritalStatus: string[];
  incomeRange: { min: number; max: number };
}