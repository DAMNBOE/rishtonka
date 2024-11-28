export interface PaymentDetails {
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  duration: number;
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan?: string;
  expiryDate?: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
  popular?: boolean;
}