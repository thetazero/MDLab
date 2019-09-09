window.customElements.define('carve-editor', class extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<style>
    .div{
      outline:none;
      padding: 20px 30px;
    }
    </style>`
    let div = document.createElement("div")
    div.classList = "div"
    this._div = div;
    shadowRoot.appendChild(div)
    div.contentEditable = true
    div.innerText = window.localStorage.getItem('pad')
    document.querySelector("#preview").innerHTML = markdown(this._div.innerText)
    this.addEventListener('click', () => {
      this._div.focus()
    })
    this.addEventListener('keyup', (e) => {
      // console.log(markdown(this._div.innerText))
      document.querySelector("#preview").innerHTML = markdown(this._div.innerText)
    })
    setInterval(() => {
      window.localStorage.setItem('pad', div.innerText)
    }, 1000)
  }
  focus() {
    console.log(this._div)
    this._div.focus()
  }
})