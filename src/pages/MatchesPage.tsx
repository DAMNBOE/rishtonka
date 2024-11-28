import { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import SearchFilters from '../components/search/SearchFilters';
import MatchCard from '../components/matches/MatchCard';
import { findMatches, calculateCompatibility } from '../services/matchService';
import type { Profile } from '../types';

export default function MatchesPage() {
  const { user } = useAuthStore();
  const [matches, setMatches] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadMatches();
    }
  }, [user]);

  async function loadMatches(filters = {}) {
    try {
      setLoading(true);
      const matchedProfiles = await findMatches(user as Profile);
      setMatches(matchedProfiles);
    } catch (error) {
      console.error('Error loading matches:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        <div className="lg:col-span-1">
          <SearchFilters onFilter={loadMatches} />
        </div>
        <div className="mt-8 lg:mt-0 lg:col-span-3">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((profile) => (
                <MatchCard
                  key={profile.id}
                  profile={profile}
                  compatibilityScore={calculateCompatibility(user as Profile, profile)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}