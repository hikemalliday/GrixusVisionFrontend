import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CharacterDropdown from "./CharacterDropdown";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";
import { useItems } from "../requests/fetches";
import { useSearchParams, useLocation } from "react-router-dom";
//import { useRefresh } from "../requests/fetches";
//import { AxiosResponse } from "axios";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { resetItemsArray, dbFile } = useItemAndCharacterContext();
  const { action: useItemsAction } = useItems();
  const location = useLocation();
  //const { action: refreshAction } = useRefresh();
  const handleLogout = (): void => {
    logout();
    resetItemsArray();
    navigate("/login");
  };
  // const handleRefresh = async (payload: object = { testkey: "testval" }) => {
  //   try {
  //     const resp = await refreshAction(payload as AxiosResponse);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  const handleQueryParamsRequest = async (params: object): Promise<unknown> => {
    try {
      // @ts-ignore
      console.log("TEST");

      // const queryParams = new URLSearchParams();
      // queryParams.set("itemName", "");
      // queryParams.set("charName", "");
      // params.queryParams = queryParams;
      const resp = await useItemsAction(params);
      console.log(resp);
      return resp;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="header-container">
      <div className="logo">
        <Logo />
      </div>
      <div
        className="logout-link"
        onClick={() => {
          handleLogout();
        }}
      >
        LOG OUT
      </div>
      <div>{dbFile}</div>
      <div
        className="logout-link"
        onClick={() => {
          handleQueryParamsRequest({
            page: 1,
            size: 100,
            charName: "",
            itemName: "",
          });
        }}
      >
        handleQueryParamRequest
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
      <div className="character-dropdown">
        <CharacterDropdown />
      </div>
    </div>
  );
}

export default Header;
