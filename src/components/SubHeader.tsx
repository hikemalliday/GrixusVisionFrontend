import { useDbFile } from "../requests/fetches";

export const SubHeader = () => {
  const { isLoading, response: dbFileResponse } = useDbFile();
  return (
    <div className="subheader-container">
      <div className="parse-date">{`Scrape Date: ${
        !isLoading && dbFileResponse.data !== undefined
          ? dbFileResponse.data
          : ""
      }`}</div>
    </div>
  );
};
