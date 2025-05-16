const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <style>
      #editor { height: 90%; }
      body, html { height: 100%; margin: 0; padding: 0; }
      .ql-editor { font-size: 18px; } /* Set default font size */
    </style>
  </head>
  <body>
    <div id="editor"></div>
    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script>
      var quill = new Quill('#editor', { theme: 'snow' });
     
        // Expose this function globally
      function sendContentToReactNative() {
        const html = quill.root.innerHTML;
        window.ReactNativeWebView.postMessage(html);
      }

      window.getContent = sendContentToReactNative;
    </script>
  </body>
</html>
`;

export default htmlContent