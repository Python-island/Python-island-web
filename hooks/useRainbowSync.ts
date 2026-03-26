// Hook to sync rainbow hue with CSS variables for button glow effects
// Reads hue from an external ref (provided by ThreeScene) when available,
// falling back to time-based calculation otherwise.

import { useEffect, RefObject } from 'react';
import { SCENE_CONFIG } from '@/lib/three/sceneConfig';

export function useRainbowSync(hueRef?: RefObject<number>) {
  useEffect(() => {
    let animationId: number;
    let startTime: number | null = null;

    const updateHue = (timestamp: number) => {
      if (startTime === null) {
        startTime = timestamp;
      }

      let hue: number;

      if (hueRef?.current !== undefined) {
        // Read hue directly from ThreeScene animation loop (fully in sync)
        hue = hueRef.current;
      } else {
        // Fallback: time-based calculation
        const elapsed = (timestamp - startTime) * 0.001;
        const { cycleSpeed, hueMultiplier } = SCENE_CONFIG.rainbow;
        hue = ((elapsed * cycleSpeed * hueMultiplier) % 1) * 360;
      }

      document.documentElement.style.setProperty('--rainbow-hue', `${hue.toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-1', `${((hue + 0) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-2', `${((hue + 60) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-3', `${((hue + 120) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-4', `${((hue + 180) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-5', `${((hue + 240) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--rainbow-hue-6', `${((hue + 300) % 360).toFixed(1)}`);
      document.documentElement.style.setProperty('--hero-hue', `${hue.toFixed(1)}`);

      animationId = requestAnimationFrame(updateHue);
    };

    animationId = requestAnimationFrame(updateHue);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [hueRef]);
}
