// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";

contract Alphabet {
    string private _startSvg =
        '<svg width="250" height="250" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="#201E50" d="M0 0h250v250H0z" />';

    string private _endSvg =
        '<path d="M40.45 100.316h2.64v-13.68h-2.64v-9.84h2.76c0-4.88 1.18-8.46 3.54-10.74 2.4-2.28 5.88-3.42 10.44-3.42 2.2 0 4.16.16 5.88.48 1.76.32 3.04.68 3.84 1.08v9.42c-2.12-.2-4.08-.3-5.88-.3-1.56 0-2.64.26-3.24.78-.6.52-.9 1.42-.9 2.7h4.68v9.84h-4.68v13.68h4.68v9.84H40.45v-9.84Z" fill="#226F54"/><path d="m73.437 110.156-7.92-23.52h-2.52v-9.84h18.54v9.84h-2.52l2.16 9.36h.6l4.38-19.2h11.04l4.38 19.2h.6l2.1-9.36h-2.52v-9.84h17.4v9.84h-2.52l-7.62 23.52h-14.58l-3.3-16.68h-.6l-3.3 16.68h-13.8Zm65.284.84c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm32.145 21.96c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm40.005 21.96c-2.04 0-3.86-.5-5.46-1.5-1.56-1-2.84-2.14-3.84-3.42v4.08h-16.44v-9.84h2.64v-27h-2.64v-9.84h16.44v17.4c1-1.28 2.28-2.42 3.84-3.42 1.6-1 3.42-1.5 5.46-1.5 4.08 0 7.14 1.52 9.18 4.56 2.08 3.04 3.12 7.36 3.12 12.96 0 5.6-1.04 9.92-3.12 12.96-2.04 3.04-5.1 4.56-9.18 4.56Zm-5.82-10.68c1.16 0 2.02-.3 2.58-.9.6-.64.9-1.62.9-2.94v-6c0-1.32-.3-2.28-.9-2.88-.56-.64-1.42-.96-2.58-.96-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v6c0 1.32.28 2.3.84 2.94.6.6 1.48.9 2.64.9Z" fill="#226F54"/><path d="M34.026 97.282h2.64v-13.68h-2.64v-9.84h2.76c0-4.88 1.18-8.46 3.54-10.74 2.4-2.28 5.88-3.42 10.44-3.42 2.2 0 4.16.16 5.88.48 1.76.32 3.04.68 3.84 1.08v9.42c-2.12-.2-4.08-.3-5.88-.3-1.56 0-2.64.26-3.24.78-.6.52-.9 1.42-.9 2.7h4.68v9.84h-4.68v13.68h4.68v9.84h-21.12v-9.84Z" fill="#FAA916"/><path d="m67.013 107.122-7.92-23.52h-2.52v-9.84h18.54v9.84h-2.52l2.16 9.36h.6l4.38-19.2h11.04l4.38 19.2h.6l2.1-9.36h-2.52v-9.84h17.4v9.84h-2.52l-7.62 23.52h-14.58l-3.3-16.68h-.6l-3.3 16.68h-13.8Zm65.284.84c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm32.145 21.96c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm40.005 21.96c-2.04 0-3.86-.5-5.46-1.5-1.56-1-2.84-2.14-3.84-3.42v4.08h-16.44v-9.84h2.64v-27h-2.64v-9.84h16.44v17.4c1-1.28 2.28-2.42 3.84-3.42 1.6-1 3.42-1.5 5.46-1.5 4.08 0 7.14 1.52 9.18 4.56 2.08 3.04 3.12 7.36 3.12 12.96 0 5.6-1.04 9.92-3.12 12.96-2.04 3.04-5.1 4.56-9.18 4.56Zm-5.82-10.68c1.16 0 2.02-.3 2.58-.9.6-.64.9-1.62.9-2.94v-6c0-1.32-.3-2.28-.9-2.88-.56-.64-1.42-.96-2.58-.96-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v6c0 1.32.28 2.3.84 2.94.6.6 1.48.9 2.64.9Z" fill="#FAA916"/><path d="M29.438 94.249h2.64v-13.68h-2.64v-9.84h2.76c0-4.88 1.18-8.46 3.54-10.74 2.4-2.28 5.88-3.42 10.44-3.42 2.2 0 4.16.16 5.88.48 1.76.32 3.04.68 3.84 1.08v9.42c-2.12-.2-4.08-.3-5.88-.3-1.56 0-2.64.26-3.24.78-.6.52-.9 1.42-.9 2.7h4.68v9.84h-4.68v13.68h4.68v9.84h-21.12v-9.84Z" fill="#DA2C38"/><path d="m62.425 104.089-7.92-23.52h-2.52v-9.84h18.54v9.84h-2.52l2.16 9.36h.6l4.38-19.2h11.04l4.38 19.2h.6l2.1-9.36h-2.52v-9.84h17.4v9.84h-2.52l-7.62 23.52h-14.58l-3.3-16.68h-.6l-3.3 16.68h-13.8Zm65.283.84c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm32.145 21.96c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm40.005 21.96c-2.04 0-3.86-.5-5.46-1.5-1.56-1-2.84-2.14-3.84-3.42v4.08h-16.44v-9.84h2.64v-27h-2.64v-9.84h16.44v17.4c1-1.28 2.28-2.42 3.84-3.42 1.6-1 3.42-1.5 5.46-1.5 4.08 0 7.14 1.52 9.18 4.56 2.08 3.04 3.12 7.36 3.12 12.96 0 5.6-1.04 9.92-3.12 12.96-2.04 3.04-5.1 4.56-9.18 4.56Zm-5.82-10.68c1.16 0 2.02-.3 2.58-.9.6-.64.9-1.62.9-2.94v-6c0-1.32-.3-2.28-.9-2.88-.56-.64-1.42-.96-2.58-.96-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v6c0 1.32.28 2.3.84 2.94.6.6 1.48.9 2.64.9Z" fill="#DA2C38"/><path d="M23.014 90.204h2.64v-13.68h-2.64v-9.84h2.76c0-4.88 1.18-8.46 3.54-10.74 2.4-2.28 5.88-3.42 10.44-3.42 2.2 0 4.16.16 5.88.48 1.76.32 3.04.68 3.84 1.08v9.42c-2.12-.2-4.08-.3-5.88-.3-1.56 0-2.64.26-3.24.78-.6.52-.9 1.42-.9 2.7h4.68v9.84h-4.68v13.68h4.68v9.84h-21.12v-9.84Z" fill="#DB1CC1"/><path d="m56.001 100.044-7.92-23.52h-2.52v-9.84h18.54v9.84h-2.52l2.16 9.36h.6l4.38-19.2h11.04l4.38 19.2h.6l2.1-9.36h-2.52v-9.84h17.4v9.84h-2.52l-7.62 23.52h-14.58l-3.3-16.68h-.6l-3.3 16.68h-13.8Zm65.283.84c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm32.145 21.96c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm40.005 21.96c-2.04 0-3.86-.5-5.46-1.5-1.56-1-2.84-2.14-3.84-3.42v4.08h-16.44v-9.84h2.64v-27h-2.64v-9.84h16.44v17.4c1-1.28 2.28-2.42 3.84-3.42 1.6-1 3.42-1.5 5.46-1.5 4.08 0 7.14 1.52 9.18 4.56 2.08 3.04 3.12 7.36 3.12 12.96 0 5.6-1.04 9.92-3.12 12.96-2.04 3.04-5.1 4.56-9.18 4.56Zm-5.82-10.68c1.16 0 2.02-.3 2.58-.9.6-.64.9-1.62.9-2.94v-6c0-1.32-.3-2.28-.9-2.88-.56-.64-1.42-.96-2.58-.96-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v6c0 1.32.28 2.3.84 2.94.6.6 1.48.9 2.64.9Z" fill="#DB1CC1"/><path d="M19.802 86.16h2.64V72.48h-2.64v-9.84h2.76c0-4.88 1.18-8.46 3.54-10.74 2.4-2.28 5.88-3.42 10.44-3.42 2.2 0 4.16.16 5.88.48 1.76.32 3.04.68 3.84 1.08v9.42c-2.12-.2-4.08-.3-5.88-.3-1.56 0-2.64.26-3.24.78-.6.52-.9 1.42-.9 2.7h4.68v9.84h-4.68v13.68h4.68V96h-21.12v-9.84Z" fill="#fff"/><path d="m52.79 96-7.92-23.52h-2.52v-9.84h18.54v9.84h-2.52l2.16 9.36h.6l4.38-19.2h11.04l4.38 19.2h.6l2.1-9.36h-2.52v-9.84h17.4v9.84h-2.52L88.37 96H73.79l-3.3-16.68h-.6L66.59 96h-13.8Zm65.282.84c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm32.145 21.96c-5.68 0-10.12-1.48-13.32-4.44-3.2-3-4.8-7.36-4.8-13.08s1.6-10.06 4.8-13.02c3.2-3 7.64-4.5 13.32-4.5 5.64 0 9.7 1.48 12.18 4.44 2.52 2.92 3.78 6.56 3.78 10.92v4.32h-19.44v.36c0 1.48.44 2.58 1.32 3.3.88.68 2.34 1.02 4.38 1.02 2.44 0 4.76-.18 6.96-.54 2.2-.36 4.12-.82 5.76-1.38v9.6c-1.4.76-3.46 1.46-6.18 2.1-2.68.6-5.6.9-8.76.9Zm3.48-21.96v-.72c0-1.36-.3-2.34-.9-2.94-.56-.6-1.42-.9-2.58-.9-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v.72h6.96Zm40.005 21.96c-2.04 0-3.86-.5-5.46-1.5-1.56-1-2.84-2.14-3.84-3.42V96h-16.44v-9.84h2.64v-27h-2.64v-9.84h16.44v17.4c1-1.28 2.28-2.42 3.84-3.42 1.6-1 3.42-1.5 5.46-1.5 4.08 0 7.14 1.52 9.18 4.56 2.08 3.04 3.12 7.36 3.12 12.96 0 5.6-1.04 9.92-3.12 12.96-2.04 3.04-5.1 4.56-9.18 4.56Zm-5.82-10.68c1.16 0 2.02-.3 2.58-.9.6-.64.9-1.62.9-2.94v-6c0-1.32-.3-2.28-.9-2.88-.56-.64-1.42-.96-2.58-.96-1.16 0-2.04.32-2.64.96-.56.6-.84 1.56-.84 2.88v6c0 1.32.28 2.3.84 2.94.6.6 1.48.9 2.64.9Z" fill="#fff"/></svg>';

    mapping(string => string) public alphabet;

    constructor() {
        alphabet[
            "A"
        ] = '<path d="M10.0858 29H7.76578L6.72578 17.88H4.68578L2.84578 29H0.965781L2.76578 0.599998H10.0858V29ZM7.56578 2.12C7.56578 1.96 7.48578 1.88 7.32578 1.88H5.60578C5.44578 1.88 5.36578 1.96 5.36578 2.12V15.8C5.36578 15.9333 5.44578 16 5.60578 16H7.32578C7.48578 16 7.56578 15.92 7.56578 15.76V2.12Z" fill="white"/>';
        alphabet[
            "B"
        ] = '<path d="M7.28672 14.04C7.92672 14.1467 8.42005 14.2667 8.76672 14.4C9.14005 14.5067 9.32672 14.68 9.32672 14.92V27C9.32672 27.48 8.98005 27.8 8.28672 27.96C7.62005 28.12 6.96672 28.2 6.32672 28.2H0.886719V0.599998H5.40672C6.23339 0.599998 7.02005 0.733332 7.76672 0.999998C8.54005 1.26666 8.92672 1.77333 8.92672 2.52L8.88672 2.92L7.72672 13.12C7.72672 13.4133 7.70005 13.6133 7.64672 13.72C7.59339 13.8267 7.47339 13.9333 7.28672 14.04ZM3.16672 12.4C3.16672 12.6133 3.32672 12.72 3.64672 12.72L5.16672 12.12C5.40672 12.0667 5.52672 11.9467 5.52672 11.76L5.92672 3.12C5.92672 3.01333 5.74005 2.96 5.36672 2.96H3.64672C3.32672 2.96 3.16672 3.01333 3.16672 3.12V12.4ZM5.08672 25.96C5.56672 25.96 5.90005 25.8533 6.08672 25.64C6.30005 25.4267 6.40672 25.2133 6.40672 25C6.40672 24.84 6.38005 24.76 6.32672 24.76V15.76C6.40672 15.7067 6.44672 15.6667 6.44672 15.64C6.44672 15.56 6.35339 15.52 6.16672 15.52H4.48672C4.40672 15.52 4.31339 15.5467 4.20672 15.6C4.12672 15.6533 4.07339 15.7067 4.04672 15.76V25.84C4.07339 25.8667 4.12672 25.8933 4.20672 25.92C4.28672 25.9467 4.38005 25.96 4.48672 25.96H5.08672Z" fill="white"/>';
        alphabet[
            "C"
        ] = '<path d="M10.0803 29H4.36031C3.00031 29 1.98698 28.7733 1.32031 28.32C0.653646 27.84 0.320313 27.24 0.320313 26.52V2.84C0.320313 2.2 0.600313 1.66667 1.16031 1.24C1.72031 0.813332 2.50698 0.599998 3.52031 0.599998H10.0803V2.84L9.44031 7.84H6.80031L6.40031 3.32C6.40031 3.08 6.24031 2.96 5.92031 2.96H4.24031C3.73365 2.96 3.36031 3.17333 3.12031 3.6C2.90698 4 2.80031 4.45333 2.80031 4.96C2.80031 5.25333 2.84031 5.42667 2.92031 5.48L3.72031 25.44C3.64031 25.4667 3.60031 25.5067 3.60031 25.56C3.60031 25.64 3.72031 25.68 3.96031 25.68H6.32031C6.64031 25.68 6.80031 25.6 6.80031 25.44L7.60031 22.32H10.0803V29Z" fill="white"/>';
        alphabet[
            "D"
        ] = '<path d="M5.36953 0.599998C6.64953 0.599998 7.68953 1.01333 8.48953 1.84C9.3162 2.66667 9.72953 3.72 9.72953 5L8.52953 26.72L6.08953 29H0.769531V0.599998H5.36953ZM6.28953 3.48C6.28953 3.32 6.12953 3.24 5.80953 3.24H4.00953C3.92953 3.24 3.84953 3.26666 3.76953 3.32C3.68953 3.37333 3.64953 3.42667 3.64953 3.48V26.12L4.00953 26.36L5.48953 26.16C5.72953 26 5.84953 25.8267 5.84953 25.64L6.28953 3.48Z" fill="white"/>';
        alphabet[
            "E"
        ] = '<path d="M9.91188 28.2H0.511875L1.43188 0.599998H9.55188V3.72H3.83188V11.96H8.19188V13.96L4.03188 14.68V24.88L9.43188 24.16L9.91188 28.2Z" fill="white"/>';
        alphabet[
            "F"
        ] = '<path d="M0.175 29L1.095 0.599998H8.415V4.12H3.495V12.08H7.855V14.08L3.695 14.8V29H0.175Z" fill="white"/>';
        alphabet[
            "G"
        ] = '<path d="M2.54094 28.2C1.95427 28.2 1.46094 27.9333 1.06094 27.4C0.660938 26.8667 0.460938 26.1067 0.460938 25.12V2.76L1.90094 0.599998H10.4209V6.56H8.70094L7.50094 2.96H4.82094C3.75427 2.96 3.19427 3.56 3.14094 4.76L3.86094 24.6C3.86094 24.7867 3.95427 24.96 4.14094 25.12C4.3276 25.2533 4.51427 25.32 4.70094 25.32H7.62094C7.8076 25.32 7.98094 25.28 8.14094 25.2C8.3276 25.0933 8.42094 24.9733 8.42094 24.84L8.82094 17.08L6.42094 17V14.76L10.9409 14.24V28.2H2.54094Z" fill="white"/>';
        alphabet[
            "H"
        ] = '<path d="M7.45609 15.96L4.25609 16.32L4.69609 29H1.89609L0.976094 0.599998H4.21609V13.6L7.17609 13V1.4H10.6561V3.08L10.0561 4.04L10.8961 29.8H8.29609L7.45609 15.96Z" fill="white"/>';
        alphabet["I"] = '<path d="M4.40531 29H1.44531V4.36L0.725313 2.44V0.599998H4.76531L4.40531 29Z" fill="white"/>';
        alphabet[
            "J"
        ] = '<path d="M9.66438 29H2.42438L0.984375 22.12L4.14438 21.32L4.34438 26.84L6.90438 27.04V4.36L6.18438 2.44V0.599998H10.0244L9.66438 29Z" fill="white"/>';
        alphabet[
            "K"
        ] = '<path d="M9.86906 29.8H6.66906V18.44L4.50906 16.44L4.06906 16.76V29.8H1.38906L0.469063 1.4H3.58906V13.4L4.62906 14L6.42906 12.56L6.82906 0.599998H10.2691L8.58906 13.56L6.66906 14.84L9.42906 16.44L9.86906 29.8Z" fill="white"/>';
        alphabet[
            "L"
        ] = '<path d="M8.28656 29H0.726563V0.599998H4.60656L3.76656 25.72L8.28656 26.44V29Z" fill="white"/>';
        alphabet[
            "M"
        ] = '<path d="M0.16875 30.8V1.6H3.76875L5.84875 16.72H6.08875L7.96875 0.799999H11.8488V30H9.20875L10.0888 3.56H9.92875L6.44875 22.76H5.24875L2.40875 5.6H2.24875V30.8H0.16875Z" fill="white"/>';
        alphabet[
            "N"
        ] = '<path d="M11.525 29H6.925L2.845 2.96H2.685V29H0.325V0.599998H4.965L8.565 26.68H8.725L9.605 0.599998H11.925L11.525 29Z" fill="white"/>';
        alphabet[
            "O"
        ] = '<path d="M2.35281 0.599998H7.75281L9.35281 1.72V27.56L6.83281 29H2.99281L0.632813 27.32V1.88L2.35281 0.599998ZM6.67281 3.04C6.67281 2.8 6.55281 2.68 6.31281 2.68H4.23281C3.99281 2.68 3.87281 2.8 3.87281 3.04V25.96C3.87281 26.12 3.99281 26.2 4.23281 26.2H5.91281C6.15281 26.2 6.27281 26.12 6.27281 25.96L6.67281 3.04Z" fill="white"/>';
        alphabet[
            "P"
        ] = '<path d="M5.88578 0.599998C6.89912 0.599998 7.75245 0.799998 8.44578 1.2C9.13911 1.57333 9.48578 2.02667 9.48578 2.56V13.84C9.48578 14.1333 9.37911 14.5067 9.16578 14.96C8.97912 15.3867 8.57912 15.8 7.96578 16.2C7.35245 16.5733 6.48578 16.76 5.36578 16.76H3.24578V29H0.925781V2.24L0.0457813 1.76V0.599998H5.88578ZM3.80578 14.08C3.80578 14.16 3.84578 14.24 3.92578 14.32C4.03245 14.3733 4.15245 14.4 4.28578 14.4L6.00578 14C6.16578 14 6.24578 13.92 6.24578 13.76L6.64578 3.68C6.61911 3.33333 6.47245 3.04 6.20578 2.8C5.93911 2.53333 5.52578 2.4 4.96578 2.4H4.28578C3.96578 2.4 3.80578 2.49333 3.80578 2.68V14.08Z" fill="white"/>';
        alphabet[
            "Q"
        ] = '<path d="M2.15281 0.599998H7.75281L9.35281 2.08V27.8H7.15281L9.71281 33.96L7.71281 34.24L6.91281 33.56L5.15281 27.8H0.632813V2.44L2.15281 0.599998ZM6.67281 3.44C6.67281 3.2 6.55281 3.08 6.31281 3.08H3.83281C3.59281 3.08 3.47281 3.2 3.47281 3.44L3.07281 24.76C3.07281 24.92 3.19281 25 3.43281 25H4.31281L3.91281 23.72L5.35281 23.36L6.03281 25C6.16615 25 6.29948 24.9733 6.43281 24.92C6.59281 24.8667 6.67281 24.8133 6.67281 24.76V3.44Z" fill="white"/>';
        alphabet[
            "R"
        ] = '<path d="M3.93328 29H1.61328V2.24L0.733281 1.76V0.599998H6.97328C7.98662 0.599998 8.82662 0.799998 9.49328 1.2C10.1866 1.57333 10.5466 2.02667 10.5733 2.56L10.1733 13.64C10.1733 14.04 9.98661 14.5333 9.61328 15.12C9.26662 15.68 8.61328 16.0933 7.65328 16.36L10.0133 20.76L10.8533 29L7.93328 29.12L7.29328 21.28L5.09328 16.56H3.93328V29ZM4.49328 13.68C4.49328 13.76 4.53328 13.84 4.61328 13.92C4.71995 13.9733 4.83995 14 4.97328 14H7.09328C7.25328 14 7.33328 13.92 7.33328 13.76L7.57328 3.64C7.57328 3.26667 7.39995 2.96 7.05328 2.72C6.73328 2.45333 6.03995 2.32 4.97328 2.32C4.65328 2.42666 4.49328 2.58666 4.49328 2.8V13.68Z" fill="white"/>';
        alphabet[
            "S"
        ] = '<path d="M4.05781 12.16L9.13781 13.48V26.6C9.13781 27.16 8.85781 27.7067 8.29781 28.24C7.73781 28.7467 7.16448 29 6.57781 29H0.857813V26.28H6.41781L5.45781 15.56L0.857813 14.36V2.48C0.857813 2.05333 1.01781 1.64 1.33781 1.24C1.68448 0.813332 2.05781 0.599998 2.45781 0.599998H9.13781V2.56L3.45781 3.32L4.05781 12.16Z" fill="white"/>';
        alphabet[
            "T"
        ] = '<path d="M9.49219 2.88H6.61219V28.2H3.25219V2.6L0.492188 2.12L0.892188 0.599998H9.49219V2.88Z" fill="white"/>';
        alphabet[
            "U"
        ] = '<path d="M9.20859 27.4C9.20859 27.7733 9.00859 28.1333 8.60859 28.48C8.23526 28.8267 7.86193 29 7.48859 29H0.808594V1.52H3.20859V26.24L6.68859 26.48L5.84859 0.599998H9.24859L9.20859 27.4Z" fill="white"/>';
        alphabet[
            "V"
        ] = '<path d="M5.295 29.4L0.655 0.599998H3.815L6.655 25.88H6.815L8.735 0.599998H11.335L7.935 29L5.295 29.4Z" fill="white"/>';
        alphabet[
            "W"
        ] = '<path d="M13.4003 0.599998L11.9603 29H9.44031L7.00031 12.32H6.84031L4.40031 29H2.20031L0.640313 0.599998H3.56031V25.56H3.72031L6.00031 5.08H7.72031L10.4003 25.56H10.6003V0.599998H13.4003Z" fill="white"/>';
        alphabet[
            "X"
        ] = '<path d="M1.96578 17.28L4.80578 14.44L0.605781 0.599998H3.88578L6.76578 13.56L7.56578 12.28L8.76578 0.599998H11.7258L10.5258 12.92L7.80578 15.64L11.2058 27.2L11.7258 27.8V29H8.80578V26.8L5.80578 17L4.68578 18.48L4.32578 29H0.845781L1.96578 17.28Z" fill="white"/>';
        alphabet[
            "Y"
        ] = '<path d="M5.61859 29.8H2.93859V14.88L0.258594 10.12V0.599998H2.81859L3.33859 11.76L4.77859 11.88L5.49859 0.599998H7.73859V10.96L5.61859 13.44V29.8Z" fill="white"/>';
        alphabet[
            "Z"
        ] = '<path d="M0.884844 29L0.164844 28.12L1.52484 25.48L6.24484 3.48L0.804844 2.2V0.599998H8.60484L9.84484 1.84L4.16484 25.64L9.52484 26.4L9.84484 29H0.884844Z" fill="white"/>';
    }

    function createNFT(string memory _str) public view virtual returns (string memory) {
        string memory _username = "";
        uint _totalWidth = 224;
        uint _offset = 15;
        require(bytes(_str).length <= 15, "Username must be less than 15 characters");
        for (uint256 i = 0; i < bytes(_str).length; i++) {
            string memory _letter = string(abi.encodePacked(bytes(_str)[i]));
            string memory _letterSVG = alphabet[_letter];
            require(bytes(_letterSVG).length > 0, "Invalid character");
            string memory _xValStr = Strings.toString(_offset);
            string memory _wrappedLetter = wrapLetter(_xValStr, _letterSVG);
            _username = string(abi.encodePacked(_username, _wrappedLetter));
            _offset += 14;
        }
        uint _centerOffset = (_totalWidth - _offset) / 2;
        string memory _startCenterWrap = '<svg x="';
        string memory _endCenterX = '">';
        string memory _endWrap = "</svg>";
        string memory _centeredUsername = string(
            abi.encodePacked(_startCenterWrap, Strings.toString(_centerOffset), _endCenterX, _username, _endWrap)
        );
        return string(abi.encodePacked(_startSvg, _centeredUsername, _endSvg));
    }

    function wrapLetter(string memory _xValStr, string memory _letter) private pure returns (string memory) {
        string memory _beginG = '<svg y="148" x="';
        string memory _endX = '">';
        string memory _endG = "</svg>";
        return string(abi.encodePacked(_beginG, _xValStr, _endX, _letter, _endG));
    }
}
