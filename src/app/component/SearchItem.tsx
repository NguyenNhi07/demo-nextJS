"use client";

import { useFormik } from "formik";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { mutate } from "swr";

function SearchItem() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  const formikSearch = useFormik({
    initialValues: {
      search: searchTerm,
    },
    onSubmit: async (values) => {
      mutate(`/department?search=${values.search}`);
    },
  });

  useEffect(() => {
    const debounceItemList = debounce(async (value: string) => {
      if (value) {
        router.push(`/department?search=${value}`);
        mutate(`/department?search=${value}`);
      }
    }, 1000);

    debounceItemList(formikSearch.values.search);
    return () => {
      debounceItemList.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formikSearch.values.search]);

  const handleInputChange = (e: any) => {
    setSearchTerm(e.target.value);
    formikSearch.setFieldValue("search", e.target.value);
  };

  return (
    <>
      <form onSubmit={formikSearch.handleSubmit} className="flex justify-end">
        <div className="flex w-[216px] h-[41px] rounded-[10px] bg-[#F9FBFF]">
          <div className="w-6 h-[25.89px] relative top-[11px] border-none bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="search-icon"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </div>
          <input
            type="text"
            className="border-none focus:outline-none ml-[9px]"
            placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
          />
        </div>
      </form>
    </>
  );
}

export default SearchItem;
