import { useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from 'framer-motion';

const RollingGallery = ({ autoplay = true, pauseOnHover = true, arts }) => {
  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640
  );

  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 3D geometry - significantly increased width and radius
  const cylinderWidth = isScreenSizeSm ? 2000 : 3000; // Increased width substantially
  const faceCount = arts.length;
  const faceWidth = (cylinderWidth / faceCount) * 1.5;
  const radius = cylinderWidth / (2 * Math.PI);

  // Framer Motion
  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  // Convert rotation -> 3D transform
  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
  }, [autoplay, controls, rotation]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === 'number') {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  return (
    <div className="relative h-[700px] w-full overflow-hidden">
      {' '}
      {/* Increased height */}
      <div
        className="absolute top-0 left-0 h-full w-[120px] z-10" // Wider gradient
      />
      <div
        className="absolute top-0 right-0 h-full w-[120px] z-10" // Wider gradient
      />
      <div className="flex h-full items-center justify-center [perspective:1500px] [transform-style:preserve-3d]">
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
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
              }}
            >
              <img
                src={art.image}
                alt={`gallery item ${i + 1}`}
                className="pointer-events-none h-[350px] w-[600px] rounded-[25px] object-cover
                         shadow-lg transition-all duration-300 ease-out 
                         group-hover:scale-105 group-hover:shadow-xl
                         sm:h-[280px] sm:w-[480px]"
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
    </div>
  );
};

export default RollingGallery;
