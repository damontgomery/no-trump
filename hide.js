const disallowedPhrases = [
  'Donald Trump',
  'Trump',
  'Vladimir Putin',
  'Putin',
  'Elon Musk',
  'Musk',
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

textNodes.forEach((textNode) => {
  disallowedPhrases.forEach((word) => {
    const replacement = '█'.repeat(word.length);

    textNode.nodeValue = textNode.nodeValue.replaceAll(word, replacement);
  });
});

const stylesheet = new CSSStyleSheet();

const disallowedWords = disallowedPhrases.filter((word) => word.split(' ').length === 1);

disallowedWords.forEach((word) => {
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
    img[alt*="${word}"] {
      filter: brightness(0);
    }
  `);
  stylesheet.insertRule(`
    img[alt*="${word.toLowerCase()}"] {
      filter: brightness(0);
    }
  `);
});

document.adoptedStyleSheets = [...document.adoptedStyleSheets, stylesheet];

// Vox.com
if (disallowedPhrases.some((word) => document.title.toLowerCase().includes(word.toLowerCase()))) {
  // Hero image.
  document.querySelectorAll('.e-image--hero img').forEach((element) => {
    element.classList.add('nt-redacted');
  });
}
