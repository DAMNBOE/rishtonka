import ProfileWizard from '../components/profile/ProfileWizard';

export default function ProfileCreationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-16">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Complete Your Profile
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Help us understand you better to find your perfect match
          </p>
        </div>
        <ProfileWizard />
      </div>
    </div>
  );
}