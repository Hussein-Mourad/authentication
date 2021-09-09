import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Footer from "./Footer";
import InputGroup from "./InputGroup";
import Logo from "./Logo";
import Spacer from "./Spacer";

const Icon = ({ src, alt, href }) => {
  return (
    <Link href={href}>
      <img
        src={src}
        alt={alt}
        className="inline-flex items-center justify-center rounded-full active:ring active:ring-gray-100 focus:outline-none cursor-pointer"
      />
    </Link>
  );
};

export default function AuthCard({
  title,
  subTitle,
  error,
  setError,
  children,
  buttonText,
  btnClickHandler,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form
      className="p-4 sm:p-8 flex flex-col rounded-lg sm:border sm:border-gray-300 w-full sm:max-w-md"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Logo />

      <h2 className="text-lg font-medium mt-5 text-gray-900 dark:text-gray-200">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 my-3">{subTitle}</p>
      <Spacer margin="my-2">
        <InputGroup
          type="email"
          placeholder="Email"
          leftIcon={<EmailIcon />}
          required
          value={email}
          id="email"
          error={error?.email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
        />
      </Spacer>
      <Spacer margin="my-2">
        <InputGroup
          type="password"
          placeholder="Password"
          leftIcon={<LockIcon />}
          required
          id="password"
          value={password}
          error={error?.password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Spacer>
      <small className="text-red-500 font-medium mt-1 dark:text-red-400">
        {error?.error}
      </small>
      <Button
        className="my-3 text-white dark:text-gray-200 bg-blue-500 font-medium 
        active:bg-blue-600 focus:ring focus:ring-blue-300 dark:focus:ring-blue-400"
        onClick={() => btnClickHandler(email, password)}
      >
        {buttonText}
      </Button>
      <div className="flex flex-col items-center text-gray-700 dark:text-gray-300 text-sm mt-3 sm:mt-5">
        <p>or continue with these social profile</p>
        <div className="grid grid-cols-4 gap-5 mt-4">
          <Icon href="/auth/google" src="/icons/Google.svg" alt="Google icon" />

          <Icon
            href="/auth/facebook"
            src="/icons/Facebook.svg"
            alt="Facebook icon"
          />
          <Icon
            href="/auth/twitter"
            src="/icons/Twitter.svg"
            alt="Twitter icon"
          />
          <Icon href="/auth/github" src="/icons/Github.svg" alt="Github icon" />
        </div>
        {children}
      </div>
      <Footer className="mt-5 flex sm:hidden max-w-md" />
    </form>
  );
}

AuthCard.defaultProps = {
  subTitle: "",
};
