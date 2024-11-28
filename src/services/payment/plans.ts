import type { SubscriptionPlan } from '../../types/payment';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 999,
    duration: 3,
    features: [
      'View up to 50 profiles',
      'Basic search filters',
      'Send 10 interests per month',
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 2499,
    duration: 6,
    features: [
      'Unlimited profile views',
      'Advanced search filters',
      'Unlimited interests',
      'Priority profile listing',
      'Direct contact information',
    ],
    popular: true
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 4999,
    duration: 12,
    features: [
      'All Premium features',
      'Relationship advisor',
      'Background verification',
      'Profile boost',
      'Premium badge',
    ],
  }
];