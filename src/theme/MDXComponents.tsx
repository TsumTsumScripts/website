import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ImagePlaceholder from '@site/src/components/ImagePlaceholder';
import {Shot, ShotRow} from '@site/src/components/Shot';

/** A docs table inside a box that scrolls sideways. The box takes keyboard focus, so a keyboard
 *  user can scroll a wide table with the arrow keys (WCAG 2.1.1, axe's scrollable-region-focusable). */
function Table(props: React.ComponentProps<'table'>) {
  return (
    <div className="table-scroll" tabIndex={0} role="region" aria-label="Table, scrolls sideways">
      <table {...props} />
    </div>
  );
}

// Registered globally so any page can write <ImagePlaceholder .../> or <Shot .../> with no import.
export default {
  ...MDXComponents,
  table: Table,
  ImagePlaceholder,
  Shot,
  ShotRow,
};
