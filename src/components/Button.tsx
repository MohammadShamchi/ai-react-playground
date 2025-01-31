type ButtonProps = {
    children: React.ReactNode;
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
};

const Button = ({ children, variant = 'primary', onClick }: ButtonProps) => {
    const baseClasses = 'px-4 py-2 rounded-md font-medium transition-colors';
    const variantClasses = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button; 