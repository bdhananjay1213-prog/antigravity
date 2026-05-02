import { useEffect, useRef, ReactNode } from 'react';
import './GooeyGradientBackground.css';

interface GooeyGradientBackgroundProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Global gooey liquid gradient background.
 * Renders as a fixed full-screen layer (z-index 0) so it appears
 * behind the Navigation bar and all page content (z-index ≥ 10).
 *
 * Colors are tuned to the Kerala cinematic palette:
 *   indigo #4f46e5 · violet #7c3aed · pink #db2777 · amber #f59e0b
 */
export function GooeyGradientBackground({ children, className = '' }: GooeyGradientBackgroundProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      tgX = e.clientX;
      tgY = e.clientY;
    };

    const animate = () => {
      if (interactiveRef.current) {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interactiveRef.current.style.transform =
          `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className={`gooey-wrapper ${className}`}>
      {/* Fixed full-screen gooey layer */}
      <div className="goo-gradient-bg" aria-hidden="true">
        {/* Hidden SVG providing the #kerala-goo filter */}
        <svg xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="kerala-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>

        {/* Animated blobs */}
        <div className="goo-gradients-container">
          <div className="goo-g1" />
          <div className="goo-g2" />
          <div className="goo-g3" />
          <div className="goo-g4" />
          <div className="goo-g5" />
          <div ref={interactiveRef} className="goo-interactive" />
        </div>
      </div>

      {/* Content layer — sits above the fixed bg */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}

export default GooeyGradientBackground;
