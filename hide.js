// Vox.com

if (document.title.toLowerCase().includes('trump')) {
  // Hero image.
  document.querySelectorAll('.e-image--hero img').forEach(function(el, i){
    el.classList.add('hide-trump');
  });
}
