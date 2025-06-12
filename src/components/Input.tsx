interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  register: any;
}

export function Input({ label, error, register, ...props }: InputProps) {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        {...register}
        className={`mt-1 block w-full rounded-md p-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } shadow-sm`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}