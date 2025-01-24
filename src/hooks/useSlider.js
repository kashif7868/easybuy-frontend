import { useState, useEffect, useRef } from 'react';

const useSlider = (images, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  // Move to the next slide
  const moveSlider = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Auto slide every `interval` milliseconds
  useEffect(() => {
    const sliderInterval = setInterval(moveSlider, interval);
    return () => clearInterval(sliderInterval); // Clean up interval on unmount
  }, [images.length, interval]);

  // Handle swipe on touch devices
  const handleTouchStart = (e) => {
    const startX = e.touches[0].clientX;
    sliderRef.current.startX = startX;
  };

  const handleTouchMove = (e) => {
    const startX = sliderRef.current.startX;
    if (!startX) return;

    const endX = e.touches[0].clientX;
    const diff = startX - endX;

    // Swipe left
    if (diff > 50) {
      moveSlider();
      sliderRef.current.startX = null;
    }
    // Swipe right
    else if (diff < -50) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      sliderRef.current.startX = null;
    }
  };

  // Return the current index and handlers for slider
  return {
    currentIndex,
    sliderRef,
    handleTouchStart,
    handleTouchMove,
    moveSlider
  };
};

export default useSlider;
