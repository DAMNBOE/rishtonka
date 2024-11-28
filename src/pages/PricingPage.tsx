import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { initializeRazorpayPayment, subscriptionPlans } from '../services/payment';
import { toast } from 'react-hot-toast';

export default function PricingPage() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<string | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function handleSubscribe(plan: typeof subscriptionPlans[0]) {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!scriptLoaded) {
      toast.error('Payment system is initializing. Please try again.');
      return;
    }

    try {
      setLoading(plan.id);
      await initializeRazorpayPayment({
        userId: user.uid,
        planId: plan.id,
        amount: plan.price,
        currency: 'INR',
        duration: plan.duration,
      });
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Unable to process payment. Please try again.');
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                plan.popular ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white'
              }`}
            >
              <h3 className={`text-lg font-semibold leading-8 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-gray-600">{plan.duration} months</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">₹{plan.price}</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className={`h-6 w-5 flex-none ${plan.popular ? 'text-white' : 'text-primary'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.id}
                className={`mt-8 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  plan.popular
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-primary text-white hover:bg-primary-dark focus-visible:outline-primary'
                }`}
              >
                {loading === plan.id ? 'Processing...' : 'Subscribe Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}