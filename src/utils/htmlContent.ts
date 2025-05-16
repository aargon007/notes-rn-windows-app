const htmlContent = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
    <style>
      #editor { height: 88%; }
      body, html { height: 100%; margin: 0; padding: 0; }
      .ql-editor { font-size: 18px; }
        /* Scrollbar customization */
      ::-webkit-scrollbar {
        width: 6px;
      }
      ::-webkit-scrollbar-track {
        background: #f0f0f0;
      }
      ::-webkit-scrollbar-thumb {
        background: #bbb;
        border-radius: 3px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: #999;
      }

      /* Firefox scrollbar support */
      body {
        scrollbar-width: thin;
        scrollbar-color: #bbb #f0f0f0;
      }
    </style>
  </head>

  <body>
    <div id="toolbar">
      <!-- Quill Toolbar Options -->
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
        <button class="ql-formula"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>

    <div id="editor"></div>

    <script src="https://cdn.quilljs.com/1.3.6/quill.js"></script>
    <script>
      var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar'
        }
      });

      function sendContentToReactNative() {
        const html = quill.root.innerHTML;
        window.ReactNativeWebView.postMessage(html);
      }

      window.getContent = sendContentToReactNative;
    </script>
  </body>
</html>
`;

export default htmlContent;
