import {useLocation} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

/**
 * True on the documentation pages (the contributor docs and the guides), which keep the
 * default Docusaurus chrome: their layout reads the default navbar.
 */
export function useIsDocs(): boolean {
  const {pathname} = useLocation();
  const docs = useBaseUrl('/docs');
  const guides = useBaseUrl('/guides');
  return [docs, guides].some((base) => pathname === base || pathname.startsWith(`${base}/`));
}
