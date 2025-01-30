// Import the images 
import sliderImage1 from "../assets/images/sliders/wild-honey.png";
import sliderImage2 from "../assets/images/sliders/WhatsApp Image 2025-01-25 at 15.27.09_76db852a.jpg";
import sliderImage3 from "../assets/images/sliders/WhatsApp Image 2025-01-02 at 14.45.32_a08731b0.jpg";
import rightbanner1 from "../assets/images/sliders/sub-banner1.png"; 
import rightbanner2 from "../assets/images/sliders/sub-banner2.png"; 
import rightbanner3 from "../assets/images/sliders/sub-banner03.png"; 
import rightbanner4 from "../assets/images/sliders/sub-banner4.png"; 

const SliderData = [
  {
    id: 1,
    image: sliderImage1,
  },
  {
    id: 2,
    image: sliderImage2,
  },
  {
    id: 3,
    image: sliderImage3,
  },
  {
    id: 4,
    image: sliderImage1,
  },
];

const bannerData = [
  {
    id: 1,
    image: rightbanner1,
    categoryId: 1,  // Example categoryId
  },
  {
    id: 2,
    image: rightbanner2,
    categoryId: 2,  // Example categoryId
  },
  {
    id: 3,
    image: rightbanner3,
    categoryId: 1,  // Example categoryId
  },
  {
    id: 4,
    image: rightbanner4,
    categoryId: 3,  // Example categoryId
  },
];

// Export both SliderData and bannerData
export default SliderData;
export { bannerData };
