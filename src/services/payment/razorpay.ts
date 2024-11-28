import axios from 'axios';
import { toast } from 'react-hot-toast';
import type { PaymentDetails } from '../../types/payment';
import { updateUserSubscription } from './subscription';

export async function initializeRazorpayPayment(details: PaymentDetails) {
  try {
    const response = await createOrder(details);
    const options = createRazorpayOptions(details, response.data.id);
    
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment initialization failed:', error);
    toast.error('Unable to initialize payment. Please try again.');
  }
}

async function createOrder(details: PaymentDetails) {
  return axios.post('/api/create-order', {
    amount: details.amount * 100, // Razorpay expects amount in paise
    currency: details.currency,
  });
}

function createRazorpayOptions(details: PaymentDetails, orderId: string) {
  return {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: details.amount * 100,
    currency: details.currency,
    name: 'Rishton Ka Markaz',
    description: `${details.duration} months subscription`,
    order_id: orderId,
    handler: async (response: any) => handlePaymentSuccess(response, details),
    prefill: {
      name: 'User Name',
      email: 'user@example.com',
      contact: 'user_contact',
    },
    theme: {
      color: '#E91E63',
    },
  };
}

async function handlePaymentSuccess(response: any, details: PaymentDetails) {
  try {
    await verifyPayment(response);
    await updateUserSubscription(details.userId, details.planId, details.duration);
    toast.success('Payment successful! Your subscription is now active.');
  } catch (error) {
    toast.error('Payment verification failed. Please contact support.');
  }
}

async function verifyPayment(response: any) {
  return axios.post('/api/verify-payment', {
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature,
  });
}