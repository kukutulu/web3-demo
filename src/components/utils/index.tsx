import { styled, SvgIconProps } from '@mui/material';
import React from 'react';

export const MuiImage = styled('img')(() => ({}));

type RotateIconProps = { isOpen: boolean; Icon: React.ComponentType<SvgIconProps> };

const StyledIcon = styled('span')<{ isOpen: boolean }>(({ isOpen }) => ({ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }));

export const RotateIcon: React.FC<RotateIconProps> = ({ isOpen, Icon }) => {
  return (
    <StyledIcon isOpen={isOpen}>
      <Icon />
    </StyledIcon>
  );
};
