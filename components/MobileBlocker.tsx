'use client';

import { useEffect, useRef, useState } from 'react';
import { Monitor } from 'lucide-react';

interface MobileBlockerProps {
  message?: string;
  videoSrc?: string;
}

export default function MobileBlocker({
  message = 'Pyisland 是一款专为 Windows 系统打造的桌面应用。在移动端使用会导致严重的功能异常与兼容性问题，请使用电脑访问本网站。',
  videoSrc = '/dnr.mp4',
}: MobileBlockerProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) || window.innerWidth < 768;

      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMobile) return null;

  if (showVideo) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={videoSrc}
          autoPlay
          playsInline
          muted={false}
          onEnded={() => setShowVideo(false)}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <div className="relative flex w-full max-w-sm flex-col items-center gap-6 rounded-3xl border border-white p-8 shadow-2xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white">
          <Monitor size={32} className="text-white" />
        </div>

        <div className="text-center">
          <h2 className="mb-2 text-xl font-bold text-white">暂不支持移动端访问</h2>
          <p className="text-sm leading-relaxed text-white/60">{message}</p>
        </div>

        <div className="w-full rounded-xl border border-white/20 bg-white/5 p-4">
          <p className="text-center text-xs text-white/40">
            当前访问设备检测为移动设备
          </p>
        </div>

        <div className="w-full rounded-xl border border-white/20 bg-white/5 p-4">
          <p className="text-center text-sm font-medium text-white">
            在移动端使用会导致严重问题
          </p>
          <p className="mt-2 text-center text-xs text-white/40">
            功能异常 · 兼容性问题 · 体验降级
          </p>
        </div>

        <button
          onClick={() => setShowVideo(true)}
          className="w-full rounded-xl border border-white py-2.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-black"
        >
          仍然继续访问
        </button>
      </div>
    </div>
  );
}
