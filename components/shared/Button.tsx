
import React from 'react';

// Fix: Refactored the Button component to be polymorphic by supporting an `as` prop.
// This allows rendering it as different HTML elements, fixing the type error in
// CropHealthScanner.tsx where it was used with `as="span"`.
// The component is now a generic function to ensure type safety for the props
// of the rendered element.
type ButtonOwnProps<E extends React.ElementType> = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
  as?: E;
};

type ButtonProps<E extends React.ElementType> = ButtonOwnProps<E> &
  Omit<React.ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const Button = <E extends React.ElementType = 'button'>({
  children,
  variant = 'primary',
  className = '',
  as,
  ...otherProps
}: ButtonProps<E>) => {
  const Component = as || 'button';

  const baseClasses = 'px-4 py-2 rounded-lg font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    secondary: 'bg-gray-500 hover:bg-gray-600 focus:ring-gray-400',
  };

  return (
    <Component
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...otherProps}
    >
      {children}
    </Component>
  );
};

export default Button;
