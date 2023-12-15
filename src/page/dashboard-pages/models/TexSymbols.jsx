import { MathSymbol } from "brainly-style-guide";
import { SymbolsIcon } from "./SymbolsIcon";
import PropTypes from "prop-types";

const Symbols = ({ onClick }) => {
  const buttonNodes = SymbolsIcon.map((symbol) => (
    <button
      type="button"
      key={symbol.icon}
      className="tex-button btn border"
      onClick={() => onClick(symbol.data)}
    >
      <MathSymbol type={symbol.icon} />
    </button>
  ));

  return (
    <div
      style={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "auto auto",
        gridGap: 5,
      }}
    >
      {buttonNodes}
    </div>
  );
};

Symbols.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Symbols;
