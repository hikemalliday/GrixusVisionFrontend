import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";

interface IPaginatedHook<T> {
  count: number;
  data: T[];
  error: Record<string, unknown>;
  isLoading: boolean;
  dbFile: string;
  page: number;
  pageCount: number;
  pageSize: number;
  pageZeroIndex: number;
  setPageSize: CallableFunction;
  handlePageChangeIncrement: (e: unknown, page: number) => void;
  handlePageChangeDecrement: (e: unknown, page: number) => void;
  handlePageSizeChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  reload: () => void;
}

interface IPaginatedHookResponse<T> {
  action: CallableFunction;
  initial?: T[];
  page?: number;
  size?: number;
  charName?: string;
  itemNamePagination?: string;
}

export function usePagination<T>({
  action,
  page = 1,
  size = 100,
  charName = "",
  itemNamePagination = "",
}: IPaginatedHookResponse<T>): IPaginatedHook<T> {
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentPageSize, setCurrentPageSize] = useState(size);
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [dbFile, setDbFile] = useState("");

  useEffect(() => {
    void loadPage(currentPage, currentPageSize);
  }, [currentPage, setCurrentPage]);

  // Need to send page 1 in query params when ENTER is pushed for SearchBar
  // charName and itemName are changed when ENTER is hit
  useEffect(() => {
    setCurrentPage(1);
    void loadPage(1, currentPageSize);
  }, [charName, itemNamePagination]);

  const handlePageChangeIncrement = (_: unknown, page: number): void => {
    setCurrentPage(page + 1);
  };

  const handlePageChangeDecrement = (_: unknown, page: number): void => {
    setCurrentPage(page - 1);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const {
      target: { value },
    } = event;
    const size = parseInt(value, 10);
    setCurrentPageSize(size);
    setCurrentPage(1);
    void loadPage(1, size);
  };

  const loadPage = async (page: number, pageSize: number): Promise<void> => {
    setIsLoading(true);
    setCurrentPage(page);
    setData([]);

    try {
      const resp = await action({
        page,
        size: pageSize,
        charName,
        itemName: itemNamePagination,
      });
      const {
        data: { results, dbFile, count: resultCount },
      } = resp;
      setCount(Number(resultCount));
      setData(results as T[]);
      setDbFile(dbFile);
    } catch (e) {
      const { message } = e as Error;
      setError({ message });
    }
    setIsLoading(false);
  };

  const reload = (): void => {
    void loadPage(currentPage, currentPageSize);
  };

  return {
    count,
    data,
    error,
    isLoading,
    page: currentPage,
    pageCount: Math.ceil(count / currentPageSize),
    pageSize: currentPageSize,
    pageZeroIndex: currentPage - 1,
    setPageSize: setCurrentPageSize,
    handlePageChangeIncrement,
    handlePageChangeDecrement,
    handlePageSizeChange,
    reload,
    dbFile,
  };
}
