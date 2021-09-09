import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import classNames from "classnames";
import Router from "next/router";
import { logUserOut } from "services/authServices";
import Button from "./Button";

const MenuItem = ({ text, icon, className, onClick }) => {
  return (
    <Button
      className={`!justify-start hover:bg-gray-100 active:bg-gray-200 dark:hover:bg-gray-600 dark:active:bg-gray-700 w-full ${className}`}
      onClick={onClick}
      leftIcon={icon}
    >
      {text}
    </Button>
  );
};
export default function Menu({ menuOpen, menuRef }) {
  const style = classNames(
    "p-1 bg-white dark:bg-[#333] rounded-lg border border-gray-300 absolute right-0 w-44 mt-3 text-sm text-gray-700 dark:text-gray-200",
    { hidden: !menuOpen }
  );

  return (
    <div className={style} ref={menuRef}>
      <MenuItem
        icon={<AccountCircleIcon />}
        text="My Profile"
        onClick={() => Router.push("/")}
      />
      <hr className="my-1 mx-2" />
      <MenuItem
        className="text-red-500 dark:text-red-400 "
        icon={<ExitToAppIcon />}
        onClick={() => {
          logUserOut((done, error) => Router.push("/login"));
        }}
        text="Logout"
      />
    </div>
  );
}
