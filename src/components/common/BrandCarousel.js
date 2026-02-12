import React from "react";
import { Carousel } from "react-bootstrap";

const ITEMS_PER_SLIDE = 6;

function BrandCarousel({ images }) {
  const slides = [];
  for (let i = 0; i < images.length; i += ITEMS_PER_SLIDE) {
    slides.push(images.slice(i, i + ITEMS_PER_SLIDE));
  }

  return (
    <Carousel>
      {slides.map((slideImages, slideIndex) => (
        <Carousel.Item key={slideIndex}>
          <Carousel.Caption>
            <div className="d-flex align-items-center justify-content-between">
              {slideImages.map((img, idx) => (
                <div key={idx} className="brand_img">
                  <img src={img} className="img-fluid" alt={`brand-${slideIndex * ITEMS_PER_SLIDE + idx + 1}`} />
                </div>
              ))}
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default BrandCarousel;
