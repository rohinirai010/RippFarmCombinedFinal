import React from 'react';

export const CardHeader = ({
  cardId,
  className = '',
  children,
  onToggle,
  isExpanded,
  ...props
}) => {
  return (
    <div
      className={`
        flex flex-col space-y-1.5
        p-4
        bg-white/20 dark:bg-gray-900/20
        backdrop-blur-lg
        
        border border-white/30 dark:border-gray-800/30
        shadow-md
        dark:shadow-md dark:shadow-amber-200/10
        transition-all duration-300 ease-in-out
        rounded-t-2xl

        hover:bg-white/30 dark:hover:bg-gray-900/30
        ${!isExpanded ? 'rounded-b-2xl' : ''}
        relative
        before:absolute before:inset-0 
        before:bg-gradient-to-b before:from-white/10 before:to-transparent dark:before:from-gray-800/10
        before:rounded-t-3xl
        ${!isExpanded ? 'before:rounded-b-2xl' : ''}
        before:-z-10
        ${className}
      `}
      onClick={() => onToggle && onToggle(cardId)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ className = '', ...props }) => {
  return (
    <div
      className={`
        p-4
        bg-white/20 dark:bg-gray-900/20
        backdrop-blur-lg
        border border-white/30 dark:border-gray-800/30
        shadow-xl
        dark:shadow-md dark:shadow-amber-200/10
        transition-all duration-300
        rounded-b-2xl
        hover:bg-white/30 dark:hover:bg-gray-900/30
        relative
        before:absolute before:inset-0
        before:bg-gradient-to-b before:from-transparent before:to-white/10 dark:before:to-gray-800/10
        before:rounded-b-2xl
        before:-z-10
        ${className}
      `}
      {...props}
    />
  );
};

export const CardTitle = ({ className = '', ...props }) => {
  return (
    <h3
      className={`
        text-[15px]
        text-gray-700 dark:text-gray-100
        tracking-wider
        backdrop-blur-none
        ${className}
      `}
      {...props}
    />
  );
};

export const CardDescription = ({ className = '', ...props }) => {
  return (
    <p
      className={`
        text-[13px] tracking-wide
        text-gray-600 dark:text-gray-300
        backdrop-blur-none
        ${className}
      `}
      {...props}
    />
  );
};

export const CardFooter = ({ className = '', ...props }) => {
  return (
    <div
      className={`
        flex items-center justify-between
        px-6 py-4
        border-t border-white/30 dark:border-gray-800/30
        bg-white/10 dark:bg-gray-900/10
        backdrop-blur-sm
        ${className}
      `}
      {...props}
    />
  );
};

export default {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
};




export const Card = ({ className = '', ...props }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-900  
        border border-gray-100 dark:border-gray-800
        shadow-sm hover:shadow-md
        transition-all duration-300
        rounded-xl
        ${className}
      `}
      {...props}
    />
  );
};


export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground',
  };

  const variantStyles = variants[variant] || variants.default;

  return (
    <div
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};



// Dialog Components
export const Dialog = ({ children, open, onOpenChange }) => {
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center">
      <div className="bg-white  dark:bg-gray-800 rounded-lg  max-w-sm p-4 m-4">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children }) => {
  return <div className="space-y-4">{children}</div>;
};

export const DialogHeader = ({ children }) => {
  return <div className="space-y-1">{children}</div>;
};

export const DialogTitle = ({ children }) => {
  return <h2 className="text-lg font-semibold">{children}</h2>;
};

export const DialogFooter = ({ children }) => {
  return <div className="flex justify-end space-x-2">{children}</div>;
};

// Button Component
export const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default',
  className = '',
  asChild,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center text-xs rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50';
  
  const variants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  };
  
  const sizes = {
    default: 'h-9 px-4 py-2',
    sm: 'h-9 px-3',
    lg: 'h-11 px-8',
  };
  
  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  
  if (asChild) {
    return React.cloneElement(children, { 
      ...props,
      className: `${children.props.className} ${classes}`.trim()
    });
  }
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

// Input Component
export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`flex h-8 w-full mt-2 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Popover Components
export const Popover = ({ children, open, onOpenChange }) => {
  return (
    <div className="relative inline-block">
      {children}
    </div>
  );
};

export const PopoverTrigger = ({ children, asChild, ...props }) => {
  if (asChild) {
    return React.cloneElement(children, props);
  }
  return <div {...props}>{children}</div>;
};

export const PopoverContent = ({ 
  children, 
  className = '', 
  align = 'center',
  ...props 
}) => {
  return (
    <div 
      className={`absolute z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${
        align === 'start' ? 'left-0' : align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};












const Alert = React.forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
})
Alert.displayName = "Alert"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`text-sm [&_p]:leading-relaxed ${className}`}
      {...props}
    />
  )
})
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription }