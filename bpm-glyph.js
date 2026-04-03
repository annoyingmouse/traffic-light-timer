// Maps standard 16-segment labels → SVG element IDs from bpm.svg
const SEG = {
  a1: 'diag-top-left',     // top bar, left half
  a2: 'diag-top-right',    // top bar, right half
  b:  'col-right-upper',   // upper-right vertical
  c:  'col-right-lower',   // lower-right vertical
  d1: 'diag-bottom-left',  // bottom bar, left half
  d2: 'diag-bottom-right', // bottom bar, right half
  e:  'col-left-lower',    // lower-left vertical
  f:  'col-left-upper',    // upper-left vertical
  g1: 'bar-middle-left',   // middle bar, left half
  g2: 'bar-middle-right',  // middle bar, right half
  h:  'brace-upper-left',  // upper-left diagonal (\, upper half, left→centre)
  i:  'col-center-upper',  // upper-center vertical
  j:  'brace-upper-right', // upper-right diagonal (/, upper half, right→centre)
  k:  'brace-lower-left',  // lower-left diagonal (/, lower half, left→centre)
  l:  'col-center-lower',  // lower-center vertical
  m:  'brace-lower-right', // lower-right diagonal (\, lower half, centre→right)
  dp: 'dot-decimal',       // decimal point — bottom-right corner dot
};

// h+m together form a \ diagonal across the full display
// j+k together form a / diagonal across the full display

export const GLYPHS = {
  'A': ['a1','a2','b','c','e','f','g1','g2'],
  'B': ['a1','a2','b','c','d1','d2','g2','i', 'l'],
  'C': ['a1','a2','d1','d2','e','f'],
  'D': ['a1','a2','b','c','d1','d2','i','l'],
  'E': ['a1','a2','d1','d2','e','f','g1','g2'],
  'F': ['a1','a2','e','f','g1'],
  'G': ['a1','a2','c','d1','d2','e','f','g2'],
  'H': ['b','c','e','f','g1','g2'],
  'I': ['a1','a2','d1','d2','i','l'],
  'J': ['b','c','d1','d2','e'],
  'K': ['e','f','g1','j','m'],
  'L': ['d1','d2','e','f'],
  'M': ['b','c','e','f','h','j'],
  'N': ['b','c','e','f','h','m'],
  'O': ['a1','a2','b','c','d1','d2','e','f'],
  'P': ['a1','a2','b','e','f','g1','g2'],
  'Q': ['a1','a2','b','c','d1','d2','e','f','m'],
  'R': ['a1','a2','b','e','f','g1','g2','m'],
  'S': ['a1','a2','c','d1','d2','f','g1','g2'],
  'T': ['a1','a2','i','l'],
  'U': ['b','c','d1','d2','e','f'],
  'V': ['e','f','k','j'],
  'W': ['b','c','e','f','l','d1','d2'],
  'X': ['h','j','k','m'],
  'Y': ['l', 'g1', 'g2', 'b', 'f'],
  'Z': ['a1','a2','j','k','d1','d2'],
  '0': ['a1','a2','b','c','d1','d2','e','f','j','k'],
  '1': ['b','c', 'j'],
  '2': ['a1','a2','b','d1','d2','e','g1','g2'],
  '3': ['a1','a2','b','c','d1','d2','g2'],
  '4': ['b','c','f','g1','g2'],
  '5': ['a1','a2','c','d1','d2','f','g1','g2'],
  '6': ['a1','a2','c','d1','d2','e','f','g1','g2'],
  '7': ['a1','a2','j','l'],
  '8': ['a1','a2','b','c','d1','d2','e','f','g1','g2'],
  '9': ['a1','a2','b','c','d1','d2','f','g1','g2'],
  // Lowercase — occupy the lower half of the cell where distinct from uppercase
  'a': ['e','d1','d2','g1','l'],
  'b': ['f','e','g1','g2','c','d1','d2'],
  'c': ['g1','g2','e','d1','d2'],
  'd': ['b','c','d1','d2','g1','g2','e'],
  'e': ['d1','d2','e','g1','k'],
  'f': ['a2','l','i','g1','g2'],
  'g': ['d2','k','m','g1','e'],
  'h': ['f','e','g1','g2','c'],
  'i': ['a1','d1','g1','d2','l'],
  'j': ['d2','d1','c','g2','a2'],
  'k': ['f','e','g1','g2','m'],
  'l': ['i','l','a1','d2'],
  'm': ['g1','g2','e','l','c'],
  'n': ['g1','g2','e','c'],
  'o': ['g1','g2','e','c','d1','d2'],
  'p': ['c','g2','m','l','d1'],
  'q': ['d1','d2','g1','g2','e','c','m'],
  'r': ['g1','g2','e'],
  's': ['d1','d2','g2','m'],
  't': ['d2','g1','g2','i','l'],
  'u': ['e','c','d1','d2'],
  'v': ['e','k'],
  'w': ['e','c','k','m'],
  'x': ['g1','g2','k','m'],
  'y': ['c','d2','d1','m'],
  'z': ['d1','g1','k'],
  // Symbols
  '"': ['f','b'],
  ',': ['d1'],
  '\'': ['b'],
  '\\': ['h','m'],
  '|': ['i','l'],
  '<': ['m','j'],
  '>': ['h','k'],
  '$': ['a1','a2','d1','d2','g1','g2','c','f','i','l'],
  '%': ['a1','f','d2','g2','c','g1','i','l','j','k'],
  '&': ['a1','d1','g1','f','e','h','j','m','d2'],
  '!': ['c','b','dp'],
  '#': ['f','e','d1','d2','g1','g2','i','l'],
  '+': ['g1','g2','i','l'],
  '=': ['d1','d2','g1','g2'],
  '/': ['j','k'],
  '*': ['h','i','j','k','l','m','g1','g2'],
  '?': ['b','a2','l','g2','dp'],
  '@': ['a1','a2','g1','d1','d2','c','b','e','l'],
  '(': ['m','j'],
  ')': ['h','k'],
  '[': ['l','i','a2','d2'],
  ']': ['i','l','a1','d1'],
  '{': ['i','l','a2','d2','g1'],
  '}': ['i','l','a1','d1','g2'],
  '^': ['m','k'],
  '`': ['h'],
  '~': ['f','j','h'],
  ':': ['g1','d1'],
  ';': ['a1','k'],
  '-': ['g1','g2'],
  '_': ['d1','d2'],
  '.': ['dp'],
  ' ': [],
  '\x7F': ['a1','a2','b','c','d1','d2','e','f','g1','g2','h','i','j','k','l','m','dp'],
};

const template = document.createElement('template');
template.innerHTML = /* html */`
<style>
  :host {
    display: inline-block;
    width: 1.5em;
    aspect-ratio: 4 / 3;
  }
  svg {
    display: block;
    width: 100%;
    height: 100%;
  }
  .seg {
    opacity: 1;
    transition: opacity 0.05s;
  }
  .seg.off {
    opacity: 0.08;
  }
  @media (prefers-reduced-motion: reduce) {
    .seg { transition: none; }
  }
  @media (forced-colors: active) {
    :host { forced-color-adjust: none; }
  }
</style>
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="18.520834 70.781242 148.16667 111.12501"
     aria-hidden="true"
     focusable="false">
  <g>
    <rect id="bg"
          style="fill:var(--bpm-background,#00000c)"
          x="18.520834" y="70.781242"
          width="148.16667" height="111.12501"/>
    <path class="seg" id="col-center-upper"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 99.218753,91.947908 v 26.458342 l -6.614584,6.61458 -6.614583,-6.61458 -10e-7,-26.458343 6.614584,-6.614583 z"/>
    <path class="seg" id="col-center-lower"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 99.218753,134.28125 v 26.45833 l -6.614584,6.61458 -6.614583,-6.61458 v -26.45833 l 6.614583,-6.61459 z"/>
    <path class="seg" id="bar-middle-left"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 83.343752,132.95833 -42.333333,0 -6.614585,-6.61458 6.614585,-6.61459 42.333333,0 6.614584,6.61459 z"/>
    <path class="seg" id="diag-top-left"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 83.343752,90.624995 -42.333334,0 -13.229167,-13.229167 55.562501,0 6.614584,6.614583 z"/>
    <path class="seg" id="diag-bottom-left"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 83.343752,175.29166 -55.562501,0 13.22916,-13.22917 42.333341,1e-5 6.614584,6.61458 z"/>
    <path class="seg" id="col-left-upper"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 38.364584,91.947912 v 26.458328 l -6.614583,6.61459 -6.614587,-6.61459 3e-6,-39.687495 z"/>
    <path class="seg" id="col-left-lower"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 38.364584,134.28125 v 26.45833 l -13.229167,13.22917 -3e-6,-39.6875 6.614587,-6.61459 z"/>
    <path class="seg" id="brace-lower-left"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 41.010411,159.41665 1e-6,-9.26042 30.42709,-14.55207 h 11.90625 v 9.26042 l -30.427087,14.55207 z"/>
    <path class="seg" id="brace-upper-left"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 41.01041,93.27083 10e-7,9.26042 30.427091,14.55208 h 11.90625 v -9.26042 L 52.916665,93.27083 Z"/>
    <path class="seg" id="bar-middle-right"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 101.86459,132.95833 h 42.33333 l 6.61459,-6.61458 -6.61459,-6.61459 h -42.33333 l -6.614588,6.61459 z"/>
    <path class="seg" id="diag-top-right"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 101.86459,90.624998 h 42.33333 l 13.22917,-13.22917 h -55.5625 l -6.614588,6.61458 z"/>
    <path class="seg" id="diag-bottom-right"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="M152.28983,175.29124l-50.425,0l-6.615,-6.614l6.615,-6.615l42.333,0l7.785,7.785c-0.356,0.74 -0.556,1.569 -0.556,2.444c0,1.102 0.317,2.131 0.863,3Z"/>
    <path class="seg" id="col-right-upper"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 146.84376,91.947908 v 26.458332 l 6.61458,6.61459 6.61459,-6.61459 -1e-5,-39.687492 z"/>
    <path class="seg" id="col-right-lower"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="M153.79783,167.69324l-6.954,-6.954l-0,-26.458l6.615,-6.615l6.614,6.615l0,33.228c-0.869,-0.547 -1.898,-0.863 -3,-0.863c-1.221,-0 -2.351,0.388 -3.275,1.047Z"/>
    <path class="seg" id="brace-lower-right"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 144.19793,159.41665 v -9.26042 l -30.42709,-14.55207 h -11.90625 v 9.26042 l 30.42708,14.55207 z"/>
    <path class="seg" id="brace-upper-right"
          style="fill:var(--bpm-fill,#76d0c6);stroke:var(--bpm-stroke,#97e4f8);stroke-width:0.79375"
          d="m 144.19793,93.270828 v 9.260422 l -30.42709,14.55208 h -11.90625 v -9.26042 l 30.42708,-14.552082 z"/>
    <circle class="seg" id="dot-decimal"
            style="fill:var(--bpm-fill,#76d0c6)"
            cx="157.38021" cy="172.59375" r="3.0"/>
  </g>
</svg>
`;

const ARIA_NAMES = { ' ': 'space', '!': 'exclamation mark', '"': 'double quote', '#': 'hash', '$': 'dollar', '%': 'percent', '&': 'ampersand', '\'': 'apostrophe', '(': 'open paren', ')': 'close paren', '*': 'asterisk', '+': 'plus', ',': 'comma', '-': 'hyphen', '.': 'period', '/': 'slash', ':': 'colon', ';': 'semicolon', '<': 'less than', '=': 'equals', '>': 'greater than', '?': 'question mark', '@': 'at', '[': 'open bracket', '\\': 'backslash', ']': 'close bracket', '^': 'caret', '_': 'underscore', '`': 'backtick', '{': 'open brace', '|': 'pipe', '}': 'close brace', '~': 'tilde', '\x7F': 'delete' };

class BpmGlyph extends HTMLElement {
  static get observedAttributes() { return ['char', 'segments']; }

  connectedCallback() {
    if (!this.hasAttribute('role')) this.setAttribute('role', 'img');
    this._render();
  }

  attributeChangedCallback() {
    this._render();
  }

  _render() {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    const root = this.shadowRoot;
    root.innerHTML = '';
    root.appendChild(template.content.cloneNode(true));

    const segAttr = this.getAttribute('segments');
    const char = this.getAttribute('char') || ' ';

    let on;
    if (segAttr !== null) {
      on = new Set(segAttr.split(',').map(s => SEG[s.trim()] ?? s.trim()).filter(Boolean));
    } else {
      on = new Set((GLYPHS[char] ?? GLYPHS[char.toUpperCase()] ?? []).map(s => SEG[s]));
    }

    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', ARIA_NAMES[char] ?? char);
    }

    root.querySelectorAll('.seg').forEach(el => {
      el.classList.toggle('off', !on.has(el.id));
    });
  }
}

if (!customElements.get('bpm-glyph')) {
  customElements.define('bpm-glyph', BpmGlyph);
}
