
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  variant?: string; // Add the 'variant' prop to the ButtonProps type

  onClick?: () => void;
};


  const Button: React.FC<ButtonProps> = ({ children, type = "button", onClick }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  