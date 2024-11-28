import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../lib/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuthStore } from '../../stores/authStore';

const steps = ['Personal Details', 'Education & Career', 'Family Background', 'Partner Preferences'];

const personalDetailsSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  dateOfBirth: z.string(),
  gender: z.enum(['male', 'female']),
  maritalStatus: z.string(),
  religion: z.string(),
  community: z.string(),
  photo: z.any()
});

export default function ProfileWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(personalDetailsSchema)
  });

  const onSubmit = async (data: any) => {
    if (!user) return;

    try {
      let photoURL = '';
      if (data.photo[0]) {
        const photoRef = ref(storage, `profile-photos/${user.uid}`);
        const uploadResult = await uploadBytes(photoRef, data.photo[0]);
        photoURL = await getDownloadURL(uploadResult.ref);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        ...data,
        photoURL,
        profileComplete: currentStep === steps.length - 1
      });

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol role="list" className="flex items-center">
            {steps.map((step, index) => (
              <li key={step} className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                  index < currentStep ? 'bg-primary' : 
                  index === currentStep ? 'border-2 border-primary' : 
                  'border-2 border-gray-300'
                }`}>
                  <span className={`text-sm ${
                    index < currentStep ? 'text-white' : 
                    index === currentStep ? 'text-primary' : 
                    'text-gray-500'
                  }`}>
                    {index + 1}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {currentStep === 0 && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                {...register('fullName')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message as string}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                {...register('dateOfBirth')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                {...register('gender')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register('photo')}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
              />
            </div>
          </>
        )}

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            {currentStep === steps.length - 1 ? 'Complete Profile' : 'Next'}
          </button>
        </div>
      </form>
    </div>
  );
}