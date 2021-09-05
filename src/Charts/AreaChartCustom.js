import "./Css/AreaChartCustom.css";
import { AreaChart, ResponsiveContainer, Tooltip, Area, YAxis } from "recharts";

export default function AreaChartCustom(props) {
  let data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  if (props.data) {
    data = props.data;
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <small className="customTooltipLabel">
          {`${payload[0].payload?.[props.dateKey]} : ${payload[0].value}`}
        </small>
      );
    }

    return null;
  };

  // console.log(data[props.dataKey], props);
  // Max value of array object property to set Y axis domain
  const max = Math.max(...data.map((item) => item[props.dataKey]));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}

        // syncId="syncedAreaChart"
      >
        <defs>
          <linearGradient
            id={`gradientArea${props.dataKey}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="15%" stopColor={props.fill} stopOpacity={0.8} />
            <stop offset="75%" stopColor={props.fill} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Tooltip content={<CustomTooltip />} />
        <YAxis domain={[0, max]} hide />
        {/* <XAxis dataKey="name" />
        <YAxis /> */}
        <Area
          // type="monotone"
          type="monotoneY"
          dataKey={props.dataKey}
          // stroke="#8884d8"
          // fill={props.fill}
          stroke={props.fill}
          strokeWidth={2}
          // fillOpacity={1}
          fill={`url(#gradientArea${props.dataKey})`}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
