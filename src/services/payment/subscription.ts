import { db } from '../../lib/firebase';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import type { SubscriptionStatus } from '../../types/payment';

export async function updateUserSubscription(userId: string, planId: string, duration: number) {
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

export async function checkSubscriptionStatus(userId: string): Promise<SubscriptionStatus> {
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