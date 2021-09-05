import React from "react";
import "./Css/BedsAndO2.css";
import Icon from "../general/Icon";

function BedsAndO2(props) {
  return (
    <div>
      <div className="bedHead heading">
        <div className="bedHeadIcon">
          <Icon src={props.icon} size={18} />
        </div>
        <h4>{props.heading}</h4>
      </div>
      <div className="bedCardsContainer"></div>
    </div>
  );
}

export default BedsAndO2;
