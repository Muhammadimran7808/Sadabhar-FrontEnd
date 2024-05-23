import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    try {
      const res = await axios.get("/api/v1/category/all-categories");
      if (res?.data?.success) {
        setCategories(res?.data?.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return categories; 
}
