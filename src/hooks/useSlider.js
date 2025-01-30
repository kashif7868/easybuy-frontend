import { useState, useEffect } from 'react';

const useSlider = (totalSlides, autoplaySpeed = 3000) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-play effect: Automatically change slide every `autoplaySpeed`
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, autoplaySpeed);
    return () => clearInterval(interval); // Cleanup the interval when component unmounts
  }, [totalSlides, autoplaySpeed]);

  // Handle dot click
  const goToSlide = (index) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };

  return { currentSlide, goToSlide };
};

export default useSlider;
