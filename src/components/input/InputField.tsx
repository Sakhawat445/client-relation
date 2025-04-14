interface InputFieldProps {
  type: string;
  name: string;
  id?: string; 
  className?: string;

  placeholder?: string;
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}
  const InputField: React.FC<InputFieldProps> = ({
    label,
    name,
    type,
    value,
    onChange,
    placeholder,
  }) => {
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          title={label}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    );
  };
  
  export default InputField;
  