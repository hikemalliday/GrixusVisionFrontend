import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CharacterDropdown from "./CharacterDropdown";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
//import { useRefresh } from "../requests/fetches";
//import { AxiosResponse } from "axios";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  //const { action: refreshAction } = useRefresh();
  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };
  // const handleRefresh = async (payload: object = { testkey: "testval" }) => {
  //   try {
  //     const resp = await refreshAction(payload as AxiosResponse);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

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
      {/* <div
        className="logout-link"
        onClick={() => {
          handleRefresh();
        }}
      >
        REFRESH
      </div> */}
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
