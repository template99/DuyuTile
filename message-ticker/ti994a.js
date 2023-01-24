var fontLoader = new FontFace('Font name', 'url(http://localhost/whatever-font.ttf)');

fontLoader.load().then(function(font) {

  // Ready to use the font in a canvas context
  console.log('font ready');

  // Add font on the html page
  document.fonts.add(font);

  ctx.font = '48px Font name';
  ctx.strokeText('Hello world', 100, 100);

});