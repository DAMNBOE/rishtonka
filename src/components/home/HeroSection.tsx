import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl">
        <div className="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <div className="relative px-6 py-32 sm:py-40 lg:px-8 lg:py-56 lg:pr-0">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Where Relationships Begin
                <span className="block text-primary">Rishton Ka Markaz</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Find your perfect life partner from our vast community of verified profiles. 
                Start your journey towards a beautiful relationship today.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/register"
                  className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Create Free Profile
                </Link>
                <Link
                  to="/matches"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Browse Matches <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="Happy Indian couple"
        />
      </div>
    </div>
  );
}