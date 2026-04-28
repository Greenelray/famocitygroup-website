export type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
};

export type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: {
    status: string;
    reference: string;
    amount: number;
    currency: string;
    customer?: {
      email?: string;
    };
    metadata?: {
      courseSlug?: string;
      courseTitle?: string;
      customerName?: string;
    };
  };
};

function getSecretKey() {
  return process.env.PAYSTACK_SECRET_KEY;
}

export function isPaystackConfigured() {
  return Boolean(getSecretKey() && process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY);
}

export async function initializePaystackTransaction(payload: {
  email: string;
  amount: number;
  callback_url: string;
  metadata: Record<string, string>;
}) {
  const secret = getSecretKey();

  if (!secret) {
    throw new Error("Missing PAYSTACK_SECRET_KEY.");
  }

  const response = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload),
    cache: "no-store"
  });

  return (await response.json()) as PaystackInitializeResponse;
}

export async function verifyPaystackTransaction(reference: string) {
  const secret = getSecretKey();

  if (!secret) {
    throw new Error("Missing PAYSTACK_SECRET_KEY.");
  }

  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${secret}`
    },
    cache: "no-store"
  });

  return (await response.json()) as PaystackVerifyResponse;
}
