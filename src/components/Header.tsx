import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CharacterDropdown from "./CharacterDropdown";

function Header(): React.JSX.Element {
  return (
    <div className="header-container">
      <div className="logo-and-logout">
        <Logo />
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
