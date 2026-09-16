"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Hero3DPortraitProps {
  portraitFrontUrl?: string;
  portraitBackUrl?: string;
  portraitDarkUrl?: string;
  portraitTransparentUrl?: string;
}

export default function Hero3DPortrait({
  portraitFrontUrl,
  portraitBackUrl,
  portraitDarkUrl = "/assets/piyush-circle-3d.jpg",
  portraitTransparentUrl,
}: Hero3DPortraitProps) {
  const frontImage = portraitFrontUrl || portraitDarkUrl || "/assets/piyush-circle-3d.jpg";
  const backImage = portraitBackUrl || portraitTransparentUrl || frontImage;
  const [isHovered, setIsHovered] = useState(false);

  // Motion states for full 360-degree continuous rotation
  const [motion, setMotion] = useState({
    camZoom: 1.04,
    camX: 0,
    camY: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    sheenX: 50,
    sheenY: 50,
    sheenOpacity: 0.35,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Full 360-degree rotation loop
  useEffect(() => {
    let active = true;
    const startTime = performance.now();

    const renderLoop = (now: number) => {
      if (!active) return;
      const elapsed = now - startTime;

      const rotationProgress = (elapsed / 6000) * 360;

      const interactiveX = mouseRef.current.x * 15;
      const interactiveY = mouseRef.current.y * 15;

      setMotion({
        camZoom: 1.04,
        camX: interactiveX * 0.3,
        camY: interactiveY * 0.3,
        rotX: -interactiveY,
        rotY: rotationProgress + interactiveX,
        rotZ: 0,
        sheenX: 50 + Math.sin((rotationProgress * Math.PI) / 180) * 40,
        sheenY: 50,
        sheenOpacity: 0.4,
      });

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  // Mouse Parallax movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      mouseRef.current.x = Math.max(-1, Math.min(1, (e.clientX - centerX) / (window.innerWidth / 2)));
      mouseRef.current.y = Math.max(-1, Math.min(1, (e.clientY - centerY) / (window.innerHeight / 2)));
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center select-none py-6 w-full cursor-pointer group"
      style={{ perspective: "1500px" }}
    >
      {/* Main 3D Card Container */}
      <div
        className="relative w-[270px] h-[360px] sm:w-[340px] sm:h-[450px] lg:w-[400px] lg:h-[520px]"
        style={{
          transformStyle: "preserve-3d",
          transform: `translate3d(${motion.camX}px, ${motion.camY}px, 0px) rotateX(${motion.rotX}deg) rotateY(${motion.rotY}deg) scale(${motion.camZoom})`,
          transition: "transform 0.05s linear",
        }}
      >
        {/* FRONT SIDE with Fade/Blend Edge Mask */}
        <div
          className="absolute inset-0 bg-transparent overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "translateZ(2px)",
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          }}
        >
          <Image
            src={frontImage}
            alt="Front Side"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 640px) 270px, 400px"
          />
        </div>

        {/* BACK SIDE with Fade/Blend Edge Mask */}
        <div
          className="absolute inset-0 bg-transparent overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(2px)",
            maskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 85%)",
          }}
        >
          <Image
            src={backImage}
            alt="Back Side"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 640px) 270px, 400px"
          />
        </div>

        {/* Specular Light Sheen overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            transform: "translateZ(20px)",
            background: `radial-gradient(circle 280px at ${motion.sheenX}% ${motion.sheenY}%, rgba(255, 255, 255, 0.3) 0%, transparent 75%)`,
            mixBlendMode: "screen",
          }}
        />
      </div>
    </div>
  );
}