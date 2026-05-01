type CourseReceiptEmailArgs = {
  amountNaira: number;
  courseTitle: string;
  customerName?: string | null;
  loginUrl: string;
  orderReference: string;
};

function formatNaira(amountNaira: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amountNaira);
}

export function renderCourseReceiptEmail({
  amountNaira,
  courseTitle,
  customerName,
  loginUrl,
  orderReference
}: CourseReceiptEmailArgs) {
  const safeName = customerName?.trim() || "there";
  const amount = formatNaira(amountNaira);

  const subject = `Your Famocity course access for ${courseTitle}`;

  const html = `
    <div style="margin:0; padding:32px 16px; background:#f3f6fb; font-family:Arial,Helvetica,sans-serif; color:#0b1f3a;">
      <div style="max-width:640px; margin:0 auto; background:#ffffff; border-radius:24px; overflow:hidden; border:1px solid #d9e2f2; box-shadow:0 20px 50px rgba(11,31,58,0.08);">
        <div style="padding:28px 32px 18px; background:linear-gradient(135deg,#0b1f3a 0%,#173763 100%);">
          <img src="https://famocitygroup.org/famocity-header-logo-cropped.png" alt="Famocity" style="display:block; max-width:280px; width:100%; height:auto;">
        </div>
        <div style="padding:32px;">
          <div style="display:inline-block; padding:10px 16px; border:1px solid #e4c770; border-radius:999px; font-size:12px; font-weight:700; letter-spacing:0.2em; text-transform:uppercase; color:#9b7b26;">
            Payment Successful
          </div>
          <h1 style="margin:22px 0 16px; font-size:36px; line-height:1.1; color:#0b1f3a;">Your course is ready.</h1>
          <p style="margin:0 0 14px; font-size:16px; line-height:1.8; color:#43536d;">
            Hello ${safeName},
          </p>
          <p style="margin:0 0 24px; font-size:16px; line-height:1.8; color:#43536d;">
            We have confirmed your payment for <strong>${courseTitle}</strong>. Your Famocity learner profile now has access to this course.
          </p>
          <div style="margin:0 0 24px; padding:20px 22px; background:#fbfcfe; border:1px solid #e8edf6; border-radius:20px;">
            <p style="margin:0 0 8px; font-size:13px; letter-spacing:0.16em; text-transform:uppercase; color:#9b7b26; font-weight:700;">Receipt Details</p>
            <p style="margin:0 0 8px; font-size:15px; color:#43536d;"><strong>Course:</strong> ${courseTitle}</p>
            <p style="margin:0 0 8px; font-size:15px; color:#43536d;"><strong>Amount:</strong> ${amount}</p>
            <p style="margin:0; font-size:15px; color:#43536d;"><strong>Reference:</strong> ${orderReference}</p>
          </div>
          <a href="${loginUrl}" style="display:inline-block; background:#0b1f3a; color:#ffffff; text-decoration:none; padding:16px 28px; border-radius:999px; font-weight:700; font-size:15px;">
            Open my dashboard
          </a>
        </div>
        <div style="padding:20px 32px 30px; border-top:1px solid #e8edf6; background:#fbfcfe;">
          <p style="margin:0; font-size:13px; line-height:1.8; color:#6b7a90;">
            Famocity Real Estate and Construction Limited<br>
            Ownership. Structure. Long-term value.
          </p>
        </div>
      </div>
    </div>
  `.trim();

  const text = [
    `Hello ${safeName},`,
    "",
    `We have confirmed your payment for ${courseTitle}.`,
    `Amount: ${amount}`,
    `Reference: ${orderReference}`,
    "",
    `Open your dashboard: ${loginUrl}`,
    "",
    "Famocity Real Estate and Construction Limited"
  ].join("\n");

  return {
    subject,
    html,
    text
  };
}
