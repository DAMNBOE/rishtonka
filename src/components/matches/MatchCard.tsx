import { Link } from 'react-router-dom';
import type { Profile } from '../../types';
import { useAuthStore } from '../../stores/authStore';

interface Props {
  profile: Profile;
  compatibilityScore: number;
}

export default function MatchCard({ profile, compatibilityScore }: Props) {
  const { user } = useAuthStore();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={profile.photoUrl || '/default-avatar.png'}
          alt={profile.name}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{profile.name}</h3>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {compatibilityScore}% Match
          </span>
        </div>
        <dl className="mt-2 text-sm text-gray-500">
          <div className="flex gap-2">
            <dt>Age:</dt>
            <dd>{profile.age} years</dd>
          </div>
          <div className="flex gap-2">
            <dt>Location:</dt>
            <dd>{profile.location}</dd>
          </div>
          <div className="flex gap-2">
            <dt>Profession:</dt>
            <dd>{profile.profession}</dd>
          </div>
        </dl>
        {user?.isPremium ? (
          <Link
            to={`/profile/${profile.id}`}
            className="mt-4 block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark"
          >
            View Full Profile
          </Link>
        ) : (
          <Link
            to="/pricing"
            className="mt-4 block w-full text-center px-4 py-2 border border-primary rounded-md shadow-sm text-sm font-medium text-primary hover:bg-primary-light"
          >
            Upgrade to Connect
          </Link>
        )}
      </div>
    </div>
  );
}