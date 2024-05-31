import Logo from "./Logo";
import SearchBar from "./SearchBar";
function Header(): React.JSX.Element {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <div className="search-bar">
        <SearchBar />
      </div>
    </div>
  );
}

export default Header;
