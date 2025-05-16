
export const viewNote = (content: string) => {
    return `
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8">
            <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet">
            <style>
                html, body {
                height: 100%;
                margin: 0;
                padding: 0;
                background: #fff;
                color: #111;
                font-family: sans-serif;
                overflow: hidden;
                }

                .ql-container {
                height: 100%;
                box-sizing: border-box;
                font-size: 18px;
                }

                 .ql-editor {
                    padding: 20px;
                    overflow-y: scroll;
                    max-height: 100vh;
                     -ms-overflow-style: none;
                }
            </style>
            </head>
            <body>
            <div class="ql-container ql-snow">
                <div class="ql-editor">
                ${content}
                </div>
            </div>

            <script>
                setTimeout(() => {
                const height = document.body.scrollHeight;
                window.ReactNativeWebView.postMessage(height.toString());
                }, 100);
            </script>
            </body>
        </html>
    `

}