import type {PrismTheme} from 'prism-react-renderer';

/*
 * Code colours that meet the contrast rule (CONTRAST.md): every token is at least 7:1 on
 * its block background, so syntax highlighting never drops below the body-text floor.
 * The stock github and dracula themes miss it on comments, strings, properties and keywords.
 * Verify any change with `npm run contrast`.
 */

export const lightCode: PrismTheme = {
  plain: {color: '#1f2933', backgroundColor: '#f6f8fa'},
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#4a5361', fontStyle: 'italic'}},
    {types: ['punctuation'], style: {color: '#1f2933'}},
    {types: ['namespace'], style: {opacity: 1}},
    {types: ['keyword', 'operator', 'boolean', 'important', 'atrule'], style: {color: '#a3141f'}},
    {types: ['string', 'char', 'attr-value', 'inserted', 'regex', 'url'], style: {color: '#0b5a32'}},
    {types: ['function', 'function-variable', 'class-name', 'builtin'], style: {color: '#5b21b6'}},
    {types: ['number', 'constant', 'symbol', 'variable'], style: {color: '#8a3500'}},
    {types: ['property', 'attr-name', 'selector'], style: {color: '#0a5560'}},
    {types: ['tag', 'deleted'], style: {color: '#8c1a52'}},
    {types: ['bold'], style: {fontWeight: 'bold'}},
    {types: ['italic'], style: {fontStyle: 'italic'}},
  ],
};

export const darkCode: PrismTheme = {
  plain: {color: '#f8f8f2', backgroundColor: '#282a36'},
  styles: [
    {types: ['comment', 'prolog', 'doctype', 'cdata'], style: {color: '#c0c8e4', fontStyle: 'italic'}},
    {types: ['punctuation'], style: {color: '#f8f8f2'}},
    {types: ['namespace'], style: {opacity: 1}},
    {types: ['keyword', 'operator', 'boolean', 'important', 'atrule'], style: {color: '#d9b8ff'}},
    {types: ['string', 'char', 'attr-value', 'inserted', 'regex', 'url'], style: {color: '#ffb8de'}},
    {types: ['function', 'function-variable', 'class-name', 'builtin'], style: {color: '#9ff0b4'}},
    {types: ['number', 'constant', 'symbol', 'variable'], style: {color: '#ffd48a'}},
    {types: ['property', 'attr-name', 'selector'], style: {color: '#8ae8ff'}},
    {types: ['tag', 'deleted'], style: {color: '#ffa6a6'}},
    {types: ['bold'], style: {fontWeight: 'bold'}},
    {types: ['italic'], style: {fontStyle: 'italic'}},
  ],
};
