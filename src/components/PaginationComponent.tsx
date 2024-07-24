import { Button } from "@mui/material";

interface IPaginationComponentProps {
  handlePageChangeIncrement: (e: unknown, page: number) => void;
  handlePageChangeDecrement: (e: unknown, page: number) => void;
  count: number;
  page: number;
  pageSize: number;
}

export const PaginationComponent = ({
  handlePageChangeIncrement,
  handlePageChangeDecrement,
  count,
  page,
  pageSize,
}: IPaginationComponentProps): React.ReactElement => {
  return (
    <>
      <div className="pagination-metadata">
        <div>{`results: ${count}`}</div>
        <div>{`page: ${page}`}</div>
        {/* <div>{`pageSize: ${pageSize}`}</div> */}
      </div>
      <div className="page-buttons">
        <Button
          onClick={(e) => handlePageChangeDecrement(e, page)}
          disabled={page === 1}
          className="button"
          variant="outlined"
        >
          &lt;
        </Button>
        <Button
          onClick={(e) => handlePageChangeIncrement(e, page)}
          disabled={count < page * pageSize}
          className="button"
          variant="outlined"
        >
          &gt;
        </Button>
      </div>
    </>
  );
};
