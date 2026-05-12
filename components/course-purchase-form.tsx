type CoursePurchaseFormProps = {
  disabled?: boolean;
  href: string;
};

export function CoursePurchaseForm({ disabled, href }: CoursePurchaseFormProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`w-full ${disabled ? "pointer-events-none opacity-60" : ""}`}
      aria-disabled={disabled}
    >
      <span
        role="button"
        className="premium-button-accent inline-flex w-full"
      >
        Buy on Selar
      </span>
    </a>
  );
}
