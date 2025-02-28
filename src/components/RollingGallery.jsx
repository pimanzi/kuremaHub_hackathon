import { useEffect, useState, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from 'framer-motion';

const RollingGallery = ({ autoplay = true, pauseOnHover = true, arts }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const smallGalleryRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Improved 3D geometry for larger screens - create a wider angle between images
  const cylinderWidth = 3000;
  const faceCount = arts.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  // Increase the radius to push images further apart
  const radius = (cylinderWidth / (2 * Math.PI)) * 1.2;
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = useCallback(
    (startAngle) => {
      controls.start({
        rotateY: [startAngle, startAngle - 360],
        transition: {
          duration: 30, // Slower rotation to make it easier to see each image
          ease: 'linear',
          repeat: Infinity,
        },
      });
    },
    [controls]
  );

  useEffect(() => {
    if (autoplay && !isScreenSizeSm) {
      startInfiniteSpin(rotation.get());
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation, isScreenSizeSm, startInfiniteSpin]);

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);
    if (autoplay && !isScreenSizeSm) startInfiniteSpin(finalAngle);
  };

  // Add hover handlers for desktop
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover && !isScreenSizeSm) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover && !isScreenSizeSm) {
      startInfiniteSpin(rotation.get());
    }
  };

  const smallGalleryControls = useAnimation();
  const x = useMotionValue(0);

  const snapToImage = useCallback(
    (index) => {
      if (!smallGalleryRef.current) return;
      const imageWidth = smallGalleryRef.current.offsetWidth;

      // If we're moving from the last image to the first, create a smooth loop transition
      if (currentIndex === arts.length - 1 && index === 0) {
        // First animate to one more position to the left (beyond the last image)
        smallGalleryControls
          .start({
            x: -arts.length * imageWidth,
            transition: { duration: 0.3, ease: 'easeIn' },
          })
          .then(() => {
            // Then instantly jump to the first image without animation
            smallGalleryControls.set({ x: 0 });
          });
      } else {
        // Normal transition between images
        smallGalleryControls.start({
          x: -index * imageWidth,
          transition: { type: 'spring', stiffness: 300, damping: 30 },
        });
      }

      setCurrentIndex(index);
    },
    [arts.length, currentIndex, smallGalleryControls]
  );

  const handleSmallGalleryDragEnd = (_, info) => {
    if (!smallGalleryRef.current) return;
    const imageWidth = smallGalleryRef.current.offsetWidth;
    const threshold = imageWidth / 3;

    let newIndex = currentIndex;

    // Dragging left (negative velocity)
    if (info.velocity.x < -100 || info.offset.x < -threshold) {
      newIndex = Math.min(arts.length - 1, currentIndex + 1);
    }
    // Dragging right (positive velocity)
    else if (info.velocity.x > 100 || info.offset.x > threshold) {
      newIndex = Math.max(0, currentIndex - 1);
    }

    snapToImage(newIndex);

    // If autoplay is enabled, restart the autoplay after manual interaction
    if (autoplay) {
      startMobileAutoplay();
    }
  };

  const autoplayIntervalRef = useRef(null);
  const startMobileAutoplay = useCallback(() => {
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    autoplayIntervalRef.current = setInterval(() => {
      if (isScreenSizeSm) {
        const nextIndex = (currentIndex + 1) % arts.length;
        snapToImage(nextIndex);
      }
    }, 5000);
  }, [arts.length, currentIndex, isScreenSizeSm, snapToImage]);

  // Handle pausing on hover for mobile
  const handleMobileMouseEnter = () => {
    if (autoplay && pauseOnHover && isScreenSizeSm) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  const handleMobileMouseLeave = () => {
    if (autoplay && pauseOnHover && isScreenSizeSm) {
      startMobileAutoplay();
    }
  };

  useEffect(() => {
    if (isScreenSizeSm && autoplay) {
      startMobileAutoplay();
    } else {
      clearInterval(autoplayIntervalRef.current);
    }
    return () => clearInterval(autoplayIntervalRef.current);
  }, [
    isScreenSizeSm,
    autoplay,
    currentIndex,
    arts.length,
    startMobileAutoplay,
  ]);

  return (
    <div className="relative h-[700px] w-full overflow-hidden">
      {/* Side gradients (only for large screen) */}
      {!isScreenSizeSm && (
        <>
          <div className="absolute top-0 left-0 h-full w-[120px] z-10 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute top-0 right-0 h-full w-[120px] z-10 bg-gradient-to-l from-background to-transparent" />
        </>
      )}

      {!isScreenSizeSm ? (
        <div className="flex h-full items-center justify-center [perspective:1500px] [transform-style:preserve-3d]">
          <motion.div
            drag="x"
            dragElastic={0}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            animate={controls}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: 'preserve-3d',
            }}
            className="flex min-h-[400px] cursor-grab items-center justify-center [transform-style:preserve-3d]"
          >
            {arts.map((art, i) => (
              <div
                key={i}
                className="group absolute flex h-fit items-center justify-center p-[4%] [backface-visibility:hidden] md:p-[3%]"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    (360 / faceCount) * i
                  }deg) translateZ(${radius}px)`,
                  opacity: 1, // Full opacity for each image
                }}
              >
                <img
                  src={art.image}
                  alt={art.title || `gallery item ${i + 1}`}
                  className="pointer-events-none h-[350px] w-[600px] rounded-[25px] object-cover shadow-lg transition-all duration-300 ease-out group-hover:scale-105 group-hover:shadow-xl sm:h-[280px] sm:w-[480px]"
                  style={{
                    outline: 'none',
                    border: 'none',
                    WebkitTapHighlightColor: 'transparent',
                    WebkitUserSelect: 'none',
                    userSelect: 'none',
                  }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div
          className="relative h-full w-full overflow-hidden"
          onMouseEnter={handleMobileMouseEnter}
          onMouseLeave={handleMobileMouseLeave}
          onTouchStart={handleMobileMouseEnter}
          onTouchEnd={handleMobileMouseLeave}
        >
          <motion.div
            className="flex h-full w-full"
            drag="x"
            dragConstraints={{ left: -((arts.length - 1) * 100), right: 0 }}
            dragElastic={0.1}
            animate={smallGalleryControls}
            style={{ x }}
            onDragEnd={handleSmallGalleryDragEnd}
          >
            {arts.map((art, i) => (
              <div
                key={i}
                ref={i === currentIndex ? smallGalleryRef : null}
                className="h-full min-w-full px-4 flex items-center justify-center"
              >
                <img
                  src={art.image}
                  alt={art.title || `gallery item ${i + 1}`}
                  className="h-[400px] w-full rounded-xl object-cover shadow-md"
                />
              </div>
            ))}
          </motion.div>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {arts.map((_, i) => (
              <button
                key={i}
                onClick={() => snapToImage(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentIndex ? 'bg-white w-4' : 'bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RollingGallery;
