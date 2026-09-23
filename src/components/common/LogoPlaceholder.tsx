import React from 'react';
import { AuricityLogo, AuricityLogoMark } from './AuricityLogo';

interface LogoPlaceholderProps {
  className?: string;
  variant?: 'light' | 'dark' | 'header' | 'icon' | 'full';
  showTagline?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero';
}

export const LogoPlaceholder: React.FC<LogoPlaceholderProps> = ({ 
  className = '', 
  variant = 'header',
  size = 'md'
}) => {
  const logoVariant = variant === 'icon' ? 'icon' : variant === 'full' ? 'full' : 'compact';
  const logoTheme = variant === 'dark' ? 'dark' : 'light';
  return (
    <AuricityLogo 
      variant={logoVariant}
      theme={logoTheme}
      size={size}
      className={className}
    />
  );
};

export { AuricityLogo, AuricityLogoMark };
