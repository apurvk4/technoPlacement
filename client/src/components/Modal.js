import { Component, cloneElement } from "react";
import dom from "react-dom";
const modalRoot = document.getElementById("modal-root");

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }
  componentDidMount() {
    if (this.props.darken) {
      this.el.classList.add("overlay");
    } else {
      this.el.classList.add("overlay-noBg");
    }
    modalRoot.appendChild(this.el);
    if (this.props.outsideclick === "allow") {
      this.el.addEventListener("click", (e) => {
        if (e.currentTarget === e.target) {
          this.props.close();
        }
        e.stopPropagation();
      });
    }
    document.getElementById("root").classList.add("disable-scroll");
  }
  componentDidUpdate() {
    if (this.props.darken) {
      this.el.classList.add("overlay");
    } else {
      this.el.classList.add("overlay-noBg");
    }
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
    this.el.removeEventListener("click", (e) => {
      if (e.currentTarget === e.target) {
        this.props.close();
      }
    });
    document.getElementById("root").classList.remove("disable-scroll");
  }
  render() {
    return dom.createPortal(
      <div className="container0">
        <div className="container" style={{ padding: "0px" }}>
          <div className="modal-top">
            <b>{this.props.header}</b>
            <button className="modal-close" onClick={this.props.close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <div style={{ paddingLeft: "12px", paddingRight: "12px" }}>
            {cloneElement(this.props.children, { ...this.props })}
          </div>
        </div>
      </div>,
      this.el
    );
  }
}
