import type { Metadata } from 'next';
import './globals.css';
import DynamicIsland from '@/components/DynamicIsland';

export const metadata: Metadata = {
  metadataBase: new URL('https://pyisland.com'),
  title: {
    default: 'Pyisland - Windows 灵动岛 | 用 Python 开发，运行在 Windows 上的现代灵动岛控制中心',
    template: '%s | Pyisland',
  },
  description: 'Pyisland 采用现代胶囊形状设计，为 Windows 带来 iOS 风格的灵动体验。集成亮度/音量控制、系统状态监控、剪贴板监控等实用功能。',
  keywords: ['Pyisland', '灵动岛', 'Windows', 'Python', 'Dynamic Island', '控制中心', '系统监控'],
  authors: [{ name: 'Pyisland Developers' }],
    alternates: {
      canonical: 'https://pyisland.com/',
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'Pyisland - Windows 灵动岛',
    description: '用 Python 开发，运行在 Windows 上的现代灵动岛控制中心',
    type: 'website',
    locale: 'zh_CN',
    url: 'https://pyisland.com/',
    siteName: 'Pyisland',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pyisland - Windows 灵动岛',
    description: '用 Python 开发，运行在 Windows 上的现代灵动岛控制中心',
    site: '@pyisland',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noiseOverlay">
        <DynamicIsland />
        {children}
      </body>
    </html>
  );
}
