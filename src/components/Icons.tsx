import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

/** ∑ 学会 logo 符号（备用，实际 logo 用图片） */
export const SigmaIcon: React.FC<IconProps> = ({ size = 26, className, strokeWidth = 2.4 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M18 5.5V4H6l7 8-7 8h12v-1.5" />
  </svg>
);

export const BellIcon: React.FC<IconProps> = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const NewspaperIcon: React.FC<IconProps> = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
  </svg>
);

/** 翻开的书（科学传播/科普） */
export const BookOpenIcon: React.FC<IconProps> = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M12 7v14" />
    <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
  </svg>
);

export const FileTextIcon: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <line x1="10" y1="9" x2="8" y2="9" />
  </svg>
);

export const TrophyIcon: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M6 2h12v7a6 6 0 0 1-12 0V2z" />
    <path d="M12 15v3" />
    <path d="M8 22h8" />
    <path d="M10 22a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
  </svg>
);

export const ArrowRightIcon: React.FC<IconProps> = ({ size = 14, className, strokeWidth = 2.4 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const ChevronRightIcon: React.FC<IconProps> = ({ size = 16, className, strokeWidth = 2.4 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const SearchIcon: React.FC<IconProps> = ({ size = 16, className, strokeWidth = 2.4 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const ClipboardIcon: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M9 12h6M9 16h6" />
  </svg>
);

export const SearchCheckIcon: React.FC<IconProps> = ({ size = 24, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="m8 11 2 2 4-4" />
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ size = 20, className, strokeWidth = 2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({ size = 14, className, strokeWidth = 2.2 }) => (
  <svg {...base(size)} strokeWidth={strokeWidth} className={className}>
    <path d="M15 3h6v6" />
    <path d="M10 14 21 3" />
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);
