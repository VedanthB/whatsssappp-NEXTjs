import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components'
import { auth, db } from '../firebase';
import getRecipientEmail from '../utils/getRecipientEmail';
import { useRouter } from 'next/router';

function Chat({id, users}) { 
  console.log(id, users)

  const [user] = useAuthState(auth)
  const recipientEmail = getRecipientEmail(users, user)

  //cross refrencing the users collection on the db with the email of the person who is the recipient 
  const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(users, user)));

 
  // find the first element
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const router = useRouter();

  const enterChat = () => {
    router.push(`/chat/${id}`)
  }

    return (
        <Container onClick={enterChat} >
            {recipient ? (
              // if the recipient is available then 
               <UserAvatar src={recipient?.photoURL} /> 
              ) : (
                // if its not avavilable then just get the email
               <UserAvatar>{recipientEmail[0]}</UserAvatar>
             )}
            <p>{ recipientEmail } </p>
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