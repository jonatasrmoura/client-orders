import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  register: any;
  options: {
    value: string | number;
    label: string;
  }[];
}

export function Select({
  label,
  error,
  register,
  options,
  ...props
}: SelectProps) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <select
        {...props}
        {...register}
        className={`mt-1 block w-full rounded-md p-2 border ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        } shadow-sm focus:outline-none focus:ring-1`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
