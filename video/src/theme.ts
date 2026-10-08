import {loadFont as loadCaprasimo} from '@remotion/google-fonts/Caprasimo';
import {loadFont as loadFigtree} from '@remotion/google-fonts/Figtree';

// The site's felt patch colours (src/css/felt.css). `ink` is the text colour that passes
// 7:1 on `fill` (CONTRAST.md): always use it for text on a patch.
export const tones = {
  marigold: {fill: '#ffb454', edge: '#a5651a', thread: '#7a4a12', ink: '#2e1a03'},
  jade: {fill: '#5cc9a7', edge: '#23785f', thread: '#1a5c48', ink: '#08261d'},
  rose: {fill: '#ff8fab', edge: '#a83d5c', thread: '#80293f', ink: '#33101b'},
  periwinkle: {fill: '#9db4ff', edge: '#4a5fb3', thread: '#34458c', ink: '#141d40'},
  grape: {fill: '#5b3f9e', edge: '#36246b', thread: '#e3d8ff', ink: '#ffffff'},
} as const;

export type Tone = keyof typeof tones;

const {fontFamily: display} = loadCaprasimo();
const {fontFamily: body} = loadFigtree('normal', {weights: ['700', '800']});

export const fonts = {display, body};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
