import classNames from 'classnames'
export default function Button({
  className,
  children,
  leftIcon, 
  rightIcon,
  padding,
  ...props
}) {
  const btnStyle = classNames(
    className, 
    "inline-flex items-center justify-center hover:bg-opacity-90 rounded-md focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-opacity-90", 
    {"px-3 py-2": !padding}, padding)
  return (
    <button
      className={btnStyle}
      {...props}
    >
      <span className="mr-2">

      {leftIcon}
      </span>
      {children}
      <span className="ml-2">
      {rightIcon}

      </span>
    </button>
  );
}
