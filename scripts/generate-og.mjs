import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

// An editable, code-rendered social card. Run: node scripts/generate-og.mjs
const root = new URL('../', import.meta.url);
const portrait = await readFile(new URL('public/assets/Zeyad-portrait.jpg', root));
const photo = `data:image/jpeg;base64,${portrait.toString('base64')}`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow"><stop stop-color="#c5f24a" stop-opacity=".1"/><stop offset="1" stop-color="#0b0c0a" stop-opacity="0"/></radialGradient>
    <linearGradient id="shade" x2="0" y2="1"><stop offset=".55" stop-color="#0b0c0a" stop-opacity="0"/><stop offset="1" stop-color="#0b0c0a" stop-opacity=".9"/></linearGradient>
    <clipPath id="portrait"><rect x="832" y="94" width="300" height="424" rx="24"/></clipPath>
  </defs>
  <rect width="1200" height="630" fill="#0b0c0a"/>
  <ellipse cx="1030" cy="180" rx="470" ry="420" fill="url(#glow)"/>
  <path d="M64 546H1136" stroke="#ece8dc" stroke-opacity=".14"/>
  <circle cx="72" cy="72" r="5" fill="#c5f24a"/>
  <text x="90" y="78" fill="#ece8dc" font-family="Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="3">ZEYAD SALAMA</text>
  <text x="64" y="126" fill="#a7a497" font-family="Arial, sans-serif" font-size="15" letter-spacing="2.5">SOFTWARE ENGINEER · FULL STACK</text>
  <text x="60" y="250" fill="#ece8dc" font-family="Arial, sans-serif" font-size="83" font-weight="700" letter-spacing="-5">Systems depth.</text>
  <text x="60" y="345" fill="#ece8dc" font-family="Arial, sans-serif" font-size="83" font-weight="700" letter-spacing="-5">Product</text>
  <text x="365" y="345" fill="#c5f24a" font-family="Georgia, serif" font-style="italic" font-size="93" letter-spacing="-4">polish.</text>
  <text x="64" y="405" fill="#c4c0b3" font-family="Arial, sans-serif" font-size="23">From responsive interfaces to reliable systems.</text>
  <g font-family="Arial, sans-serif" font-size="17" fill="#c4c0b3" text-anchor="middle">
    <rect x="64" y="449" width="94" height="38" rx="19" fill="#141612" stroke="#33362c"/><text x="111" y="474">React</text>
    <rect x="168" y="449" width="102" height="38" rx="19" fill="#141612" stroke="#33362c"/><text x="219" y="474">Next.js</text>
    <rect x="280" y="449" width="128" height="38" rx="19" fill="#141612" stroke="#33362c"/><text x="344" y="474">TypeScript</text>
    <rect x="418" y="449" width="102" height="38" rx="19" fill="#141612" stroke="#33362c"/><text x="469" y="474">Django</text>
    <rect x="530" y="449" width="134" height="38" rx="19" fill="#141612" stroke="#33362c"/><text x="597" y="474">PostgreSQL</text>
  </g>
  <rect x="820" y="82" width="324" height="448" rx="34" fill="#141612" stroke="#c8a46b" stroke-opacity=".5"/>
  <image href="${photo}" x="832" y="94" width="300" height="424" preserveAspectRatio="xMidYMid slice" clip-path="url(#portrait)"/>
  <rect x="832" y="94" width="300" height="424" rx="24" fill="url(#shade)"/>
  <path d="M820 190H768V160H736M820 380H766V421H736" fill="none" stroke="#8f95ff" stroke-width="1.5"/>
  <circle cx="820" cy="190" r="4" fill="#0b0c0a" stroke="#8f95ff" stroke-width="2"/>
  <circle cx="820" cy="380" r="4" fill="#0b0c0a" stroke="#c5f24a" stroke-width="2"/>
  <g font-family="Arial, sans-serif">
    <rect x="919" y="122" width="248" height="64" rx="16" fill="#141612" stroke="#454a39"/>
    <rect x="932" y="136" width="36" height="36" rx="10" fill="#8f95ff" fill-opacity=".14"/>
    <path d="M941 146H959V161H941ZM941 150H959" fill="none" stroke="#8f95ff" stroke-width="1.6"/>
    <text x="980" y="149" fill="#ece8dc" font-size="17" font-weight="700">React + Next.js</text>
    <text x="980" y="169" fill="#9b998e" font-size="11" letter-spacing="1.5">FRONTEND</text>
    <rect x="776" y="390" width="214" height="64" rx="16" fill="#141612" stroke="#454a39"/>
    <text x="791" y="429" fill="#c5f24a" font-size="25">{ }</text>
    <text x="839" y="417" fill="#ece8dc" font-size="17" font-weight="700">Django + APIs</text>
    <text x="839" y="438" fill="#9b998e" font-size="11" letter-spacing="1.5">BACKEND</text>
    <text x="853" y="494" fill="#c5f24a" font-size="14">●</text>
    <text x="873" y="494" fill="#ece8dc" font-size="14">Build the whole product.</text>
  </g>
  <text x="64" y="585" fill="#9b998e" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">EGYPT</text>
  <text x="1136" y="585" fill="#c5f24a" font-family="Arial, sans-serif" font-size="13" letter-spacing="2" text-anchor="end">OPEN TO SOFTWARE ENGINEERING ROLES</text>
</svg>`;

await writeFile(new URL('public/og.svg', root), svg);
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('public/og.png', root)));
console.log('Generated public/og.svg and public/og.png (1200 × 630).');
