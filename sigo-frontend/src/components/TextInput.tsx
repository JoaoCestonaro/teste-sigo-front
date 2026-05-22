type TextInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
};

export function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: TextInputProps) {
  return (
    <label className="text-sm text-slate-600">
      {label}
      <input
        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </label>
  );
}
