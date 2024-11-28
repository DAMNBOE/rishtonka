import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const searchSchema = z.object({
  ageRange: z.object({
    min: z.number().min(18).max(70),
    max: z.number().min(18).max(70)
  }),
  religion: z.string(),
  community: z.string(),
  education: z.string(),
  location: z.string(),
  maritalStatus: z.string(),
});

type SearchFilters = z.infer<typeof searchSchema>;

interface Props {
  onFilter: (filters: SearchFilters) => void;
}

export default function SearchFilters({ onFilter }: Props) {
  const { register, handleSubmit } = useForm<SearchFilters>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      ageRange: { min: 21, max: 35 },
      religion: '',
      community: '',
      education: '',
      location: '',
      maritalStatus: '',
    }
  });

  return (
    <form onSubmit={handleSubmit(onFilter)} className="space-y-6 bg-white p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium text-gray-700">Age Range</label>
        <div className="mt-1 flex gap-4">
          <input
            type="number"
            {...register('ageRange.min', { valueAsNumber: true })}
            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
          <span className="text-gray-500">to</span>
          <input
            type="number"
            {...register('ageRange.max', { valueAsNumber: true })}
            className="block w-24 rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Religion</label>
        <select
          {...register('religion')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">Select Religion</option>
          <option value="hindu">Hindu</option>
          <option value="muslim">Muslim</option>
          <option value="christian">Christian</option>
          <option value="sikh">Sikh</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          {...register('location')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
          placeholder="Enter city or state"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Apply Filters
      </button>
    </form>
  );
}