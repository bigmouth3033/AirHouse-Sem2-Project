import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BlogQueryId } from "api/blogApi";
import parse from "html-react-parser";
import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

const StyledContent = styled.div`
  /* @namespace "http://www.w3.org/1999/xhtml"; */

  html {
    display: block;
  }

  /* :root {
    view-transition-name: root;
} */

  /* generic block-level elements */

  body {
    display: block;
    margin: 8px;
  }

  body:-webkit-full-page-media {
    background-color: rgb(0, 0, 0);
  }

  p {
    display: block;
    margin-block-start: 1rem;
    margin-block-end: 1rem;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  div {
    display: block;
  }

  article,
  aside,
  footer,
  header,
  hgroup,
  main,
  nav,
  search,
  section {
    display: block;
  }

  marquee {
    display: inline-block;
    width: -webkit-fill-available;
  }

  address {
    display: block;
  }

  blockquote {
    display: block;
    margin-block-start: 1rem;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }

  figcaption {
    display: block;
  }

  figure {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 40px;
    margin-inline-end: 40px;
  }

  q {
    display: inline;
  }

  q:before {
    content: open-quote;
  }

  q:after {
    content: close-quote;
  }

  center {
    display: block;
    /* special centering to be able to emulate the html4/netscape behaviour */
    text-align: -webkit-center;
  }

  hr {
    display: block;
    overflow: hidden;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    border-style: inset;
    border-width: 1px;
  }

  map {
    display: inline;
  }

  video {
    object-fit: contain;
  }

  video:-webkit-full-page-media {
    margin: auto;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    max-height: 100%;
    max-width: 100%;
  }

  audio:not([controls]) {
    display: none !important;
  }

  /** TODO(crbug.com/985623): Remove these hard-coded audio tag size.
 * This fixed audio tag width/height leads to fail the wpt tests below.
 * crbug.com/955170 external/wpt/css/css-contain/contain-size-replaced-003a.html
 * crbug.com/955163 external/wpt/css/css-contain/contain-size-replaced-003b.html
 * crbug.com/955163 external/wpt/css/css-contain/contain-size-replaced-003c.html
 */
  audio {
    width: 300px;
    height: 54px;
  }

  video,
  canvas,
  img {
    overflow: clip;
    overflow-clip-margin: content-box;
  }

  img:is([sizes="auto" i], [sizes^="auto," i]) {
    contain: size !important;
    contain-intrinsic-size: 300px 150px;
  }

  iframe,
  embed,
  object,
  fencedframe {
    overflow: clip !important;
    overflow-clip-margin: content-box !important;
  }

  /* heading elements */

  h1 {
    display: block;
    font-size: 2em;
    margin-block-start: 0.67rem;
    margin-block-end: 0.67em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  :-webkit-any(article, aside, nav, section) h1 {
    font-size: 1.5em;
    margin-block-start: 0.83rem;
    margin-block-end: 0.83em;
  }

  :-webkit-any(article, aside, nav, section) :-webkit-any(article, aside, nav, section) h1 {
    font-size: 1.17em;
    margin-block-start: 1rem;
    margin-block-end: 1em;
  }

  :-webkit-any(article, aside, nav, section) :-webkit-any(article, aside, nav, section) :-webkit-any(article, aside, nav, section) h1 {
    font-size: 1em;
    margin-block-start: 1.33rem;
    margin-block-end: 1.33em;
  }

  :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    h1 {
    font-size: 0.83em;
    margin-block-start: 1.67rem;
    margin-block-end: 1.67em;
  }

  :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    :-webkit-any(article, aside, nav, section)
    h1 {
    font-size: 0.67em;
    margin-block-start: 2.33rem;
    margin-block-end: 2.33em;
  }

  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83rem;
    margin-block-end: 0.83em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1rem;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  h4 {
    display: block;
    margin-block-start: 1.33rem;
    margin-block-end: 1.33em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  h5 {
    display: block;
    font-size: 0.83em;
    margin-block-start: 1.67rem;
    margin-block-end: 1.67em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  h6 {
    display: block;
    font-size: 0.67em;
    margin-block-start: 2.33rem;
    margin-block-end: 2.33em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
  }

  /* tables */

  table {
    display: table;
    border-collapse: separate;
    border-spacing: 2px;
    border-color: gray;
    box-sizing: border-box;
    text-indent: initial;
  }

  thead {
    display: table-header-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }

  tfoot {
    display: table-footer-group;
    vertical-align: middle;
    border-color: inherit;
  }

  /* for tables without table section elements (can happen with XHTML or dynamically created tables) */
  table > tr {
    vertical-align: middle;
  }

  col {
    display: table-column;
  }

  colgroup {
    display: table-column-group;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  td,
  th {
    display: table-cell;
    vertical-align: inherit;
  }

  /* When the td/th are inside a table (the normal case), the padding is taken
   care of by HTMLTableCellElement::AdditionalPresentationAttributeStyle(). */
  td:not(table td),
  th:not(table th) {
    padding: 1px;
  }

  th {
    font-weight: bold;
    text-align: -internal-center;
  }

  caption {
    display: table-caption;
    text-align: -webkit-center;
  }

  /* lists */

  ul,
  menu,
  dir {
    display: block;
    list-style-type: disc;
    margin-block-start: 1rem;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }

  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1rem;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding-inline-start: 40px;
  }

  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }

  ul ul,
  ol ul {
    list-style-type: circle;
  }

  ol ol ul,
  ol ul ul,
  ul ol ul,
  ul ul ul {
    list-style-type: square;
  }

  dd {
    display: block;
    margin-inline-start: 40px;
  }

  dl {
    display: block;
    margin-block-start: 1rem;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
  }

  dt {
    display: block;
  }

  ol ul,
  ul ol,
  ul ul,
  ol ol {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  /* form elements */

  form {
    display: block;
    margin-top: 0rem;
  }

  :-webkit-any(table, thead, tbody, tfoot, tr) > form:-internal-is-html {
    display: none !important;
  }

  label {
    cursor: default;
  }

  legend {
    display: block;
    padding-inline-start: 2px;
    padding-inline-end: 2px;
    border: none;
  }

  fieldset {
    display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.35em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.625em;
    border: 2px groove #c0c0c0;
    min-inline-size: min-content;
  }

  button {
    appearance: auto;
  }

  input,
  textarea,
  select,
  button {
    margin: 0rem;
    font: -webkit-small-control;
    text-rendering: auto; /* FIXME: Remove when tabs work with optimizeLegibility. */
    color: FieldText;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    display: inline-block;
    text-align: start;
  }

  textarea {
    appearance: auto;
    border: 1px solid -internal-light-dark(#767676, #858585);
    column-count: initial !important;
    -webkit-rtl-ordering: logical;
    resize: auto;
    cursor: text;
    padding: 2px;
    white-space: pre-wrap;
    word-wrap: break-word;
    background-color: Field;
    font-family: monospace;
  }

  input {
    appearance: auto;
    padding: 1px 0;
    border: 2px inset -internal-light-dark(#767676, #858585);
    -webkit-rtl-ordering: logical;
    cursor: text;
    background-color: Field;
  }

  input:not([type="file" i], [type="image" i], [type="checkbox" i], [type="radio" i]) {
    -internal-align-content-block: center;
  }

  input[type="search" i] {
    appearance: auto;
    box-sizing: border-box;
  }

  input::-webkit-textfield-decoration-container {
    display: flex !important;
    align-items: center;
    -webkit-user-modify: read-only !important;
    content: none !important;
    writing-mode: inherit !important;
  }

  input::-webkit-clear-button {
    appearance: auto;
    display: inline-block;
    cursor: default;
    flex: none;
    -webkit-user-modify: read-only !important;
    margin-inline-start: 2px;
    opacity: 0;
    pointer-events: none;
  }

  input:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-clear-button {
    opacity: 1;
    pointer-events: auto;
  }

  input[type="search" i]::-webkit-search-cancel-button {
    appearance: auto;
    display: block;
    cursor: default;
    flex: none;
    -webkit-user-modify: read-only !important;
    margin-inline-start: 1px;
    margin-right: 3px;
    opacity: 0;
    pointer-events: none;
    user-select: none !important;
  }

  input[type="search" i]:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: auto;
  }

  input[type="search" i]::-webkit-search-results-decoration {
    margin: auto 3px auto 2px;
  }

  input,
  input[type="email" i],
  input[type="number" i],
  input[type="password" i],
  input[type="search" i],
  input[type="tel" i],
  input[type="text" i],
  input[type="url" i] {
    padding-block: 1px;
    padding-inline: 2px;
  }

  input[type="tel" i] {
    direction: ltr;
  }

  input::-webkit-inner-spin-button {
    appearance: auto;
    display: inline-block;
    cursor: default;
    flex: none;
    align-self: stretch;
    -webkit-user-modify: read-only !important;
    opacity: 0;
    pointer-events: none;
  }

  input:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-inner-spin-button {
    opacity: 1;
    pointer-events: auto;
  }

  ::-webkit-input-placeholder {
    -webkit-text-security: none;
    color: #757575;
    direction: inherit !important;
    pointer-events: none !important;
    text-orientation: inherit !important;
    writing-mode: inherit !important;
  }

  input::-webkit-input-placeholder {
    text-overflow: inherit;
    line-height: initial !important;
    white-space: pre;
    word-wrap: normal;
    overflow: hidden;
    -webkit-user-modify: read-only !important;
  }

  input::-internal-input-suggested {
    text-overflow: inherit;
    white-space: nowrap;
    overflow: hidden;
  }

  input::-internal-input-suggested,
  textarea::-internal-input-suggested {
    font: -webkit-small-control !important;
    /* -webkit-small-control does not pin the font-feature-settings and we want
       previews to look consistent. */
    font-feature-settings: normal !important;
    /* Prevent that overflow affects the scrollable area. Without this,
       LayoutBox::*Scroll{Height,Width}() may determine the scroll width/height
       from the scrollable area instead of from the overrides in
       LayoutTextControl{Single,Multi}Line::Scroll{Height,Width}(). */
    overflow: hidden !important;
    overflow-anchor: none;
  }

  textarea::-internal-input-suggested {
    font-family: monospace !important;
  }

  input[type="password" i] {
    -webkit-text-security: disc !important;
  }

  input[type="password" i]::-internal-input-suggested:not(.reveal-password) {
    -webkit-text-security: disc !important;
  }

  input[type="password" i]::-internal-input-suggested.reveal-password {
    -webkit-text-security: none;
  }

  input[type="password" i]::-internal-input-suggested.fade-out-password {
    width: fit-content;
    -webkit-mask: linear-gradient(to right, #000 50%, #0000);
    mask: linear-gradient(to right, #000 50%, #0000);
  }

  input[type="password" i]::-internal-reveal {
    width: 1.3em;
    height: 1.3em;
    cursor: default;
    flex: none;
    background-image: url(images/password_reveal_on.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    margin-left: 3px;
    margin-right: 3px;
  }

  input[type="password" i]::-internal-reveal.reveal {
    background-image: url(images/password_reveal_off.svg);
  }

  input[type="password" i]::-internal-reveal:hover,
  input[type="password" i]::-internal-reveal:focus {
    border-radius: 1px;
    cursor: pointer;
  }

  input[type="password" i]::-internal-strong {
    color: rgb(66, 133, 244);
    font-family: roboto;
    -webkit-text-security: none;
  }

  input[type="hidden" i],
  input[type="image" i],
  input[type="file" i] {
    appearance: none;
    padding: initial;
    background-color: initial;
    border: initial;
    cursor: default;
  }

  input[type="file" i] {
    align-items: baseline;
    color: inherit;
    overflow: hidden !important;
    text-align: start !important;
    text-overflow: ellipsis;
    white-space: pre;
  }

  input[type="image" i] {
    cursor: pointer;
  }

  /* TODO(crbug.com/880258): Use different styles for
  -internal-autofill-previewed and -internal-autofill-selected. */
  input:-internal-autofill-previewed,
  input:-internal-autofill-selected,
  textarea:-internal-autofill-previewed,
  textarea:-internal-autofill-selected,
  select:-internal-autofill-previewed,
  select:-internal-autofill-selected {
    appearance: menulist-button;
    background-image: none !important;
    background-color: -internal-light-dark(#e8f0fe, rgba(70, 90, 126, 0.4)) !important;
    color: FieldText !important;
  }

  input[type="radio" i],
  input[type="checkbox" i] {
    margin: 3px 3px 3px 4px;
    padding: initial;
    background-color: initial;
    border: initial;
    cursor: default;
  }

  input[type="radio" i] {
    margin: 3px 3px 0 5px;
  }

  input[type="button" i],
  input[type="submit" i],
  input[type="reset" i] {
    -internal-empty-line-height: fabricated;
    appearance: auto;
    user-select: none;
    white-space: pre;
  }

  input[type="file" i]::-webkit-file-upload-button {
    appearance: auto;
    -webkit-user-modify: read-only !important;
    white-space: nowrap;
    margin: 0;
    margin-inline-end: 4px; /* See FileUploadControlIntrinsicInlineSize() */
    font-size: inherit;
  }

  input[type="button" i],
  input[type="submit" i],
  input[type="reset" i],
  input[type="file" i]::-webkit-file-upload-button,
  button {
    align-items: flex-start;
    text-align: center;
    cursor: default;
    padding-block: 1px;
    padding-inline: 6px;
    border: 2px outset ButtonBorder;
    box-sizing: border-box;
    background-color: ButtonFace;
    color: ButtonText;
  }

  input[type="checkbox" i]:disabled,
  input[type="file" i]:disabled,
  input[type="hidden" i]:disabled,
  input[type="image" i]:disabled,
  input[type="radio" i]:disabled,
  input[type="range" i]:disabled {
    background-color: initial;
  }

  input[type="range" i] {
    appearance: auto;
    padding: initial;
    border: initial;
    margin: 2px;
    cursor: default;
    color: -internal-light-dark(#101010, #ffffff);
  }

  input[type="range" i]::-webkit-slider-container,
  input[type="range" i]::-webkit-media-slider-container {
    appearance: inherit;
    flex: 1;
    min-inline-size: 0;
    box-sizing: border-box;
    -webkit-user-modify: read-only !important;
    display: flex;
  }

  input[type="range" i]:-internal-has-datalist::-webkit-slider-container {
    /*
     * See LayoutThemeDefault. "22px" is
     * 2 * (SliderTickOffsetFromTrackCenter() + SliderTickSize().Height()).
     */
    min-block-size: 22px;
  }

  input[type="range" i]::-webkit-slider-runnable-track {
    flex: 1;
    min-inline-size: 0;
    align-self: center;

    box-sizing: border-box;
    -webkit-user-modify: read-only !important;
    display: block;
  }

  input[type="range" i]::-webkit-slider-thumb,
  input[type="range" i]::-webkit-media-slider-thumb {
    appearance: auto;
    box-sizing: border-box;
    -webkit-user-modify: read-only !important;
    display: block;
  }

  input[type="range" i]:disabled {
    color: #c5c5c5;
  }

  input[type="button" i]:disabled,
  input[type="submit" i]:disabled,
  input[type="reset" i]:disabled,
  input[type="color" i]:disabled,
  input[type="file" i]:disabled::-webkit-file-upload-button,
  button:disabled {
    background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(19, 1, 1, 0.3));
    border-color: -internal-light-dark(rgba(118, 118, 118, 0.3), rgba(195, 195, 195, 0.3));
    color: -internal-light-dark(rgba(16, 16, 16, 0.3), rgba(255, 255, 255, 0.3));
  }

  select:disabled,
  optgroup:disabled,
  option:disabled,
  select[disabled] > option {
    color: -internal-light-dark(GrayText, #aaa);
  }

  input[type="button" i]:active,
  input[type="submit" i]:active,
  input[type="reset" i]:active,
  input[type="file" i]:active::-webkit-file-upload-button,
  button:active {
    border-style: inset;
  }

  input[type="button" i]:active:disabled,
  input[type="submit" i]:active:disabled,
  input[type="reset" i]:active:disabled,
  input[type="file" i]:active:disabled::-webkit-file-upload-button,
  button:active:disabled {
    border-style: outset;
  }

  input:disabled,
  textarea:disabled {
    cursor: default;
    background-color: -internal-light-dark(rgba(239, 239, 239, 0.3), rgba(59, 59, 59, 0.3));
    color: -internal-light-dark(#545454, #aaaaaa);
  }

  input:disabled,
  select:disabled,
  textarea:disabled {
    border-color: rgba(118, 118, 118, 0.3);
  }

  option:-internal-spatial-navigation-focus {
    outline: -internal-light-dark(black, white) dashed 1px;
    outline-offset: -1px;
  }

  /* https://html.spec.whatwg.org/multipage/rendering.html#hidden-elements */
  /* TODO(crbug.com/1231263): <area> should be display:none. */
  area {
    display: inline;
  }
  base,
  basefont,
  datalist,
  head,
  link,
  meta,
  noembed,
  noframes,
  param,
  rp,
  script,
  style,
  template,
  title {
    display: none;
  }
  input[type="hidden" i] {
    display: none !important;
  }

  area:-webkit-any-link {
    cursor: pointer;
  }

  input[type="checkbox" i] {
    appearance: auto;
    box-sizing: border-box;
  }

  input[type="radio" i] {
    appearance: auto;
    box-sizing: border-box;
  }

  input[type="color" i] {
    appearance: auto;
    inline-size: 50px;
    block-size: 27px;
    /* Same as native_theme_base. */
    border: 1px solid ButtonBorder;
    padding: 1px 2px;
    cursor: default;
    box-sizing: border-box;
    background-color: ButtonFace;
    color: ButtonText;
  }

  input[type="color" i]::-webkit-color-swatch-wrapper {
    display: flex;
    padding: 4px 2px;
    box-sizing: border-box;
    -webkit-user-modify: read-only !important;
    width: 100%;
    height: 100%;
  }

  input[type="color" i]::-webkit-color-swatch {
    /* The swatch should not be affected by color scheme. */
    color-scheme: only light;
    background-color: #000000;
    border: 1px solid #777777;
    flex: 1;
    min-width: 0;
    -webkit-user-modify: read-only !important;
  }

  input[type="color" i][list] {
    appearance: auto;
    inline-size: 94px;
    block-size: 27px;
  }

  input[type="color" i][list]::-webkit-color-swatch-wrapper {
    padding-inline-start: 8px;
    padding-inline-end: 24px;
  }

  input[type="color" i][list]::-webkit-color-swatch {
    border-color: #000000;
  }

  input::-webkit-calendar-picker-indicator {
    display: inline-block;
    inline-size: 0.66em;
    block-size: 0.66em;
    padding-block: 0.17em;
    padding-inline: 0.34em;
    -webkit-user-modify: read-only !important;
    opacity: 0;
    cursor: default;
    pointer-events: none;
  }

  input::-webkit-calendar-picker-indicator:hover {
    background-color: #eee;
  }

  input:enabled:read-write:-webkit-any(:focus, :hover)::-webkit-calendar-picker-indicator,
  input::-webkit-calendar-picker-indicator:focus {
    opacity: 1;
    pointer-events: auto;
  }

  input[type="date" i]:disabled::-webkit-clear-button,
  input[type="date" i]:disabled::-webkit-inner-spin-button,
  input[type="datetime-local" i]:disabled::-webkit-clear-button,
  input[type="datetime-local" i]:disabled::-webkit-inner-spin-button,
  input[type="month" i]:disabled::-webkit-clear-button,
  input[type="month" i]:disabled::-webkit-inner-spin-button,
  input[type="week" i]:disabled::-webkit-clear-button,
  input[type="week" i]:disabled::-webkit-inner-spin-button,
  input:disabled::-webkit-calendar-picker-indicator,
  input[type="date" i][readonly]::-webkit-clear-button,
  input[type="date" i][readonly]::-webkit-inner-spin-button,
  input[type="datetime-local" i][readonly]::-webkit-clear-button,
  input[type="datetime-local" i][readonly]::-webkit-inner-spin-button,
  input[type="month" i][readonly]::-webkit-clear-button,
  input[type="month" i][readonly]::-webkit-inner-spin-button,
  input[type="week" i][readonly]::-webkit-clear-button,
  input[type="week" i][readonly]::-webkit-inner-spin-button,
  input[readonly]::-webkit-calendar-picker-indicator {
    visibility: hidden;
  }

  /* Form controls that measure the inline size without doing actual layout
   need to disable text-autospace, if their content can be affected by
   the property. crbug.com/1484863 */
  input[type="date" i],
  input[type="datetime-local" i],
  input[type="month" i],
  input[type="week" i],
  select {
    text-autospace: no-autospace !important;
  }

  select {
    appearance: auto;
    box-sizing: border-box;
    align-items: center;
    white-space: pre;
    -webkit-rtl-ordering: logical;
    color: FieldText;
    background-color: Field;
    border: 1px solid -internal-light-dark(#767676, #858585);
    cursor: default;
    border-radius: 0;
  }

  select:disabled {
    opacity: 0.7;
  }

  /* -internal-list-box is how we specify select[multiple] */
  /* select[multiple] is an exception to the prohibition on sizes here
   because it is one of the few controls with borders that grow on zoom
   (to solve a nasty scrollbar location problem) */
  select:-internal-list-box {
    appearance: auto;
    align-items: flex-start;
    -internal-overflow-inline: hidden;
    -internal-overflow-block: scroll;
    vertical-align: text-bottom;
    white-space: nowrap;
    border-radius: 2px;
  }

  select:not(:-internal-list-box) {
    overflow: visible !important;
  }

  /* The padding here should match the value of
   |extraPaddingForOptionInsideOptgroup| in list_picker.js, which is the
   padding for select optgroup option. */
  select:-internal-list-box optgroup option {
    padding-inline-start: 20px;
  }

  select:-internal-list-box option,
  select:-internal-list-box optgroup {
    line-height: initial !important;
  }

  /* option selected, list-box focused */
  /* TODO(crbug.com/1244986): We should be able to remove !important here, but
   it breaks some WebUI menus. */
  select:-internal-list-box:focus option:checked,
  select:-internal-list-box:focus option:checked:hover {
    background-color: SelectedItem !important;
    color: SelectedItemText !important;
  }

  /* TODO(crbug.com/1244986): We should be able to remove !important here, but
   it breaks some WebUI menus. */
  select:-internal-list-box:focus option:checked:disabled {
    background-color: -internal-inactive-list-box-selection !important;
  }

  /* option selected, list-box not focused */
  select:-internal-list-box option:checked,
  select:-internal-list-box option:checked:hover {
    background-color: -internal-light-dark(#cecece, #545454);
    color: -internal-light-dark(#101010, #ffffff);
  }

  select:-internal-list-box:disabled option:checked,
  select:-internal-list-box option:checked:disabled,
  select:-internal-list-box option:checked:disabled:hover {
    color: -internal-light-dark(gray, #aaa);
  }

  select:-internal-list-box hr {
    border-style: none;
    margin-block-start: 0.5em;
    margin-block-end: 0;
  }

  select:-internal-list-box:focus-visible option:-internal-multi-select-focus {
    outline: auto 1px -webkit-focus-ring-color;
    outline-offset: -1px;
  }

  select:-internal-list-box option:hover {
    background-color: initial;
  }

  optgroup {
    font-weight: bolder;
    display: block;
  }

  option {
    font-weight: normal;
    display: block;
    padding: 0 2px 1px 2px;
    white-space: nowrap;
    min-height: 1.2em;
  }

  output {
    display: inline;
  }

  /* meter */

  meter {
    appearance: auto;
    box-sizing: border-box;
    display: inline-block;
    block-size: 1em;
    inline-size: 5em;
    vertical-align: -0.2em;
    -webkit-user-modify: read-only !important;
  }

  meter::-webkit-meter-inner-element {
    appearance: inherit;
    box-sizing: inherit;
    display: none;
    -webkit-user-modify: read-only !important;
    block-size: 100%;
    inline-size: 100%;
  }

  meter::-webkit-meter-inner-element:-internal-shadow-host-has-appearance {
    display: grid;
    grid-template-rows: 1fr [line1] 2fr [line2] 1fr;
    position: relative;
  }

  meter::-internal-fallback:-internal-shadow-host-has-appearance {
    display: none;
  }

  meter::-webkit-meter-bar {
    block-size: 100%;
    inline-size: 100%;
    -webkit-user-modify: read-only !important;
    background: -internal-light-dark(#efefef, #3b3b3b);
    border: thin solid -internal-light-dark(rgba(118, 118, 118, 0.3), #858585);
    grid-row-start: line1;
    grid-row-end: line2;
    border-radius: 20px;
    box-sizing: border-box;
    align-self: unsafe center;
    position: absolute;
    overflow: hidden;
  }

  meter::-webkit-meter-optimum-value {
    block-size: 100%;
    -webkit-user-modify: read-only !important;
    box-sizing: border-box;
    background: -internal-light-dark(#107c10, #74b374);
  }

  meter::-webkit-meter-suboptimum-value {
    block-size: 100%;
    -webkit-user-modify: read-only !important;
    box-sizing: border-box;
    background: -internal-light-dark(#ffb900, #f2c812);
  }

  meter::-webkit-meter-even-less-good-value {
    block-size: 100%;
    -webkit-user-modify: read-only !important;
    box-sizing: border-box;
    background: -internal-light-dark(#d83b01, #e98f6d);
  }

  /* progress */

  progress {
    appearance: auto;
    box-sizing: border-box;
    display: inline-block;
    block-size: 1em;
    inline-size: 10em;
    vertical-align: -0.2em;
  }

  progress::-webkit-progress-inner-element {
    box-sizing: inherit;
    -webkit-user-modify: read-only;
    block-size: 100%;
    inline-size: 100%;
  }

  progress::-webkit-progress-bar {
    background-color: gray;
    block-size: 100%;
    inline-size: 100%;
    -webkit-user-modify: read-only !important;
    box-sizing: border-box;
  }

  progress::-webkit-progress-value {
    background-color: green;
    block-size: 100%;
    inline-size: 50%; /* should be removed later */
    -webkit-user-modify: read-only !important;
    box-sizing: border-box;
  }

  /* inline elements */

  u,
  ins {
    text-decoration: underline;
  }

  abbr[title],
  acronym[title] {
    text-decoration: dotted underline;
  }

  strong,
  b {
    font-weight: bold;
  }

  i,
  cite,
  em,
  var,
  address,
  dfn {
    font-style: italic;
  }

  tt,
  code,
  kbd,
  samp {
    font-family: monospace;
  }

  pre,
  xmp,
  plaintext,
  listing {
    display: block;
    font-family: monospace;
    white-space: pre;
    margin: 1rem 0;
  }

  mark {
    background-color: Mark;
    color: MarkText;
  }

  big {
    font-size: larger;
  }

  small {
    font-size: smaller;
  }

  s,
  strike,
  del {
    text-decoration: line-through;
  }

  sub {
    vertical-align: sub;
    font-size: smaller;
  }

  sup {
    vertical-align: super;
    font-size: smaller;
  }

  nobr {
    white-space: nowrap;
  }

  /* states */

  :-internal-selector-fragment-anchor {
    outline: Highlight 3px solid;
  }

  :-internal-spatial-navigation-interest {
    outline: auto 1px -webkit-focus-ring-color !important;
    box-shadow: none !important;
  }

  :focus-visible {
    outline: auto 1px -webkit-focus-ring-color;
  }

  html:focus-visible,
  body:focus-visible {
    outline: none;
  }

  embed:focus-visible,
  iframe:focus-visible,
  object:focus-visible {
    outline: none;
  }

  input:focus-visible,
  textarea:focus-visible,
  select:focus-visible {
    outline-offset: 0;
  }

  input[type="button" i]:focus-visible,
  input[type="file" i]:focus-visible,
  input[type="hidden" i]:focus-visible,
  input[type="image" i]:focus-visible,
  input[type="reset" i]:focus-visible,
  input[type="submit" i]:focus-visible,
  input[type="file" i]:focus-visible::-webkit-file-upload-button {
    outline-offset: 0;
  }

  input[type="checkbox" i]:focus-visible,
  input[type="radio" i]:focus-visible {
    outline-offset: 2px;
  }

  input[type="date" i]::-webkit-calendar-picker-indicator,
  input[type="datetime-local" i]::-webkit-calendar-picker-indicator,
  input[type="month" i]::-webkit-calendar-picker-indicator,
  input[type="week" i]::-webkit-calendar-picker-indicator {
    background-image: -internal-light-dark(url(images/calendar_icon.svg), url(images/calendar_icon_white.svg));
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: contain;
    block-size: 1em;
    inline-size: 1em;
    opacity: 1;
    outline: none;
    padding: 2px;
  }

  input[type="date" i]::-webkit-calendar-picker-indicator:focus-visible,
  input[type="datetime-local" i]::-webkit-calendar-picker-indicator:focus-visible,
  input[type="month" i]::-webkit-calendar-picker-indicator:focus-visible,
  input[type="week" i]::-webkit-calendar-picker-indicator:focus-visible {
    outline: solid 2px -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  input[type="time" i]::-webkit-calendar-picker-indicator {
    background-image: -internal-light-dark(url(images/time_icon.svg), url(images/time_icon_white.svg));
    background-origin: content-box;
    background-repeat: no-repeat;
    background-size: contain;
    opacity: 1;
    outline: none;
    margin-inline-start: 8px;
    padding-inline-start: 3px;
    padding-inline-end: 3px;
    padding-block: 3px;
    block-size: 1.05em;
    inline-size: 1.05em;
  }

  input[type="time" i]::-webkit-calendar-picker-indicator:focus-visible {
    outline: solid 2px -webkit-focus-ring-color;
    outline-offset: -2px;
  }

  input::-webkit-calendar-picker-indicator:hover {
    background-color: initial;
  }

  input::-webkit-datetime-edit-ampm-field:focus,
  input::-webkit-datetime-edit-day-field:focus,
  input::-webkit-datetime-edit-hour-field:focus,
  input::-webkit-datetime-edit-millisecond-field:focus,
  input::-webkit-datetime-edit-minute-field:focus,
  input::-webkit-datetime-edit-month-field:focus,
  input::-webkit-datetime-edit-second-field:focus,
  input::-webkit-datetime-edit-week-field:focus,
  input::-webkit-datetime-edit-year-field:focus {
    background-color: -internal-light-dark(highlight, #99c8ff);
    color: -internal-light-dark(highlighttext, #000000);
    outline: none;
  }

  input::-webkit-datetime-edit-year-field[disabled],
  input::-webkit-datetime-edit-month-field[disabled],
  input::-webkit-datetime-edit-week-field[disabled],
  input::-webkit-datetime-edit-day-field[disabled],
  input::-webkit-datetime-edit-ampm-field[disabled],
  input::-webkit-datetime-edit-hour-field[disabled],
  input::-webkit-datetime-edit-millisecond-field[disabled],
  input::-webkit-datetime-edit-minute-field[disabled],
  input::-webkit-datetime-edit-second-field[disabled] {
    color: -internal-light-dark(GrayText, rgb(165, 165, 165));
  }

  a:-webkit-any-link {
    color: -webkit-link;
    text-decoration: underline;
    cursor: pointer;
  }

  a:-webkit-any-link:active {
    color: -webkit-activelink;
  }

  a:-webkit-any-link:read-write {
    cursor: text;
  }

  a:-webkit-any-link:focus-visible {
    outline-offset: 1px;
  }

  /* HTML5 ruby elements */

  ruby,
  rt {
    text-indent: 0; /* blocks used for ruby rendering should not trigger this */
  }

  rt {
    line-height: normal;
    text-emphasis: none;
  }

  ruby > rt {
    display: block;
    font-size: 50%;
    text-align: start;
  }

  /* other elements */

  frameset,
  frame {
    display: block;
  }

  frameset {
    border-color: inherit;
  }

  iframe {
    border: 2px inset;
  }

  fencedframe {
    border: 2px inset;
    object-fit: contain !important;
    object-position: 50% 50% !important;
  }

  details {
    display: block;
  }

  summary {
    display: block;
  }

  /*
 * https://html.spec.whatwg.org/C/#the-details-and-summary-elements
 * The specification doesn't have |details >| and |:first-of-type|.
 * We add them because:
 *   - We had provided |summary { display: block }| for a long time,
 *     there are sites using <summary> without details, and they
 *     expect that <summary> is not a list-item.
 *   - Firefox does so.
 */
  details > summary:first-of-type {
    display: list-item;
    counter-increment: list-item 0;
    list-style: disclosure-closed inside;
  }

  details[open] > summary:first-of-type {
    list-style-type: disclosure-open;
  }

  bdi,
  output {
    unicode-bidi: isolate;
  }

  bdo {
    unicode-bidi: bidi-override;
  }

  textarea[dir="auto" i] {
    unicode-bidi: plaintext;
  }

  dialog {
    display: none;
    /* https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3 */
    position: absolute;
    inset-inline-start: 0;
    inset-inline-end: 0;
    width: fit-content;
    height: fit-content;
    margin: auto;
    border: solid;
    padding: 1em;
    background-color: Canvas;
    color: CanvasText;
  }

  dialog[open] {
    display: block;
  }

  dialog:-internal-dialog-in-top-layer {
    /* https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3 */
    position: fixed;
    overflow: auto;
    inset-block-start: 0;
    inset-block-end: 0;
    max-width: calc(100% - 6px - 2em);
    max-height: calc(100% - 6px - 2em);
    /* https://github.com/w3c/csswg-drafts/issues/6939#issuecomment-1016679588 */
    user-select: text;
    visibility: visible;
  }

  dialog:modal {
    overlay: auto !important;
  }

  /* TODO(foolip): In the Fullscreen spec, there's a ::backdrop block with the
   properties shared with :fullscreen::backdrop (see fullscreen.css). */
  dialog:-internal-dialog-in-top-layer::backdrop {
    position: fixed;
    inset: 0;
    /* https://html.spec.whatwg.org/multipage/rendering.html#flow-content-3 */
    background: rgba(0, 0, 0, 0.1);
  }

  slot {
    display: contents;
  }

  [popover] {
    position: fixed;
    inset: 0;
    width: fit-content;
    height: fit-content;
    margin: auto;
    border: solid;
    padding: 0.25em;
    overflow: auto;
    color: CanvasText;
    background-color: Canvas;
  }

  /* This ensures that popovers get display:none when they are not open, and we
   need to be careful not to affect <dialog popover> when open as a dialog. */
  [popover]:not(:popover-open):not(dialog[open]) {
    display: none;
  }

  /* The UA stylesheet has a rule like dialog{display:none}, so <dialog popover>
   needs this to be visible when it is open as a popover. */
  dialog:popover-open {
    display: block;
  }

  /* Popovers using anchor positioning get their inset properties reset, to make
 * it easier to position them. */
  [popover][anchor] {
    inset: auto;
  }

  /* This rule matches popovers (dialog or not) that are currently open as a
   popover. */
  [popover]:popover-open:not(dialog),
  dialog:popover-open:not([open]) {
    overlay: auto !important;
  }

  [popover]:-internal-popover-in-top-layer::backdrop {
    /* From the (modified) fullscreen spec: https://fullscreen.spec.whatwg.org/#user-agent-level-style-sheet-defaults: */
    position: fixed;
    inset: 0;
    /* Specific to [popover]: */
    pointer-events: none !important;
    background-color: transparent;
  }

  /* page */

  @page {
    /* FIXME: Define the right default values for page properties. */
    size: auto;
    margin: auto;
    padding: 0px;
    border-width: 0px;
  }

  /* Allows thead sections to print at the top of each page. */
  @media print {
    thead {
      break-inside: avoid;
    }
    tfoot {
      break-inside: avoid;
    }
  }

  /* spelling/grammar error pseudos */

  html::spelling-error {
    text-decoration: -internal-spelling-error-color spelling-error;
  }

  html::grammar-error {
    text-decoration: -internal-grammar-error-color grammar-error;
  }

  img {
    display: block;
    margin: 0 auto;
    max-width: 45rem;
    max-height: fit-content;
  }

  div {
    margin: 5rem auto;
    padding: 0 25rem;
    line-height: 1.5rem;
    text-align: justify;

    & h1 {
      line-height: 4rem;
      font-size: 3rem;
      font-weight: 550;
      text-align: left;
      padding: 0 5rem;
    }
  }
`;

const StyledSkeleton = styled(Skeleton)`
  /* aspect-ratio: 1; */
  height: 20rem;
  width: 45rem;
  margin: auto;
`;
export default function BlogPage() {
  const { id } = useParams();

  const blogQuery = BlogQueryId(id);

  let content;

  if (blogQuery.isLoading) {
    return (
      <StyledContent>
        <div>
          <StyledSkeleton />
          <Skeleton count={10} />
        </div>
      </StyledContent>
    );
  }
  if (blogQuery.isSuccess) {
    content = blogQuery.data.content;
  }

  return (
    <StyledContent>
      <div>{parse(content)}</div>
    </StyledContent>
  );
  // return (
  //   <div dangerouslySetInnerHTML={{ __html: blogQuery.data.content }}></div>
  // );
}
