import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:${props => props.showModal ? 'flex' : 'none'}
  position: fixed;
  z-index:999;
  left:0;
  top:0;
  width:100%;
  height:100%;
  background:rgba(0,0,0,.6);
  justify-content:center;
  align-items:center;
`

const ModalSection = styled.section`
  background:#fff;
  margin:10px;
  border-radius:6px;
  overflow:hidden;
`

const Header = styled.header`
  display:flex;
  justify-content:space-between;
  padding:30px 30px 15px 30px;
  font-family:'AvenirLTD';
  border-bottom:1px solid #ededed;
`

const Title = styled.h4`
  font-size:1.1em;
`

const Text = styled.p`
  line-height:1.5;
  padding:15px 30px 25px 30px;
`

const Footer = styled.footer`
  margin-top:25px;
  padding: 15px;
  display:flex;
  background:#ededed;
  justify-content:flex-end;
`

const Button = styled.button`
  border-radius:6px;
  border:none;
  cursor:pointer;
  padding:10px 20px;
  outline:none;
  margin: 0 6px;
  color:${props => props.warning ? '#ffffff' : 'inherit'}
  background:${props => props.warning ? '#ee324e' : 'default'}
`

const ButtonExit = styled.button`
  border:none;
  background:none;
  cursor:pointer;
`

const Spinner = styled.div`
    text-align: center;
  > div {
    margin:0 1px;
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 100%;
    display: inline-block;
    -webkit-animation: spin 1.4s infinite ease-in-out both;
    animation: spin 1.4s infinite ease-in-out both;
    &:nth-child(1) {
      -webkit-animation-delay: -0.32s;
      animation-delay: -0.32s;
    }

    &:nth-child(2) {
      -webkit-animation-delay: -0.16s;
      animation-delay: -0.16s;
    }
  }

  @keyframes spin {
    0%, 80%, 100% {
      -webkit-transform: scale(0);
      transform: scale(0);
    } 40% {
      -webkit-transform: scale(1.0);
      transform: scale(1.0);
    }
  }
`

const Modal = props => {
  const { accept, denied, status } = props;

    return (
        <Wrapper showModal={props.showModal}>
          <ModalSection>
            <Header>
              <Title>Usunięcie komentarza</Title>
              <ButtonExit onClick={denied}>❌</ButtonExit>
            </Header>
            <Text>Czy jesteś pewien, że chcesz usunąć ten komentarz? <br /> Nie będziesz mógł cofnąć tej operacji.</Text>
            <Footer>
              <div>
                <Button onClick={denied}>Cofnij</Button>
                {
                  !status
                  ? <Button
                      warning
                      onClick={accept}
                    >Usuń</Button>
                  : <Button
                      warning>
                      <Spinner>
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                      </Spinner>
                    </Button>
                }
              </div>
            </Footer>
          </ModalSection>
        </Wrapper>
      )
}

export default Modal;
