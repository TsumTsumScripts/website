import React from 'react';
import Footer from '@theme-original/Footer';
import type FooterType from '@theme/Footer';
import type {WrapperProps} from '@docusaurus/types';
import FeltFooter from '@site/src/components/felt/FeltFooter';
import {useIsDocs} from '@site/src/components/felt/useIsDocs';

type Props = WrapperProps<typeof FooterType>;

export default function FooterWrapper(props: Props): React.JSX.Element {
  return useIsDocs() ? <Footer {...props} /> : <FeltFooter />;
}
