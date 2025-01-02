import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimation, useTransform } from 'framer-motion';
import { calculateGalleryDimensions } from '../../utils/galleryUtils';
import type { GalleryProps } from '../../types/gallery';

export function RollingGallery({ 
  images, 
  autoplay = false, 
  pauseOnHover = false 
}: GalleryProps) {
  const [isScreenSizeSm] = useState(window.innerWidth <= 640);
  const { cylinderWidth, faceWidth, radius } = calculateGalleryDimensions(
    isScreenSizeSm,
    images.length
  );

  const dragFactor = 0.1; // Increased drag sensitivity
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef<NodeJS.Timeout>();

  const transform = useTransform(rotation, (value) => 
    `rotate3d(0, 1, 0, ${value}deg)`
  );

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_: any, info: { velocity: { x: number } }) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: { 
        type: 'spring', 
        stiffness: 100, // Increased stiffness
        damping: 15, // Reduced damping
        mass: 0.05, // Reduced mass
        ease: 'easeOut' 
      },
    });
  };

  useEffect(() => {
    if (!autoplay) return;

    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        const nextRotation = rotation.get() - (360 / images.length);
        controls.start({
          rotateY: nextRotation,
          transition: { duration: 3, ease: 'linear' }, // Reduced duration to 1 second
        });
        rotation.set(nextRotation);
      }, 3000); // Reduced interval to 1 second
    };

    startAutoplay();
    return () => clearInterval(autoplayRef.current);
  }, [autoplay, rotation, controls, images.length]);

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (!autoplay || !pauseOnHover) return;
    
    const nextRotation = rotation.get() - (360 / images.length);
    controls.start({
      rotateY: nextRotation,
      transition: { duration: 1, ease: 'linear' }, // Reduced duration to 1 second
    });
    rotation.set(nextRotation);
  };

  return (
    <div className="gallery-container">
      <div className="gallery-gradient gallery-gradient-left" />
      <div className="gallery-gradient gallery-gradient-right" />
      <div className="gallery-content">
        <motion.div
          drag="x"
          className="gallery-track"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: 'preserve-3d',
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {images.map((url, i) => (
            <div
              key={i}
              className="gallery-item"
              style={{
                width: `${faceWidth}px`,
                transform: `rotateY(${i * (360 / images.length)}deg) translateZ(${radius}px)`,
              }}
            >
              <img src={url} alt={`gallery-${i}`} className="gallery-img" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}