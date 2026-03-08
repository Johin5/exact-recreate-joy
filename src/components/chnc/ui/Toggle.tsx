interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function Toggle({ checked, onChange, className = '' }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`
        relative inline-flex h-[20px] w-[36px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none
        ${checked ? 'bg-brand-dark' : 'bg-muted-foreground/40'}
        ${className}
      `}
    >
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-background shadow ring-0 transition duration-200 ease-in-out
          ${checked ? 'translate-x-[16px]' : 'translate-x-0'}
        `}
      />
    </button>
  );
}