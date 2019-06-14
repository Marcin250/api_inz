import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  flex:1;
  display:flex;
  height:50px;
  background:white;
  align-items: center;
  padding:0 15px;
  justify-content: flex-end;
  border-bottom:1px solid #F3F4F8;
  border-left:1px solid #F3F4F8;
`

const User = styled.section`
  display:flex;
`

const ImageWrapper = styled.figure`
  overflow:hidden;
  width:30px;
  height:30px;
  border-radius: 50%;
`

const UserImage = styled.img`
  display:inline-block;
  height:30px;
`;

const UserInfo = styled.div`
  display:flex;
  flex-flow:column nowrap;
`;

const Text = styled.span`
  display:block;
  margin-left:6px;
  text-transform:lowercase;
  letter-spacing:1px;
  line-height:1;
  color:#444;
  &:last-child {
    font-size:.9em;
    color:#d8d8d8;
  }
`;

const AdminHeader = (props) => {
  const { user } = props.user;
  return (
    <Wrapper>
    { user.length
      ? <User>
          <ImageWrapper>
            <UserImage src={user[0].image} />
          </ImageWrapper>
          <UserInfo>
            <Text>{user[0].name}</Text>
            <Text>{user[0].email}</Text>
          </UserInfo>
        </User>
      : 'checking for user..'
    }
    </Wrapper>
  )
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(AdminHeader);
