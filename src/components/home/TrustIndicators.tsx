const stats = [
  { id: 1, name: 'Happy Couples', value: '10,000+' },
  { id: 2, name: 'Success Rate', value: '89%' },
  { id: 3, name: 'Verified Profiles', value: '100,000+' },
  { id: 4, name: 'Active Members', value: '50,000+' },
];

export default function TrustIndicators() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by Thousands of Families
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Join India's most trusted matrimonial service with a proven track record of successful matches
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}