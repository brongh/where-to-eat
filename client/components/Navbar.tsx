import React, { useContext } from "react";
import Link from "next/link";
import Button from "./Button";
import { UserContext } from "../context/admin";
import { Users } from "../enums/user";

const Navbar = () => {
  const [context, setContext] = useContext(UserContext);

  const handleSwitchPermission = () => {
    if (context === Users.USER) {
      setContext(Users.ADMIN);
      return;
    }
    if (context === Users.ADMIN) {
      setContext(Users.USER);
      return;
    }
  };

  return (
    <nav className="w-full py-3 px-3 sticky top-0 border-b-2 border-black">
      <div className="w-full flex flex-row items-center justify-between">
        <Button
          color="teal"
          onClick={() => {
            handleSwitchPermission();
          }}
        >
          {context === Users.USER ? "Pseudo Login" : "Normal Login"}
        </Button>
        <Link href="/" passHref>
          <a>
            <h2>Where To Eat</h2>
          </a>
        </Link>
        {context === Users.ADMIN ? (
          <Link href="/new" passHref>
            <a>
              <Button color="green">Create</Button>
            </a>
          </Link>
        ) : (
          <div className="w-[150px]" />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
