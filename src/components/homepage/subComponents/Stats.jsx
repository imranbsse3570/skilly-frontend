import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

import { getStats } from "../../../services/general";

const Stats = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getStats();
        setStats(result.data.stats);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="stats-bg">
      <div className="container p-md-5 ">
        <div className="row">
          {!isLoading ? (
            stats.map((item, key) => (
              <div
                key={`${item}--${key}`}
                className="col-md-3 col-sm-3 text-center stats-item p-3"
              >
                <h2>
                  <CountUp end={item.number} duration={5} />
                </h2>
                <h6>{item.text}</h6>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stats;
