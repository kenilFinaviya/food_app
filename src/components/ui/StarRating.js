import React from "react";

function StarRating({ rating, maxStars = 5, className = "" }) {
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (rating > 0.5) {
      stars.push(<i key={i} className="bi bi-star-fill" />);
      rating--;
    } else if (rating > 0 && rating < 1) {
      stars.push(<i key="half" className="bi bi-star-half" />);
      rating--;
    } else {
      stars.push(<i key={`empty-${i}`} className="bi bi-star" />);
    }
  }

  return <div className={`item_rating ${className}`.trim()}>{stars}</div>;
}

export default StarRating;
