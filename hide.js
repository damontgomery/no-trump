// Vox.com

if (document.title.toLowerCase().includes('trump')) {
  // Hero image.
  document.querySelectorAll('.e-image--hero img').forEach((el, i) => {
    el.classList.add('hide-trump');
  });
}

// General text with `Trump`.
const blacklistedWords = [
  'Trump',
];

function getTextNodes() {
  let walker = document.createTreeWalker(
      document.body, 
      NodeFilter.SHOW_TEXT, 
      null, 
      false
  );

  let node;
  let textNodes = [];

  while(node = walker.nextNode()) {
      textNodes.push(node);
  }

  return textNodes;
}

let textNodes = getTextNodes();

textNodes.forEach((el) => {
  blacklistedWords.forEach((word) => {
    const replacement = '*'.repeat(word.length);

    el.nodeValue = el.nodeValue.replaceAll(word, replacement);
  });
});
