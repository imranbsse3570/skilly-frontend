import React, { useState, useEffect } from "react";
import ProductGrid from "../../higher-order-component/ProductGrid";
import Slideshow from "../../higher-order-component/Slideshow";

import { getRandomCategory } from "../../../services/category";

const FeaturedCategory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getRandomCategory();
        if (data.category !== null) {
          setCategory(data.category);
        }
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container p-5">
      {!isLoading ? (
        category ? (
          <>
            <div className="row mb-5">
              <h1 className="h2 col-lg-7 col-md-9 mx-auto text-center">
                {category.title ? category.title : "Featured Category"}
              </h1>
            </div>
            {category.courses.length > 0 ? (
              <Slideshow
                settings={{
                  infinite: false,
                  speed: 2000,
                  slidesToShow: 3,
                  slidesToScroll: 1,
                  autoplay: true,
                  dots: false,
                  responsive: [
                    {
                      breakpoint: 1024,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                      },
                    },
                    {
                      breakpoint: 600,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                      },
                    },
                  ],
                }}
              >
                {category.courses.map((item, index) => {
                  return (
                    <div className="p-2" key={`${item}--${index}`}>
                      <ProductGrid course={item} />
                    </div>
                  );
                })}
              </Slideshow>
            ) : (
              <p className="text-center">No Courses To Display</p>
            )}
          </>
        ) : (
          <p className="text-center">No Data to Display</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FeaturedCategory;
