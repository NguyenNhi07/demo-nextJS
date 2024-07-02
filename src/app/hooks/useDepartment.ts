// hooks/useDepartments.js
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import customAxios from "../config/axios";
import { DepartmentType } from "../config/type";

type MetaData = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

function useDepartments({
  limit = 3,
  getAll = false,
}: { limit?: number; getAll?: boolean } = {}) {
  const [page, setPage] = useState<number>(1);

  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();

  const {
    data: departments,
    isLoading,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data: { items: DepartmentType[]; meta: MetaData };
    status: number;
  }>(
    `/department/list?limit=${limit}&page=${page}&search=${search}`,
    async (url: string) => {
      const res = await customAxios.get(url);
      return res.data;
    }
  );

  useEffect(() => {
    getAll ? setPage(1) : setPage(Number(searchParams.get("page")) || page);

    getAll ? setSearch("") : setSearch(searchParams.get("search") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    departments: departments?.data,
    isLoading: !error && !departments,
    isError: error,
    mutate,
    isValidating,
    page,
  };
}

export default useDepartments;
