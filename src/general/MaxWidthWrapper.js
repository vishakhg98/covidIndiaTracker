import React from "react";

function MaxWidthWrapper(props) {
  return (
    <div style={{ maxWidth: "1135px", margin: "auto" }}>{props.children}</div>
  );
}

export default MaxWidthWrapper;
