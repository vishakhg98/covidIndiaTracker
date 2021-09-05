import { useSpring, animated } from "react-spring";
import React from "react";

function NumberIncrementor(props) {
  let value = 0;
  if (props.number) {
    value = parseInt(props.number);
  }
  const { number } = useSpring({
    from: { number: 0 },
    number: value,
    delay: 200,
  });

  return <animated.div>{number.to((n) => n.toFixed(2))}</animated.div>;
}

export default NumberIncrementor;
