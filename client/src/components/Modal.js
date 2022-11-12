import { Component } from "react";
import dom from "react-dom";
const modalRoot = document.getElementById("modal-root");
// function disableScroll() {
//   // Get the current page scroll position
//   if(typeof window != "undefined"){}
//   let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//   let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

//       // if any scroll is attempted, set this to the previous value
//       window.onscroll = function() {
//         window.scrollTo(scrollLeft, scrollTop);
//     };
// }

// function enableScroll() {
//   window.onscroll = function() {};
// }
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
    // enableScroll();
  }
  render() {
    return dom.createPortal(
      <div className="container0">
        <div className="container">
          <div>{this.props.children}</div>
        </div>
      </div>,
      this.el
    );
  }
}
