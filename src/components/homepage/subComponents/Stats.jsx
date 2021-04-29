import React from "react";
import CountUp from "react-countup";

const Stats = ({ data }) => {
  let stats = undefined;
  if (data.settings && data.settings.length > 0) {
    stats = data.settings.map((item, key) => {
      return (
        <div
          key={`${item}--${key}`}
          className="col-md-3 col-sm-3 text-center stats-item p-3"
        >
          <h2>
            <CountUp end={item.number} duration={5} />
          </h2>
          <h6>{item.text}</h6>
        </div>
      );
    });
  }
  return (
    <div className="stats-bg">
      <div className="container p-md-5 ">
        <div className="row">{stats ? stats : ""}</div>
      </div>
    </div>
  );
};

export default Stats;
