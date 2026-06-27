#!/usr/bin/env node
/**
 * encrypt-portal.mjs — generate the password-gated /qc-demo page.
 *
 * Reads the plaintext portal (portal/mammo-qc-portal.html), encrypts it with a
 * password using AES-256-GCM (key derived via PBKDF2-SHA256), and writes a
 * self-contained gate to public/qc-demo/index.html that ships ONLY ciphertext.
 *
 * Why encryption rather than a simple JS check: on static hosting (GitHub Pages)
 * there's no server to verify a password, so any "compare" gate still ships the
 * content in the page where it can be read via view-source. Encrypting means a
 * wrong password literally cannot recover the page (AES-GCM auth tag fails), and
 * the ciphertext reveals nothing. Decryption happens in the browser via the
 * built-in WebCrypto API — no dependencies.
 *
 * Usage:
 *   node scripts/encrypt-portal.mjs "your-password"
 *   QC_PORTAL_PASSWORD="your-password" node scripts/encrypt-portal.mjs
 *
 * Re-run this and commit public/qc-demo/index.html to change the password.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = resolve(ROOT, 'portal/mammo-qc-portal.html');
const OUT = resolve(ROOT, 'public/qc-demo/index.html');
const ITERATIONS = 250_000;

const password = process.argv[2] || process.env.QC_PORTAL_PASSWORD;
if (!password) {
  console.error('Error: provide a password as the first argument or via QC_PORTAL_PASSWORD.');
  process.exit(1);
}

const { subtle } = globalThis.crypto;
const b64 = (buf) => Buffer.from(buf).toString('base64');

const plaintext = await readFile(SRC, 'utf8');

const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
const keyMaterial = await subtle.importKey(
  'raw',
  new TextEncoder().encode(password),
  'PBKDF2',
  false,
  ['deriveKey']
);
const key = await subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  keyMaterial,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);
const ciphertext = new Uint8Array(
  await subtle.encrypt({ name: 'AES-GCM', iv }, key, new TextEncoder().encode(plaintext))
);

const html = gatePage({
  salt: b64(salt),
  iv: b64(iv),
  ciphertext: b64(ciphertext),
  iterations: ITERATIONS,
});

await mkdir(dirname(OUT), { recursive: true });
await writeFile(OUT, html, 'utf8');
console.log(`Wrote ${OUT}`);
console.log(`  plaintext: ${plaintext.length} chars  ->  ciphertext: ${ciphertext.length} bytes`);
console.log(`  PBKDF2 iterations: ${ITERATIONS}`);

/** The gate page template. Self-contained: inline CSS + WebCrypto, no deps. */
function gatePage({ salt, iv, ciphertext, iterations }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Restricted — Beacon Diagnostics</title>
<style>
  :root{
    --navy:#0B2447; --slate:#3D5A80; --amber:#D4A017; --amber-deep:#9C6F0E;
    --bg:#F7F8FA; --text:#1A1D29;
    --serif:Georgia,'Times New Roman',serif;
    --sans:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;
  }
  *{box-sizing:border-box}
  html,body{height:100%}
  body{margin:0;font-family:var(--sans);color:var(--text);
    background:radial-gradient(1200px 600px at 50% -10%, #12325f 0%, var(--navy) 55%);
    display:grid;place-items:center;min-height:100vh;padding:24px}
  .card{width:100%;max-width:400px;background:rgba(255,255,255,0.98);
    border-radius:14px;padding:36px 32px;box-shadow:0 18px 50px rgba(0,0,0,0.28)}
  .mark{display:flex;align-items:center;gap:10px;margin-bottom:22px}
  .mark img{flex:none;display:block;object-fit:contain}
  .mark span{font-family:var(--serif);font-weight:600;font-size:19px;color:var(--navy);letter-spacing:-0.01em}
  h1{font-family:var(--serif);font-weight:600;font-size:24px;color:var(--navy);
    margin:0 0 6px;letter-spacing:-0.01em}
  p.sub{margin:0 0 22px;color:var(--slate);font-size:14px;line-height:1.55}
  label{display:block;font-size:13px;font-weight:500;color:var(--slate);margin-bottom:7px}
  input{width:100%;padding:12px 14px;font-size:15px;border:1px solid #c9d2e0;
    border-radius:7px;background:#fff;color:var(--text)}
  input:focus{outline:2px solid var(--amber-deep);outline-offset:1px;border-color:transparent}
  button{margin-top:16px;width:100%;padding:13px 16px;font-size:15px;font-weight:500;
    letter-spacing:0.02em;color:#fff;background:var(--amber-deep);border:0;border-radius:7px;
    cursor:pointer;transition:transform .12s cubic-bezier(.4,0,.2,1),background-color .12s}
  button:hover{background:#855e0b}
  button:active{transform:scale(.98)}
  button[disabled]{opacity:.6;cursor:progress}
  .err{margin-top:14px;font-size:13.5px;color:#9c2b1e;min-height:18px}
  .foot{margin-top:20px;font-size:12px;color:#92a0b6;line-height:1.5}
</style>
</head>
<body>
  <main class="card" role="main">
    <div class="mark" aria-hidden="true">
      <img src="../assets/beacon-mark.png" width="30" height="30" alt="" />
      <span>Beacon Diagnostics</span>
    </div>
    <h1>Restricted area</h1>
    <p class="sub">This page is access-controlled. Enter the password to continue.</p>
    <form id="f" autocomplete="off">
      <label for="pw">Password</label>
      <input id="pw" name="pw" type="password" autocomplete="current-password" autofocus />
      <button id="go" type="submit">Unlock</button>
      <div class="err" id="err" role="alert" aria-live="polite"></div>
    </form>
    <p class="foot">QC portal — practice prototype. Data stays in your browser.</p>
  </main>

<script>
  const SALT = "${salt}";
  const IV = "${iv}";
  const CT = "${ciphertext}";
  const ITER = ${iterations};

  const b64ToBytes = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

  async function decrypt(password){
    const enc = new TextEncoder();
    const km = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
      { name:'PBKDF2', salt:b64ToBytes(SALT), iterations:ITER, hash:'SHA-256' },
      km, { name:'AES-GCM', length:256 }, false, ['decrypt']
    );
    const buf = await crypto.subtle.decrypt({ name:'AES-GCM', iv:b64ToBytes(IV) }, key, b64ToBytes(CT));
    return new TextDecoder().decode(buf);
  }

  function reveal(htmlText){
    const frame = document.createElement('iframe');
    frame.title = 'Mammography QC portal';
    frame.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;border:0;margin:0';
    frame.srcdoc = htmlText;
    document.body.replaceChildren(frame);
    document.title = 'Mammography DR QC';
  }

  const form = document.getElementById('f');
  const err = document.getElementById('err');
  const go = document.getElementById('go');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.textContent = '';
    go.disabled = true;
    go.textContent = 'Unlocking…';
    try {
      const html = await decrypt(document.getElementById('pw').value);
      // Sanity check the decrypt produced our document, not garbage from a
      // (vanishingly unlikely) tag collision.
      if (html.indexOf('<!DOCTYPE') === -1 && html.indexOf('<!doctype') === -1) {
        throw new Error('bad');
      }
      reveal(html);
    } catch (_) {
      err.textContent = 'Incorrect password. Please try again.';
      go.disabled = false;
      go.textContent = 'Unlock';
      document.getElementById('pw').select();
    }
  });
</script>
</body>
</html>
`;
}
