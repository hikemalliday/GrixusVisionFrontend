import { useDbFile } from "../requests/fetches";

export const SubHeader = () => {
  const { isLoading, response: dbFileResponse } = useDbFile();
  console.log(dbFileResponse.data);
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
