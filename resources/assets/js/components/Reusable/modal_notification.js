import React, {Component} from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size:.95em;
  position:fixed;
  z-index:9999;
  bottom:35px;
  right:35px;
  margin:10px;
  background:#fff;
  padding:12px;
  border:1px solid #ededed;
  border-left:${props => props.type === 'error' ? '5px solid #ee324e' : props.type === 'info' ?  '5px solid #FEBE10' : '5px solid #4CFF4C' };
  box-shadow: 2px 2px 3px rgba(119,119,119,0.35);
  animation: 1s ease-out 0s 1 slideInFromBottom;
  @keyframes slideInFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
`

const InnerWrapper = styled.section`
  padding:4px 6px;
`

const Type = styled.p`
  color:${props => props.type === 'error' ? '#ee324e' : props.type === 'info' ?  '#FEBE10' : '#4CFF4C' };
  font-family:'AvenirLTB';
  margin-bottom:6px;
  margin-top:2px;
  letter-spacing:.7px;
  font-size:.85em;
  text-transform:uppercase;
`

class Modal extends Component {
  constructor(props) {
    super(props);

    this.modalRef = this.modalRef.bind(this);
  }

  componentDidUpdate() {
    const { options } = this.props;

    if(options.showModal) {
      setTimeout(() => {
        options.hideModalFunction();
      }, options.timeout)
    }
  }

  modalRef(node) {
    this.modal = node;
  }

  render() {
    const { options } = this.props;

    return (
        options.showModal ? (
          <Wrapper
            ref={this.modalRef}
            type={options.type}>
            <InnerWrapper>
              <Type type={options.type}>{ options.type === 'error' ? 'Błąd' : options.type === 'info' ? 'Inormacja' : options.type === 'success' ? 'Sukces' : 'Musisz przesłać jeden z typów: error, info lub success.'}</Type>
              <p>{ options.text }</p>
            </InnerWrapper>
          </Wrapper>
        ) : ''
    )
  }
}

export default Modal;
