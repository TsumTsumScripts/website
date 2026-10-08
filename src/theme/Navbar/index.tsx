import React from 'react';
import Navbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type {WrapperProps} from '@docusaurus/types';
import FeltHeader from '@site/src/components/felt/FeltHeader';
import {useIsDocs} from '@site/src/components/felt/useIsDocs';

type Props = WrapperProps<typeof NavbarType>;

/** The documentation keeps the stock navbar; every other page gets the felt header. */
export default function NavbarWrapper(props: Props): React.JSX.Element {
  return useIsDocs() ? <Navbar {...props} /> : <FeltHeader />;
}
