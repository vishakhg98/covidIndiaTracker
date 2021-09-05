import React, { useContext, useEffect, useState } from "react";
import "./Css/Map.css";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";
import ReactTooltip from "react-tooltip";
import * as theme from "../utils/Theme";
import INDIA_TOPO_JSON from "./Data/mapData.json";
import { GlobalContext } from "../ContextProvider/ContextProvider";
// import INDIA_TOPO_JSON from "./Data/kerala.json";

const PROJECTION_CONFIG = {
  // scale: 350,
  scale: 1100,
  center: [78.9629, 22.5937], // always in [East Latitude, North Longitude]
};

// Red Variants
const COLOR_RANGE = [
  theme.heat1,
  theme.heat2,
  theme.heat3,
  theme.heat4,
  theme.heat5,
  theme.heat6,
  // theme.heat7,
  // theme.heat8,
  // theme.heat9,
];

const DEFAULT_COLOR = "#EEE";

const geographyStyle = {
  default: {
    outline: "none",
  },
  hover: {
    fill: "#ccc",
    transition: "all 250ms",
    outline: "none",
  },
  pressed: {
    outline: "none",
  },
};

// will generate random heatmap data on every call
const getHeatMapData = (props) => {
  return [
    { statecode: "AP", state: "Andhra Pradesh", active: 50 },
    { statecode: "AR", state: "Arunachal Pradesh", active: 10 },
    { statecode: "AS", state: "Assam", active: 100 },
    { statecode: "BR", state: "Bihar", active: 30 },
    { statecode: "CT", state: "Chhattisgarh", active: 80 },
    { statecode: "GA", state: "Goa", active: 21 },
    { statecode: "GJ", state: "Gujarat", active: 22 },
    { statecode: "HR", state: "Haryana", active: 80 },
    { statecode: "HP", state: "Himachal Pradesh", active: 24 },
    { statecode: "JH", state: "Jharkhand", active: 26 },
    { statecode: "KA", state: "Karnataka", active: 27 },
    { statecode: "KL", state: "Kerala", active: 80 },
    { statecode: "MP", state: "Madhya Pradesh", active: 20 },
    { statecode: "MH", state: "Maharashtra", active: 80 },
    { statecode: "MN", state: "Manipur", active: 80 },
    { statecode: "ML", state: "Meghalaya", active: 59 },
    { statecode: "MZ", state: "Mizoram", active: 80 },
    { statecode: "NL", state: "Nagaland", active: 59 },
    { statecode: "OR", state: "Odisha", active: 59 },
    { statecode: "PB", state: "Punjab", active: 80 },
    { statecode: "RJ", state: "Rajasthan", active: 80 },
    { statecode: "SK", state: "Sikkim", active: 80 },
    { statecode: "TN", state: "Tamil Nadu", active: 80 },
    { statecode: "TG", state: "Telangana", active: 80 },
    { statecode: "TR", state: "Tripura", active: 14 },
    { statecode: "UT", state: "Uttarakhand", active: 80 },
    { statecode: "UP", state: "Uttar Pradesh", active: 15 },
    { statecode: "WB", state: "West Bengal", active: 17 },
    { statecode: "WB", state: "West Bengal", active: 17 },
    { statecode: "AN", state: "Andaman and Nicobar Islands", active: 80 },
    { statecode: "CH", state: "Chandigarh", active: 80 },
    { statecode: "DN", state: "Dadra and Nagar Haveli", active: 19 },
    { statecode: "DD", state: "Daman and Diu", active: 20 },
    { statecode: "DL", state: "Delhi", active: 59 },
    { statecode: "JK", state: "Jammu and Kashmir", active: 25 },
    { statecode: "LA", state: "Ladakh", active: 80 },
    { statecode: "LD", state: "Lakshadweep", active: 80 },
    { statecode: "PY", state: "Puducherry", active: 80 },
  ];
};

function Map(props) {
  const tableData = useContext(GlobalContext).tableData;
  const locationSelected = useContext(GlobalContext).locationSelected;

  const [tooltipContent, setTooltipContent] = useState("");
  // const [data, setData] = useState(getHeatMapData());
  const [data, setData] = useState(tableData);

  useEffect(() => {
    setData(tableData);
  }, [tableData]);
  const colorScale = scaleQuantile()
    .domain(data.map((d) => d.active))
    .range(COLOR_RANGE);

  const onMouseEnter = (geo, current = { active: "NA" }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.active}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent("");
  };

  return (
    <div className="mapBase">
      <div className="locationHead heading">
        <h4 className="locationSelected">{locationSelected}</h4>
      </div>

      <div className="map" style={{ width: "100%", height: "100%" }}>
        <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          // width={600}
          // height={220}
          style={{ width: "100%", height: "100%" }}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map((geo) => {
                //console.log(geo.id);
                const current = data.find((s) => s.statecode === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={current ? colorScale(current.active) : DEFAULT_COLOR}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>
    </div>
  );
}

export default Map;
