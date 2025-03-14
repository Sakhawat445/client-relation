
type ButtonProps = {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
};


  const Button: React.FC<ButtonProps> = ({ children, type = "button" }) => {
    return (
      <button
        type={type}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300"
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  