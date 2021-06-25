import React, { useEffect, useState } from "react";
import Slideshow from "../../higher-order-component/Slideshow";
import Testimonial from "./Testimonial";
import { getReviewsForHomepage } from "../../../services/review";
import testimonial from "../../../images/testimonial.jpg";

const Testimonials = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status, data } = await getReviewsForHomepage();

        if (status === "success") {
          setReviews(data.reviews);
        }

        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${testimonial})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
      className="testimonials-homepage p-5"
    >
      {!isLoading ? (
        <div className="container">
          <div className="row">
            <div className="col-lg-7 col-md-9 m-auto text-center">
              <div className="sec-heading">
                <h5>TESTIMONIALS</h5>
                <h2>What Our Yours Say About US</h2>
              </div>
            </div>
          </div>
          <div className="testimonial-body">
            <Slideshow
              settings={{
                overflow: false,
                autoplay: true,
                speed: 2000,
                slidesToShow: 3,
                slidesToScroll: 1,
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
              {reviews.map((review, index) => (
                <Testimonial
                  key={`${review.title}--${index}`}
                  name={review.author.name}
                  detail={review.content}
                  title={review.title}
                  reviewIconOpening="fas fa-quote-left"
                  reviewIconClosing="fas fa-quote-right"
                  isSliderItem={true}
                />
              ))}
            </Slideshow>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
};

export default Testimonials;
