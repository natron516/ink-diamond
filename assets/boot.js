(async function(){
  const parts = ['./js-part-0.txt', './js-part-1.txt', './js-part-2.txt', './js-part-3.txt'];
  const texts = await Promise.all(parts.map(p => fetch(new URL(p, import.meta.url)).then(r => {
    if (!r.ok) throw new Error('missing '+p);
    return r.text();
  })));
  const code = texts.join('');
  if (code.includes('[...'+'snip')) throw new Error('truncated bundle');
  const s = document.createElement('script');
  s.textContent = code;
  document.head.appendChild(s);
})().catch(e => {
  const el = document.getElementById('app') || document.body;
  el.textContent = 'Ink Diamond failed to load: ' + (e && e.message ? e.message : e);
});
