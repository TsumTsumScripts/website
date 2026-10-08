import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** True on the documentation pages, which keep the default Docusaurus chrome. */
export function useIsDocs(): boolean {
  const {pathname} = useLocation();
  const docs = useBaseUrl('/docs');
  return pathname === docs || pathname.startsWith(`${docs}/`);
}
