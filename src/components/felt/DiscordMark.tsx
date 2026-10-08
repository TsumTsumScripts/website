import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

/** The felt Discord sticker, set before the label of a Discord link. Decorative: the label names the link. */
export default function DiscordMark(): React.JSX.Element {
  return <img src={useBaseUrl('/img/discord-felt.svg')} alt="" className="felt-discord" width={71} height={57} />;
}
