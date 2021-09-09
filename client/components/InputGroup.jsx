import classNames from "classnames";

export default function InputGroup({
  className,
  inputClassName,
  leftIcon,
  rightIcon,
  label,
  error,
  multiline,
  margin,
  ...props
}) {
  const mainStyle = classNames(
    className,
    "relative border border-gray-300 rounded-md text-gray-700 focus-within:border-blue-500"
  );
  const inputStyle = classNames(
    inputClassName,
    "border-none w-full rounded-md focus:ring-0 bg-transparent",
    { "pl-12": leftIcon },
    { "pr-12": rightIcon }
  );
  const textAreaStyle = classNames(
    inputClassName,
    "border border-gray-300 rounded-md text-gray-500 focus-within:border-blue-500 bg-transparent"
  );

  if (multiline) {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="text-sm dark:text-gray-200" htmlFor={label}>
            {label}
          </label>
        )}
        <textarea
          id={label ?? ""}
          className={textAreaStyle}
          style={{ resize: "none" }}
          {...props}
        />
        {error && <small className="text-red-500 dark:text-red-400 ">{error}</small>}
      </div>
    );
  }
  return (
    <div>
      {label && (
        <label className="text-sm dark:text-gray-200" htmlFor={label}>
          {label}
        </label>
      )}
      <div className={mainStyle}>
        <i className="absolute top-1/2 left-3 transform -translate-y-1/2 ">
          {leftIcon}
        </i>
        <input
          id={label ?? ""}
          className={inputStyle}
          {...props}
        />
        <i className="absolute top-1/2 right-3 transform -translate-y-1/2">
          {rightIcon}
        </i>
      </div>
      {error && <small className="text-red-500 dark:text-red-400 ">{error}</small>}
    </div>
  );
}

InputGroup.defaultProps = {
  leftIcon: "",
  rightIcon: "",
  className: "",
  inputClassName: "",
  label: "",
  margin: "",
  error: false,
  multiline: false,
};
