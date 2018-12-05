const buildMorphTree = require('@morphx/morph-tree-builder');

function handleUpdate(window, pane) {
  let editor = window.activeTextEditor;
  if (!editor) {
    return;
  }

  let doc = editor.document;
  let content = doc.getText();
  const morphDocTree = buildMorphTree(content);

  pane.webview.postMessage({
    morphDocTree,
    morphDocHtml: `
      <html>
        <style>
          .text {
            color: red;
          }
        </style>
        <body>
          <div class="text">TODO: Html renderer</div>
        </body>
      </html>
    `,
  });
}

module.exports = handleUpdate;