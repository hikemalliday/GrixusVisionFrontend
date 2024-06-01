import Logo from "./Logo";
import SearchBar from "./SearchBar";
import CharacterDropdown from "./CharacterDropdown";

function Header(): React.JSX.Element {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="search-bar">
        <SearchBar />
        <CharacterDropdown />
      </div>
      <div></div>
    </div>
  );
}

export default Header;
