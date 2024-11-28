import { db } from '../lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface PaymentDetails {
  userId: string;
  planId: string;
  amount: number;
  currency: string;
  duration: number;
}

export async function initializeRazorpayPayment(details: PaymentDetails) {
  try {
    // Create order on your backend
    const response = await axios.post('/api/create-order', {
      amount: details.amount * 100, // Razorpay expects amount in paise
      currency: details.currency,
    });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: details.amount * 100,
      currency: details.currency,
      name: 'Rishton Ka Markaz',
      description: `${details.duration} months subscription`,
      order_id: response.data.id,
      handler: async (response: any) => {
        try {
          // Verify payment on your backend
          await axios.post('/api/verify-payment', {
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });

          // Update user subscription in Firestore
          await updateUserSubscription(details.userId, details.planId, details.duration);
          
          toast.success('Payment successful! Your subscription is now active.');
        } catch (error) {
          toast.error('Payment verification failed. Please contact support.');
        }
      },
      prefill: {
        name: 'User Name',
        email: 'user@example.com',
        contact: 'user_contact',
      },
      theme: {
        color: '#E91E63',
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    toast.error('Unable to initialize payment. Please try again.');
  }
}

async function updateUserSubscription(userId: string, planId: string, duration: number) {
  const userRef = doc(db, 'users', userId);
  const subscriptionRef = doc(db, 'subscriptions', userId);

  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + duration);

  await setDoc(subscriptionRef, {
    planId,
    startDate: new Date(),
    expiryDate,
    status: 'active',
  });

  await updateDoc(userRef, {
    isPremium: true,
    currentPlan: planId,
  });
}

export async function checkSubscriptionStatus(userId: string) {
  const subscriptionRef = doc(db, 'subscriptions', userId);
  const subscriptionDoc = await getDoc(subscriptionRef);

  if (!subscriptionDoc.exists()) {
    return { isActive: false };
  }

  const subscription = subscriptionDoc.data();
  const now = new Date();
  const expiryDate = subscription.expiryDate.toDate();

  return {
    isActive: now < expiryDate,
    plan: subscription.planId,
    expiryDate,
  };
}