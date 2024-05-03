import React, { useState } from "react";

const HigherorderComp = (WrappedComp) => {
  return function Higherorder(props) {
    const [showdrop, setShowDrop] = useState(false);

    const handleToggle = () => {
      setShowDrop((drop) => !drop);
    };

    const onhandleSelect = (option) => {
      setShowDrop(false);
      if (props.onSelect) {
        props.onSelect(option);
      }
    };

    return (
      <div>
        <WrappedComp
          showdropDown={showdrop}
          onToggle={handleToggle}
          onSelect={onhandleSelect}
          {...props}
        />
      </div>
    );
  };
};

export default HigherorderComp;
