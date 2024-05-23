import React from "react";
import useCategory from "../../hooks/useCategory";
import { Link } from "react-router-dom";

const DropDown = () => {
  const categories = useCategory();
  return (
    <div>
      <div className="dropdown inline-block relative">
        <button className="text-[#b7b7b7] rounded inline-flex items-center">
          <span className="span mr-1">Categories</span>
          <svg
            className="fill-current h-4 w-4 text-[#b7b7b7]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            {"{"}" "{"}"}
          </svg>
        </button>
        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
          {categories.map((c) => (
            <li key={c._id}>
              <Link
                className="bg-gray-100 hover:bg-blue-600 hover:text-white py-2 px-4 block whitespace-nowrap"
                to={`/category/${c.slug}`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
