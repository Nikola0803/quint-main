import React, { useEffect, useState } from "react";
import "./Reviews.scss";
import Carousel from "react-multi-carousel";
import reviewStar from "../../assets/review-star.png";
import avatar from "../../assets/avatar.png";
import avatarLogo from "../../assets/avatar-logo.png";
import "react-multi-carousel/lib/styles.css";

function Reviews() {
  const [reviews, setReviews] = useState([]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1624 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 1624, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Simulating API response
        const data = {
          reviews: {
            review_title: "test",
            review_description: "test",
            reviewer_profile_photo: false,
            brand_logo: false
          }
        };

        if (data.hasOwnProperty('reviews')) {
          const { review_title, review_description, reviewer_profile_photo, brand_logo } = data.reviews;

          if (review_title && review_description) {
            const newReview = {
              title: review_title,
              description: review_description,
              reviewer: 'John Doe',
              position: 'CEO',
              brandLogo: brand_logo,
            };

            setReviews([newReview]);
          } else {
            console.error('Incomplete review data in API response');
          }
        } else {
          console.error('Reviews data not found in API response');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="reviews">
      <div className="container">
        <div className="reviews__body">
          <Carousel showDots={true} responsive={responsive}>
            {reviews.map((review, index) => (
              <div className="reviews__body__card" key={index}>
                <div className="reviews__body__card__star-wrapper">
                  <img src={reviewStar} alt="" />
                  <img src={reviewStar} alt="" />
                  <img src={reviewStar} alt="" />
                  <img src={reviewStar} alt="" />
                  <img src={reviewStar} alt="" />
                </div>
                <h3>{review.title}</h3>
                <div className="reviews__body__card__info">
                  <div className="reviews__body__card__info__left">
                    <div className="reviews__body__card__info__left__info">
                      <img src={avatar} alt="" />
                      <div>
                        <h3>John Doe</h3>
                        <p>CEO, ABC, inc</p>
                      </div>
                    </div>
                  </div>
                  <div className="reviews__body__card__info__right">
                    <img src={avatarLogo} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
