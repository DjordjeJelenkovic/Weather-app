import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
// import Drzave from "./CountryCodes.json"



const FlagsDropdown = ({ codes, codesString, selectFlag }) => {
  const [selected, setSelected] = useState("");
  const onSelect = (code) => {
    setSelected(code);
    console.log(code)
    selectFlag(code)
  }
  // showSelectedLabel
  // console.log(showOptionLabel)

  // console.log(codes)
  // console.log(codesString)
  const flagCodes = [];

  for (let code of codes) {
    // console.log({ code })
    flagCodes.push(code)
  }
  const allFlags = Object.assign({}, ...flagCodes);


  const showSelectedLabel = ("Show Selected Label", true);
  const showSecondarySelectedLabel = (
    "Show Secondary Selected Label",
    true
  );
  const showOptionLabel = ("Show Option Label", true);
  const showSecondaryOptionLabel = ("Show Secondary Option Label", true);
  const searchable = ("Searchable", false);

  const customLabels = ("Custom Labels",
    allFlags
  );

  const placeholder = "Select Language"

  return (
    <div className="demo-wrapper">
      <ReactFlagsSelect
        selected={selected}
        onSelect={onSelect}
        // value={selected}
        // showSelectedLabel={showSelectedLabel}
        // showSecondarySelectedLabel={showSecondarySelectedLabel}
        showOptionLabel={showOptionLabel}
        // showSecondaryOptionLabel={showSecondaryOptionLabel}
        customLabels={customLabels}
        countries={codesString}
        searchable={true}
        fullWidth={true}
        // placeholder={<span><img src="https://flagcdn.com/16x12/nl.png" /> NL</span>}
        placeholder={<span><img src="./images/nl.png" /> NL</span>}

      />
    </div>
  );
};

export default FlagsDropdown;