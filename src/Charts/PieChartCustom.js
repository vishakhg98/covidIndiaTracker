// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   ComposedChart,
// //   Line,
// //   Area,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   // Tooltip,
// //   Legend,
// //   ResponsiveContainer,
// //   BarChart,
// //   Tooltip,
// // } from "recharts";
// // import "./Css/HorizontalBarChart.css";

// // function HorizontalBarChart(props) {
// //   // const data = [
// //   //   {
// //   //     state: "Maharashtra",
// //   //     value: 3601796,
// //   //   },
// //   //   {
// //   //     state: "Kerala",
// //   //     value: 1189267,
// //   //   },
// //   //   {
// //   //     state: "Karnataka",
// //   //     value: 1073257,
// //   //   },
// //   // ];
// //   const data = props.data;

// //   return (
// //     // <div className="horizontalBarChartBase">
// //     <ResponsiveContainer width="100%" height="100%">
// //       {/* <ComposedChart
// //           layout="vertical"
// //           data={data}
// //           margin={{
// //             top: 20,
// //             right: 20,
// //             bottom: 20,
// //             left: 20,
// //           }}
// //         >
// //           <CartesianGrid stroke="#f5f5f5" />
// //           <YAxis dataKey="state" type="category" scale="band" />
// //           <XAxis type="number" />
// //           <Tooltip />
// //           <Legend />
// //           <Area dataKey="value" fill="#8884d8" stroke="#8884d8" />
// //           <Bar dataKey="value" barSize={20} fill="#413ea0" />
// //           <Line dataKey="value" stroke="#ff7300" />
// //         </ComposedChart> */}
// //       <BarChart
// //         width={400}
// //         height={500}
// //         data={data}
// //         layout="vertical"
// //         // margin={{ top: 20, left: 20, right: 20, bottom: 20 }}
// //       >
// //         <XAxis type="number" tick={{ fontSize: 10 }} />
// //         <YAxis
// //           dataKey="state"
// //           type="category"
// //           scale="band"
// //           tick={{ fontSize: 10 }}
// //         />
// //         <Bar dataKey="value" barSize={20} fill={props.color} />
// //         <Tooltip style={{ fontSize: 6 }} />
// //       </BarChart>
// //     </ResponsiveContainer>
// //     // </div>
// //   );
// // }

// // export default HorizontalBarChart;

// // import "./styles.css";
// import React, { useCallback, useState } from "react";
// import { PieChart, Pie, Sector, ResponsiveContainer } from "recharts";

// // const data = [
// //   { state: "Group A", value: 400 },
// //   { state: "Group B", value: 300 },
// //   { state: "Group C", value: 300 },
// //   { state: "Group D", value: 200 }
// // ];

// // const data = [
// //   {
// //     state: "Maharashtra",
// //     value: 3601796,
// //   },
// //   {
// //     state: "Kerala",
// //     value: 1189267,
// //   },
// //   {
// //     state: "Karnataka",
// //     value: 1073257,
// //   },
// // ];

// const renderActiveShape = (props: any) => {
//   const RADIAN = Math.PI / 180;
//   const {
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     startAngle,
//     endAngle,
//     fill,
//     payload,
//     percent,
//     value,
//   } = props;
//   const sin = Math.sin(-RADIAN * midAngle);
//   const cos = Math.cos(-RADIAN * midAngle);
//   const sx = cx + (outerRadius + 5) * cos;
//   const sy = cy + (outerRadius + 5) * sin;
//   const mx = cx + (outerRadius + 5) * cos;
//   const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
//   const ey = my;
//   const textAnchor = cos >= 0 ? "start" : "end";

//   return (
//     <g>
//       <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} fontSize={12}>
//         {payload.state}
//       </text>
//       <Sector
//         cx={cx}
//         cy={cy}
//         innerRadius={innerRadius}
//         outerRadius={outerRadius}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         fill={fill}
//       />
//       <Sector
//         cx={cx}
//         cy={cy}
//         startAngle={startAngle}
//         endAngle={endAngle}
//         innerRadius={outerRadius + 6}
//         outerRadius={outerRadius + 10}
//         fill={fill}
//       />
//       <path
//         d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
//         stroke={fill}
//         fill="none"
//       />
//       <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         textAnchor={textAnchor}
//         fill="#333"
//         fontSize={10}
//       >{`${value}`}</text>
//       <text
//         x={ex + (cos >= 0 ? 1 : -1) * 12}
//         y={ey}
//         dy={18}
//         textAnchor={textAnchor}
//         fill="#999"
//         fontSize={8}
//       >
//         {`(Rate ${(percent * 100).toFixed(2)}%)`}
//       </text>
//     </g>
//   );
// };

// export default function HorizontalBarChart(props) {
//   const data = props.data;

//   const [activeIndex, setActiveIndex] = useState(0);
//   const onPieEnter = useCallback(
//     (_, index) => {
//       setActiveIndex(index);
//     },
//     [setActiveIndex]
//   );

//   return (
//     <ResponsiveContainer width="100%" height="100%">
//       <PieChart>
//         <Pie
//           activeIndex={activeIndex}
//           activeShape={renderActiveShape}
//           data={data}
//           cx={"50%"}
//           cy={"50%"}
//           innerRadius={45}
//           fontSize={10}
//           outerRadius={50}
//           fill={props.color}
//           dataKey={props.valueKey}
//           onMouseEnter={onPieEnter}
//         />
//       </PieChart>
//     </ResponsiveContainer>
//   );
// }

import "./Css/PieChartCustom.css";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Label } from "recharts";

export default function PieChartCustom(props) {
  let data = [];
  if (props.data) {
    data = props.data;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <small className="customTooltipLabel">
          {`${payload[0].payload?.state} : ${payload[0].value}
           (${((payload[0].value / props.total) * 100).toFixed(0)}%)`}
        </small>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <defs>
          <linearGradient
            id={`gradientPie${props.valueKey}`}
            x1="100%"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop offset="0%" stopColor={props.gradientColors[0]} />
            <stop offset="50%" stopColor={props.gradientColors[1]} />
            <stop offset="100%" stopColor={props.gradientColors[2]} />
          </linearGradient>
        </defs>
        <Pie
          // activeIndex={activeIndex}
          // activeShape={renderActiveShape}
          data={data}
          cx={"50%"}
          cy={"50%"}
          innerRadius={40}
          outerRadius={50}
          fill={`url(#gradientPie${props.valueKey})`}
          paddingAngle={5}
          dataKey={props.valueKey}
          stroke="none"
          textAnchor={"middle"}
        >
          <Label
            value={` ${props.total}`}
            className="centerlabelTop"
            position="centerTop"
            // fill="#646497"
            fill="white"
            fontSize={10}
          />
          <Label
            value={`${props.valueKey}`}
            position="centerBottom"
            fill="#646497"
            fontSize={10}
          />
          {/* {data &&
            data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                // fill={COLORS[index % COLORS.length]}
                fill={`url(#gradient${index})`}
              />
            ))} */}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
