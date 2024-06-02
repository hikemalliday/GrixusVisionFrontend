import froak from "../assets/froak-undead.png";

function Logo(): React.JSX.Element {
  return (
    <>
      <img
        src={froak}
        alt="froak-undead"
        onClick={() => window.location.reload()}
      />
    </>
  );
}

export default Logo;
