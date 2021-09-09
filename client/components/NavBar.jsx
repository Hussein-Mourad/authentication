import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Menu from "./Menu";

export default function NavBar({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const handleMenu = () => {
    setIsMenuOpen((state) => {
      return !state;
    });
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef]);

  return (
    <header>
      <nav className="flex items-center justify-between">
        <Link href="/">
          <button>
            <Logo />
          </button>
        </Link>
        <div className="relative dark:text-gray-200">
          <button
            className="flex items-center focus:outline-none"
            ref={buttonRef}
            onClick={handleMenu}
          >
            {user.photo && (
              <img
                className="rounded-lg w-8 h-8"
                src={user.photo}
                alt="avatar"
              />
            )}
            <span className="ml-2 mr-1">{user?.name || user?.email}</span>
            {isMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </button>
          <Menu menuOpen={isMenuOpen} menuRef={menuRef} />
        </div>
      </nav>
    </header>
  );
}
