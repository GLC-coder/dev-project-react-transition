import React, { Component } from "react";
import { Transition, CSSTransition } from "react-transition-group";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";

const timeoutTimg = { enter: 400, exit: 1000 };
const defaultStyle = {
  backgroundColor: "red",
  width: 100,
  height: 100,
  margin: "auto",
  transition: `opacity ${timeoutTimg} ease-out`,
};
const transitionStyle = {
  entering: { opacity: 0.8 },
  entered: { opacity: 1 },
  exiting: { opacity: 0.5 },
  exited: { opacity: 0 },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      showBlock: false,
    };
  }
  showBlockHandler() {
    console.log("first");
    this.setState((preState) => ({ showBlock: !preState.showBlock }));
  }

  showModalHandler() {
    this.setState({ modalIsOpen: true });
  }

  closeModalHandler() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <CSSTransition
          in={this.state.modalIsOpen}
          timeout={timeoutTimg}
          mountOnEnter
          unmountOnExit
          // classNames="fade-slide"
          classNames={{
            enter:'',
            enterActive: 'ModalOpen',
            exit: '',
            exitActive: 'ModalClosed',
          }}
        >
          <Modal
            closed={this.closeModalHandler.bind(this)}
            show={this.state.modalIsOpen}
          />
        </CSSTransition>

        <Backdrop show={this.state.modalIsOpen} />
        <button className="Button" onClick={this.showBlockHandler.bind(this)}>
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={timeoutTimg}
          mountOnEnter
          unmountOnExit
        >
          {(state) => (
            <div
              style={{
                ...defaultStyle,
                ...transitionStyle[state],
              }}
            >
              I am a block!
            </div>
          )}
        </Transition>
        <button className="Button" onClick={this.showModalHandler.bind(this)}>
          Open Modal
        </button>

        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;
