import React from "react";
import "./Icon.css";
import { PUBLIC_IMAGE_PATH } from "../utils/Constants";
import PropTypes from "prop-types";

function Icon(props) {
  return (
    <div className="iconBase" style={{ width: props.size, height: props.size }}>
      <div
        className="image"
        style={{
          backgroundImage: `url("${PUBLIC_IMAGE_PATH}${props.src}")`,
          backgroundSize: `${props.backgroundSize}`,
        }}
      />
    </div>
  );
}

Icon.propTypes = {
  size: PropTypes.number.isRequired,
  backgroundSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  src: PropTypes.string.isRequired,
  lazyLoading: PropTypes.bool,
};

Icon.defaultProps = {
  size: 30,
  backgroundSize: "contain",
  lazyLoading: true,
};

export default Icon;
