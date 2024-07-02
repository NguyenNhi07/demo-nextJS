"use client";
import useSWR from "swr";
import customAxios from "../config/axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { UsersType } from "../config/type";
type MetaData = {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
};

function useUser() {
  const [limit, _setLimit] = useState(3);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const searchParams = useSearchParams();
  const {
    data: users,
    isLoading: loading,
    error,
    mutate,
    isValidating,
  } = useSWR<{
    data: { items: UsersType[]; meta: MetaData };
    status: number;
  }>(
    `/user/list?limit=${limit}&page=${page}&search=${search}`,
    async (url: string) => {
      const res = await customAxios.get(url);
      return res.data;
    }
  );

  useEffect(() => {
    setPage(Number(searchParams.get("page")) || 1);
    setSearch(searchParams.get("search") || "");
  }, [searchParams]);

  return {
    users: users?.data,
    loading: !error && !users,
    isError: error,
    mutate,
    isValidating,
  };
}

export default useUser;
