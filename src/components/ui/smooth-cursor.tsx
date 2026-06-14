"use client";

import { motion, useSpring } from "motion/react";
import { FC, JSX, useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: JSX.Element;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DefaultCursorSVG: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={50}
      height={54}
      viewBox="0 0 50 54"
      fill="none"
      style={{ scale: 0.5 }}
    >
      <g filter="url(#filter0_d_91_7928)">
        <path
          d="M42.6817 41.1495L27.5103 6.79925C26.7269 5.02557 24.2082 5.02558 23.3927 6.79925L7.59814 41.1495C6.75833 42.9759 8.52712 44.8902 10.4125 44.1954L24.3757 39.0496C24.8829 38.8627 25.4385 38.8627 25.9422 39.0496L39.8121 44.1954C41.6849 44.8902 43.4884 42.9759 42.6817 41.1495Z"
          fill="black"
        />
        <path
          d="M43.7146 40.6933L28.5431 6.34306C27.3556 3.65428 23.5772 3.69516 22.3668 6.32755L6.57226 40.6778C5.3134 43.4156 7.97238 46.298 10.803 45.2549L24.7662 40.109C25.0221 40.0147 25.2999 40.0156 25.5494 40.1082L39.4193 45.254C42.2261 46.2953 44.9254 43.4347 43.7146 40.6933Z"
          stroke="white"
          strokeWidth={2.25825}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_91_7928"
          x={0.602397}
          y={0.952444}
          width={49.0584}
          height={52.428}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity={0} result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy={2.25825} />
          <feGaussianBlur stdDeviation={2.25825} />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_91_7928"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_91_7928"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 38,
    stiffness: 450,
    mass: 0.45,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const [isNativeZone, setIsNativeZone] = useState(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(performance.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const activeTimeout = useRef<NodeJS.Timeout | null>(null);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 55,
    stiffness: 280,
  });
  const scale = useSpring(0, { // Start at 0 for clean mount animation
    ...springConfig,
    stiffness: 500,
    damping: 32,
  });

  useEffect(() => {
    // Center it initially & scale up
    cursorX.set(window.innerWidth / 2);
    cursorY.set(window.innerHeight / 2);
    scale.set(1);

    const updateVelocity = (currentPos: Position) => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        const vx = (currentPos.x - lastMousePos.current.x) / deltaTime;
        const vy = (currentPos.y - lastMousePos.current.y) / deltaTime;
        
        // Exponential moving average (Low pass filter) to smooth directions
        velocity.current.x = velocity.current.x * 0.75 + vx * 0.25;
        velocity.current.y = velocity.current.y * 0.75 + vy * 0.25;
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothMouseMove = (e: MouseEvent) => {
      const target = e.target as Node | null;
      const isBodyForcedNative = document.body.classList.contains("cursor-native");
      const isElementNative = !!(target && (target as Element).closest?.('[data-cursor-native="true"], [data-cursor-native]'));
      const useNative = isBodyForcedNative || isElementNative;
      
      setIsNativeZone(useNative);
      document.body.style.cursor = useNative ? "auto" : "none";

      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.05) {
        const targetAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;

        let angleDiff = targetAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = targetAngle;

        scale.set(0.92);

        if (activeTimeout.current) {
          clearTimeout(activeTimeout.current);
        }

        activeTimeout.current = setTimeout(() => {
          scale.set(1);
        }, 80);
      } else {
        scale.set(1);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      smoothMouseMove(e);
    };

    if (!document.body.classList.contains("cursor-native")) {
      document.body.style.cursor = "none";
    } else {
      document.body.style.cursor = "auto";
    }

    const observer = new MutationObserver(() => {
      if (document.body.classList.contains("cursor-native")) {
        document.body.style.cursor = "auto";
      } else {
        document.body.style.cursor = "none";
      }
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      document.body.style.cursor = "auto";
      if (activeTimeout.current) {
        clearTimeout(activeTimeout.current);
      }
    };
  }, [cursorX, cursorY, rotation, scale]);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        x: cursorX,
        y: cursorY,
        rotate: rotation,
        scale: scale,
        zIndex: 999999, // Render on top of everything (overlays, loader)
        pointerEvents: "none",
        willChange: "transform",
        display: isNativeZone ? "none" : "block",
        marginLeft: "-25px", // Center the 50px SVG horizontally
        marginTop: "-27px",  // Center the 54px SVG vertically
      }}
    >
      {cursor}
    </motion.div>
  );
}
