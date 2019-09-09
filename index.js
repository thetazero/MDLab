const main = document.getElementById("main")
setTimeout(() => {
  view(3)
}, 1)


function view(view) {
  if (view == 1) {
    main.classList = "main editor"
    focusEditor()
  } else if (view == 2) {
    main.classList = "main preview"
  } else if (view == 3) {
    main.classList = "main both"
    focusEditor()
  }
}

function focusEditor() {
  document.querySelector('carve-editor').focus()
}

function printLab() {
  view(2)
  window.print()
}