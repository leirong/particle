import { Fragment, useEffect, useState, useRef } from "react";
import "./App.scss";
import createParticle from "@/util/particle.js";
import { Radio } from "antd";

function App() {
  const [count, setCount] = useState(100);
  const [radius, setRadius] = useState("2,6");
  const [color] = useState("#ffffff50");
  const [line, setLine] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [bounce, setBounce] = useState(true);
  const [resize] = useState(true);
  const [distance, setDistance] = useState(100);
  const isDraw = useRef(false);
  const draw = () =>
    createParticle(".bg", {
      count,
      color,
      radius: radius.split(",").map(Number),
      distance,
      line,
      speed,
      bounce,
      resize,
    });
  useEffect(() => {
    if (isDraw) {
      (document.querySelector(".bg") as HTMLElement).innerHTML = "";
    }
    isDraw.current = true;
    draw();
  }, [count, radius, line, bounce, distance, speed]);
  return (
    <Fragment>
      <div className="action">
        <Radio.Group value={count} onChange={(e) => setCount(e.target.value)}>
          <Radio.Button value={50}>数量50</Radio.Button>
          <Radio.Button value={100}>数量100</Radio.Button>
        </Radio.Group>

        <Radio.Group
          value={radius}
          onChange={(e) => {
            setRadius(e.target.value);
          }}
        >
          <Radio.Button value={"2,6"}>半径[2,6]</Radio.Button>
          <Radio.Button value={"10,20"}>半径[10,20]</Radio.Button>
        </Radio.Group>

        <Radio.Group
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
        >
          <Radio.Button value={100}>距离100连线</Radio.Button>
          <Radio.Button value={200}>距离200连线</Radio.Button>
        </Radio.Group>

        <Radio.Group value={line} onChange={(e) => setLine(e.target.value)}>
          <Radio.Button value={true}>连线</Radio.Button>
          <Radio.Button value={false}>不连线</Radio.Button>
        </Radio.Group>

        <Radio.Group value={speed} onChange={(e) => setSpeed(e.target.value)}>
          <Radio.Button value={2}>速度2</Radio.Button>
          <Radio.Button value={5}>速度5</Radio.Button>
        </Radio.Group>

        <Radio.Group value={bounce} onChange={(e) => setBounce(e.target.value)}>
          <Radio.Button value={true}>反弹</Radio.Button>
          <Radio.Button value={false}>不反弹</Radio.Button>
        </Radio.Group>
      </div>

      <div className="bg"></div>
    </Fragment>
  );
}

export default App;
