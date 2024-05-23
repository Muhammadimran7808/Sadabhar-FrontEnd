import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import { useAuth } from "../../context/auth";
import AccountMenu from "./AccountMenu";
import SearchInput from "../Form/SearchInput";
import DropDown from "./DropDown";
import { BsCart3 } from "react-icons/bs";
import { useCart } from "../../context/cart";
import { Badge } from "antd";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [auth] = useAuth();
  const [cart] = useCart();

  return (
    <>
      <header
        className={`navbar text-gray-600 w-full bg-gray-900 sticky top-0 left-0 z-50`}
      >
        <div
          className="menu md:hidden z-10 w-6 h-5 flex justify-center items-center"
          onClick={() => setOpen(!isOpen)}
        >
          {isOpen ? (
            <CgClose size={25} color="#fff" />
          ) : (
            <HiBars3 size={30} color="#fff" />
          )}
        </div>

        {/* logo */}
        <div className="mx-auto flex px-2 md:p-5  items-center">
          <Link
            to={"/"}
            className="flex title-font items-center text-white mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-8 md:w-10 md:h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="md:ml-3 md:text-xl font-medium">SadaBahar</span>
          </Link>

          <div
            className={`abc container md:flex ${
              isOpen ? "block " : "hidden"
            } mx-auto  md:flex-row items-center`}
          >
            <nav
              className={`nav-elem md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l text-[#b7b7b7] md:border-white	flex flex-wrap items-center text-base justify-center gap-4`}
            >
              <NavLink to={"/"} className="hover:text-white">
                Home
              </NavLink>
              <DropDown />
              <NavLink to={"/about"} className="hover:text-white">
                About
              </NavLink>
              <NavLink to={"/contact"} className="hover:text-white">
                Contact
              </NavLink>
              <div className="mobile:hidden">
                <SearchInput />
              </div>
            </nav>
            <div className="flex gap-x-3 mr-4 text-white items-center">
              <Link className="mobile:hidden" to={"/cart"}>
                <Badge
                  count={cart?.length}
                  style={{
                    boxShadow: "none",
                    padding: "0px",
                    userSelect: "none",
                  }}
                >
                  <BsCart3
                    size={25}
                    className="text-[#b7b7b7] hover:text-white cursor-pointer"
                  />
                </Badge>
              </Link>
              {
                /*Displaying login, signUp and logout buttons according to user login state*/
                !auth.user ? (
                  <>
                    <Link
                      to={"/login"}
                      className="inline-flex uppercase items-center bg-indigo-500 border-0 py-2 px-3 hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                    >
                      Login
                    </Link>

                    <Link
                      to={"/register"}
                      className="text-white inline-flex uppercase items-center bg-indigo-500 border-0 py-2 px-3 hover:bg-indigo-600 rounded text-base mt-4 md:mt-0"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <AccountMenu />
                  </>
                )
              }
            </div>
          </div>
        </div>

        {isOpen ? (
          ""
        ) : (
          <div className="md:hidden search-and-cart lg:absolute md:top-3 md:left-[40%] flex items-center flex-wrap">
            <SearchInput />
            <div className="md:hidden  flex gap-x-3 mr-4 text-white items-center">
              <Link to={"/cart"}>
                <Badge
                  count={cart?.length}
                  style={{
                    boxShadow: "none",
                    padding: "0px",
                    userSelect: "none",
                  }}
                >
                  <BsCart3
                    size={25}
                    className="text-[#b7b7b7] hover:text-white cursor-pointer"
                  />
                </Badge>
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
