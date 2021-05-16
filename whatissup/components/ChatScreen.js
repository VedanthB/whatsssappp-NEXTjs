import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import firebase from "firebase";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';

function ChatScreen() {
    const [user] = useAuthState(auth)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
     db
      .collection('chats')
      .doc(router.query.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      )

    const showMessages= () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message 
                 key={message.id}
                 user={message.data().user}
                 message={{
                     ...message.data(),
                     timestamp: message.data().timestamp?.toDate().getTime(),
                 }}
                 />
            ))
         }
    }


    return (
        <Container>
          <Header>
              <Avatar />

              <HeaderInformation>
                  <h3> rec email</h3>
                  <p> last seen </p>
              </HeaderInformation>

              <HeaderIcons>
                  <IconButton>
                      <AttachFileIcon />
                  </IconButton>
                  <IconButton>
                      <MoreVertIcon />
                  </IconButton>
              </HeaderIcons>
          </Header>

          <MessageContainer>
              {/* first, we'll show the data from the server side and then when the user starts chatting it'll  establish an real-time connection*/}
              {/* show messages */}  

              <EndOfMessage />
          </MessageContainer>
        </Container>
        
    )
}

export default ChatScreen

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  position: sticky;
  background-color: #2a2f32;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 0.5px solid #262d31;
`;

const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 2px;
    color: white;
  }
  > p {
    font-size: 14px;
    color: lightGray;
  }
`;

const HeaderIcons = styled.div `

`
const MessageContainer = styled.div`
  padding: 30px;
  background: url(https://i.ibb.co/tY9LVfJ/whatsapp-background.png) no-repeat
    center;
  background-size: cover;
  min-height: 90vh;
`;

const InputContainer = styled.form`
  display: flex;
  align-items: center;
  padding: 10px;
  position: sticky;
  bottom: 0;
  background-color: #1e2428;
  z-index: 100;
`;

const Input = styled.input`
  flex: 1;
  outline: 0;
  border: none;
  border-radius: 10px;
  background-color: #33383b;
  padding: 20px;
  margin-left: 15px;
  margin-right: 15px;
  color: white;
`;

const EndOfMessage = styled.div`
  margin-bottom: 50px;
`;
const BackIcon = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

