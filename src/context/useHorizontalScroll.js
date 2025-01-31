import { useState, useRef } from 'react';

const useHorizontalScroll = () => {
  const scrollRef = useRef(null);  // Reference to the container
  const [scrollPosition, setScrollPosition] = useState(0); // Track current scroll position

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = 200; // Adjust the scroll step

      // Adjust scroll position based on direction
      const newPosition = direction === 'left' ? scrollPosition - scrollAmount : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth', // Smooth scrolling
      });

      setScrollPosition(newPosition);  // Update scroll position state
    }
  };

  return {
    scrollRef,
    scroll,
  };
};

export default useHorizontalScroll;
