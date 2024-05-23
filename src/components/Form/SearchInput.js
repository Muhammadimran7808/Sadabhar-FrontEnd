import React, { useState } from "react";
import { useSearch } from "../../context/search";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

const SearchInput = () => {
  const [search, setSearch] = useSearch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/products/search/${search.keyword}`);
      setSearch({ ...search, result: res.data });
      navigate("/search");
    } catch (error) {
      console.log(error);
      toast.error("Some thing went wronge");
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative w-96 mobile:w-72 overflow-hidden">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search.keyword}
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            className="search-input block w-full p-4  ps-10 text-sm border rounded-3xl bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Products..."
            required
          />
          <button
            type="submit"
            className="overflow-hidden search-button text-white absolute end-[0px] mobile:end-[1px] bottom-[0px] mobile:bottom-[1px] font-medium rounded-3xl rounded-l-none rounded-bl-none md:text-sm text-xs md:px-4 px-2 md:py-[19px] py-[10px] bg-blue-600 hover:bg-blue-700"
          >
            {loading ? (
              <TailSpin height={18} width={16} color="#fff" />
            ) : (
              <svg
                className="w-4 h-4 text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
