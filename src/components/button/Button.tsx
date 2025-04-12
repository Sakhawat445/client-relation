type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-1.5 rounded-md text-sm font-medium transition duration-300";
  const variants = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    outline:
      "border border-purple-500 text-purple-600 hover:bg-purple-50 hover:border-purple-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
