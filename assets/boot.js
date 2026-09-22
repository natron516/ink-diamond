(async function () {
  const n = 6;
  const chunks = [];
  for (let i = 0; i < n; i++) {
    const r = await fetch(new URL('./b64-part-' + i + '.txt', import.meta.url));
    if (!r.ok) throw new Error('missing b64-part-' + i + '.txt');
    chunks.push(await r.text());
  }
  const b64 = chunks.join('').replace(/\s+/g, '');
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  const code = new TextDecoder().decode(bytes);
  if (code.includes('[...'+'snip')) throw new Error('truncated bundle');
  const s = document.createElement('script');
  s.textContent = code;
  document.head.appendChild(s);
})().catch(function (e) {
  var el = document.getElementById('app') || document.body;
  el.textContent = 'Ink Diamond failed to load: ' + (e && e.message ? e.message : e);
});
