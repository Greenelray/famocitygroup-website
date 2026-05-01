import { renderCourseReceiptEmail } from "@/lib/email-templates";

function getResendApiKey() {
  return process.env.RESEND_API_KEY?.trim();
}

function getResendFromEmail() {
  return process.env.RESEND_FROM_EMAIL?.trim();
}

function getResendReplyTo() {
  return process.env.RESEND_REPLY_TO?.trim();
}

export function isResendConfigured() {
  return Boolean(getResendApiKey() && getResendFromEmail());
}

type SendCourseReceiptEmailArgs = {
  amountNaira: number;
  courseTitle: string;
  customerEmail: string;
  customerName?: string | null;
  loginUrl: string;
  orderReference: string;
};

export async function sendCourseReceiptEmail({
  amountNaira,
  courseTitle,
  customerEmail,
  customerName,
  loginUrl,
  orderReference
}: SendCourseReceiptEmailArgs) {
  const apiKey = getResendApiKey();
  const from = getResendFromEmail();

  if (!apiKey || !from) {
    throw new Error("Resend is not configured.");
  }

  const { html, subject, text } = renderCourseReceiptEmail({
    amountNaira,
    courseTitle,
    customerName,
    loginUrl,
    orderReference
  });

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": `course-receipt-${orderReference}`
    },
    body: JSON.stringify({
      from,
      to: [customerEmail],
      subject,
      html,
      text,
      reply_to: getResendReplyTo() || undefined
    }),
    cache: "no-store"
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend email failed: ${response.status} ${body}`);
  }

  return response.json();
}
