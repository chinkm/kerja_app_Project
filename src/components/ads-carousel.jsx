import { motion } from "framer-motion";
import carouselImg1 from '../ads-carousel-img-1.png';

export default function AdsCarousel() {
  return (
    <div style={{ width: "100%", overflow: "hidden", cursor: "grab" }}>
      <motion.div
        drag="x"
        dragConstraints={{ right: 0, left: -600 }}
        animate={{ x: [0, -600] }}
        transition={{
          ease: "linear",
          duration: 12, 
          repeat: Infinity, 
          repeatType: "loop"
        }}
        className="flex pl-5"
      >
        {/* Render your images here */}
        {[1,2,3,4,5,6,7,8].map((item) => (
          <motion.div 
            key={item} 
            style={{ minWidth: "320px" }}
          >
            <img 
              src={carouselImg1} 
              alt="Ad banner" 
              style={{ width: "100%", borderRadius: "10px", pointerEvents: "none" }} 
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}