import React, { useState, useEffect, useRef } from "react";
import { VisualStyled } from "../styled/visualStyled";

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const Visual = () => {
  const [index, setIndex] = useState(0);
  const [mouseOver, setMouseOver] = useState(false);

  const bannerText = [
    <p className="blind">온라인몰 할인</p>,
    <p>
      한화 L&amp;C가 만들어가는 <span>&#91;행복한공간&#93;</span> 입니다.
    </p>,
    <p>
      자연을 닮은 <span>&#91;친환경공간&#93;</span> 입니다.
    </p>,
    <p>
      삶의 여유를 느낄 수 있는 <span>&#91;하나된공간&#93;</span> 입니다.
    </p>
  ];

  const banner = (
    <div className={"ban banner" + (index + 1)}>{bannerText[index]}</div>
  );

  const content = [0, 1, 2, 3].map((number, idx) => {
    return (
      <li
        key={idx}
        className={index === number ? "on" : null}
        onClick={() => setIndex(number)}
      >
        <a href="#">{number + 1}</a>
      </li>
    );
  });

  useInterval(() => {
    if (!mouseOver) {
      setIndex((index + 1) % 4);
    }
  }, 3000);

  return (
    <VisualStyled.Wrap
      onMouseOver={() => setMouseOver(true)}
      onMouseOut={() => setMouseOver(false)}
    >
      {banner}
      <ul className="btn_banner clearfix">{content}</ul>
    </VisualStyled.Wrap>
  );
};

export default Visual;
