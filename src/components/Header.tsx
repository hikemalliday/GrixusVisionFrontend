import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CharacterDropdown from "./CharacterDropdown";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useItemAndCharacterContext } from "../context/ItemAndCharacterContext";

function Header(): React.JSX.Element {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { resetItemsArray, dbFile } = useItemAndCharacterContext();
  console.log("testci");
  const handleLogout = (): void => {
    logout();
    resetItemsArray();
    navigate("/login");
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
