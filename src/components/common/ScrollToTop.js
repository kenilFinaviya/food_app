import React, { useState, useEffect } from "react";

const SCROLL_THRESHOLD = 250;

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      setIsVisible(windowScroll > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="scroll_top" onClick={scrollTop} role="button" tabIndex={0} onKeyDown={(e) => e.key === "Enter" && scrollTop()} aria-label="Scroll to top">
      <i className="bi bi-arrow-up" />
    </div>
  );
}

export default ScrollToTop;
