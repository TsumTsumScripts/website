import React from 'react';
import {fonts, tones} from '../theme';

/**
 * Covers the top of the game's results screen, where the account's level, currency totals,
 * hearts and mail count sit (top 165 px of the 540x896 cut). `height` is in the frame's own
 * pixels: 165 * the footage scale.
 */
export const ResultMask: React.FC<{height: number; fontSize: number}> = ({height, fontSize}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height,
      background: tones.periwinkle.fill,
      color: tones.periwinkle.ink,
      borderBottom: `8px solid ${tones.periwinkle.edge}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: fonts.display,
      fontSize,
    }}
  >
    Round complete
  </div>
);
