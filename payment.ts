export interface PaymentData {
  amount: number;
  orderId: string;
  currency?: string;
  description?: string;
  email?: string;
}

export const createPayment = async (data: PaymentData) => {
  try {
    const response = await fetch('/api/create-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Payment creation failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
};

// Симуляция платежа для разработки
export const simulatePayment = (amount: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        transactionId: `txn_${Date.now()}`,
        amount,
      });
    }, 2000);
  });
};