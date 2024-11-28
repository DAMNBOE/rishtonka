import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import type { Profile, PartnerPreferences } from '../types';

export async function findMatches(userProfile: Profile, page = 1, pageSize = 20) {
  const preferences = userProfile.preferences;
  const matchesRef = collection(db, 'profiles');
  
  // Build query based on preferences
  const q = query(
    matchesRef,
    where('age', '>=', preferences.ageRange.min),
    where('age', '<=', preferences.ageRange.max),
    where('religion', '==', preferences.religion),
    orderBy('createdAt', 'desc'),
    limit(pageSize)
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Profile));
}

export function calculateCompatibility(profile1: Profile, profile2: Profile): number {
  let score = 0;
  const maxScore = 100;
  
  // Basic matching criteria
  if (profile1.religion === profile2.religion) score += 20;
  if (profile1.education === profile2.education) score += 15;
  if (profile1.location === profile2.location) score += 15;
  
  // Age preference matching
  const age2 = profile2.age;
  if (
    age2 >= profile1.preferences.ageRange.min &&
    age2 <= profile1.preferences.ageRange.max
  ) {
    score += 15;
  }
  
  // Income range matching
  const income2 = parseInt(profile2.income);
  if (
    income2 >= profile1.preferences.incomeRange.min &&
    income2 <= profile1.preferences.incomeRange.max
  ) {
    score += 15;
  }
  
  // Additional criteria
  if (profile1.familyValues === profile2.familyValues) score += 10;
  if (profile1.motherTongue === profile2.motherTongue) score += 10;
  
  return Math.min(score, maxScore);
}