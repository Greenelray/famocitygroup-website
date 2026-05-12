type CoursePurchaseFormProps = {
  disabled?: boolean;
  href: string;
};

export function CoursePurchaseForm({ disabled, href }: CoursePurchaseFormProps) {
  const isDisabled = disabled || !href.trim();

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`w-full ${isDisabled ? "pointer-events-none opacity-60" : ""}`}
      aria-disabled={isDisabled}
    >
      <span
        role="button"
        className="premium-button-accent inline-flex w-full"
      >
        {isDisabled ? "Selar link not added yet" : "Buy on Selar"}
      </span>
    </a>
  );
}
