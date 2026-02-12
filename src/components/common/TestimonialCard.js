import React from "react";
import { Carousel } from "react-bootstrap";
import StarRating from "../ui/StarRating";

const DEFAULT_QUOTE =
  "Etiam sapien sem at sagittis congue augue massa varius sodales sapien undo tempus dolor egestas magna suscipit magna tempus aliquet porta sodales augue suscipit luctus neque";

function TestimonialCard({ image, quote = DEFAULT_QUOTE, rating = 5, author }) {
  return (
    <>
      <div className="user_img">
        <img src={image} className="img-fluid" alt={author} />
      </div>
      <p>"{quote}"</p>
      <StarRating rating={rating} className="mb-2" />
      {author && <h5>{author}</h5>}
    </>
  );
}

function TestimonialCarousel({ items }) {
  return (
    <Carousel>
      {items.map((item, index) => (
        <Carousel.Item key={index}>
          <Carousel.Caption>
            <TestimonialCard {...item} />
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export { TestimonialCard, TestimonialCarousel };
export default TestimonialCard;
