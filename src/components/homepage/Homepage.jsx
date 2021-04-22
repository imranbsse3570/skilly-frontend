import React from "react";
import Categories from "./Categories";
import HomepageData from "./config.json";
import HomepageSlider from "./HomepageSlider";

const HomePage = () => {
  let keys = Object.keys(HomepageData);

  return (
    <div>
      {keys.map((item, index) => {
        switch (item) {
          case "slideshow":
            return (
              <HomepageSlider
                data={HomepageData[item]}
                key={`${item}--${index}`}
              />
            );
          case "categories":
            return (
              <Categories key={`${item}--${index}`} data={HomepageData[item]} />
            );
          default:
            return <hr key={`${item}--${index}`} />;
        }
      })}
    </div>
  );
};

export default HomePage;
