// General text with `Trump`.
const disallowedWords = [
  'Donald Trump',
  'Trump',
  'Vladimir Putin',
  'Putin',
  'Musk',
  'Elon Musk',
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
  disallowedWords.forEach((word) => {
    const replacement = '█'.repeat(word.length);

    el.nodeValue = el.nodeValue.replaceAll(word, replacement);
  });
});

// Vox.com
if (disallowedWords.some((word) => document.title.toLowerCase().includes(word.toLowerCase()))) {
  // Hero image.
  document.querySelectorAll('.e-image--hero img').forEach((el, i) => {
    el.classList.add('nt-redacted');
  });
}

const stylesheet = new CSSStyleSheet();

const singleDisallowedWord = disallowedWords.filter((word) => word.split(' ').length === 1);

singleDisallowedWord.forEach((word) => {
  stylesheet.insertRule(`
    a[href*="${word.toLowerCase()}"] img {
      filter: brightness(0);
    }
  `);
  stylesheet.insertRule(`
    img[src*="${word.toLowerCase()}"] {
      filter: brightness(0);
    }
  `)
  stylesheet.insertRule(`
    img[alt*="${word.toLowerCase()}"] {
      filter: brightness(0);
    }
  `);
});

document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];
