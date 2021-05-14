import { Avatar } from '@material-ui/core';
import styled from 'styled-components'

function Chat({id, users}) {
    return (
        <Container>
            <UserAvatar />
            <p> email </p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px; 
  word-break: break-word;
  background-color: #131c21;
  border-bottom: 0.5px solid #262d31;
  color: white;
  :hover {
    background-color: #2d3134;
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;