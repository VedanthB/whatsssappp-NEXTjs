
import React from "react";
import { auth, db } from "../../firebase";
import styled from "styled-components";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import Sidebar from '../../components/Sidebar'
import ChatScreen from "../../components/ChatScreen"
import getRecipientEmail from '../../utils/getRecipientEmail'

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)} </title>
      </Head>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;
 
export async function getServerSideProps(context) {

    // ref to the chat id
    const ref = db.collection('chats').doc(context.query.id)

    //prep the messages on the server side

    const messagesRes = await ref
     .collection('messages')
     .orderBy('timestamp', 'desc')
     .get();

     const messages = messagesRes.docs.map((doc)=> ({
         id: doc.id, 
         ...doc.data(),
     })).map(messages => ({
         ...messages,
         timestamp: messages.timestamp.toDate().getTime(),
     })) 

     // prep the chats on the server

     const chatRes = await ref.get();
     const chat = {
         id: chatRes.id,
         ...chatRes.data() 
        }

    console.log(messages, chat)

     return {
         props: {
             messages: JSON.stringify(messages),
             chat: chat  // dont have to stringify here as its a very simple object
      }
    }

    

}


const Container = styled.div`
  display: flex;
  box-shadow: 1px 1px 4px -1px rgba(0, 0, 0, 0.75);
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

const SidebarContainer = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`