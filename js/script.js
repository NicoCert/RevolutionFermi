// Puntini gialli sulle "i": basta aggiungere class="dot" a un titolo nell'HTML
document.querySelectorAll('.dot').forEach(el => {
  el.setAttribute('aria-label', el.textContent.trim());
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!node.nodeValue.includes('i')) return;
    const frag = document.createDocumentFragment();
    node.nodeValue.split('i').forEach((part, k, all) => {
      frag.append(part);
      if (k < all.length - 1) {
        const s = document.createElement('span');
        s.className = 'yi';
        s.textContent = '\u0131'; // i senza puntino
        frag.append(s);
      }
    });
    node.replaceWith(frag);
  });
});

// Apre la proposta indicata nel link (es. proposte.html#p3)
const items = [...document.querySelectorAll('.acc details')];
function openFromHash() {
  const d = document.getElementById(location.hash.slice(1));
  if (d && d.tagName === 'DETAILS') { d.open = true; d.scrollIntoView(); }
}
openFromHash();
window.addEventListener('hashchange', openFromHash);

// Bottone "Apri tutte" / "Chiudi tutte"
const btn = document.getElementById('toggle-all');
if (btn) btn.addEventListener('click', () => {
  const open = items.some(d => !d.open);
  items.forEach(d => d.open = open);
  btn.textContent = open ? 'Chiudi tutte' : 'Apri tutte';
});
