// Import the images 
import sliderImage1 from "../assets/images/sliders/slider-1.png";
import sliderImage2 from "../assets/images/sliders/slider-2.png";
import sliderImage3 from "../assets/images/sliders/slider-3.png";
import rightbanner1 from "../assets/images/sliders/banner-51.png"; 
import rightbanner2 from "../assets/images/sliders/banner-52.png"; 
import rightbanner3 from "../assets/images/sliders/banner-53.png"; 
import rightbanner4 from "../assets/images/sliders/h2-img-3.png"; 

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
