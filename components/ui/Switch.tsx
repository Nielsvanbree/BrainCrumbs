interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  label?: string;
}

export function Switch({ checked, onCheckedChange, id, label }: SwitchProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onCheckedChange(!checked)}
        className={`
          relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-bc-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bc-dark
          ${checked ? 'bg-bc-purple' : 'bg-gray-700'}
        `}
      >
        <span className="sr-only">{label || 'Toggle setting'}</span>
        <span
          aria-hidden="true"
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${checked ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-300 cursor-pointer" onClick={() => onCheckedChange(!checked)}>
          {label}
        </label>
      )}
    </div>
  );
}
