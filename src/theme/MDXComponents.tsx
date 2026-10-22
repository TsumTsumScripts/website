import MDXComponents from '@theme-original/MDXComponents';
import ImagePlaceholder from '@site/src/components/ImagePlaceholder';
import {Shot, ShotRow} from '@site/src/components/Shot';

// Registered globally so any page can write <ImagePlaceholder .../> or <Shot .../> with no import.
export default {
  ...MDXComponents,
  ImagePlaceholder,
  Shot,
  ShotRow,
};
