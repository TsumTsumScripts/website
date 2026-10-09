import React from 'react';
import Patch, {Kicker} from '@site/src/components/felt/Patch';

/** The setup the script is tuned for. One wording, shown on the landing page and the starter page. */
export default function BestSetup({style}: {style?: React.CSSProperties}): React.JSX.Element {
  return (
    <Patch tone="periwinkle" radius="30px" inset={7} tilt={-0.8} style={{padding: '22px 26px', maxWidth: 820, display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start', ...style}}>
      <Kicker tone="surface">Best on</Kicker>
      <p style={{fontSize: 22, fontWeight: 800, lineHeight: 1.3, margin: 0}}>An emulator at 540 × 960 on Android 12.</p>
      <p style={{fontSize: 16, lineHeight: 1.6, margin: 0}}>
        That is the setup the script is optimized for: every screen it reads was measured there. Set your emulator to a
        540 × 960 portrait resolution (240 DPI) running Android 12. Phones and other sizes can run it, but that is where
        it plays most reliably.
      </p>
    </Patch>
  );
}
