import { useRef, useState } from "react";

export default function PercentageLoader({ endValue, theme }) {
  const interval = useRef(null);
  const [display, setDisplay] = useState(0);

  interval.current = setInterval(() => {
    setDisplay((val) => {
      if (val >= endValue) {
        clearInterval(interval.current);
        return endValue;
      }
      return val + 1;
    });
  }, 200);

  return <div style={{ color: `#${theme}` }}>{display} %</div>;
}
