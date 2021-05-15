import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import Chat from './Chat';


function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatsRef = db.collection("chats").where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatsRef);

   const createChat = () => {
      const input = prompt('please enter an email address for the user you wish to chat with')

      if (!input) return null;


    if (
        EmailValidator.validate(input) &&
        !chatAlreadyExist(input) &&
        input !== user.email
      ) {
          // we add the chat into the db 'chats' collection if it doesnt already exist and is valid
        db.collection("chats").add({
          users: [user.email, input],
        });
      }
    };
  
    const chatAlreadyExist = (recipientEmail) =>
    // !! convert to boolean 
      !!chatsSnapshot?.docs.find(
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0
      );

    return (
        <Container>
            <Header>
                <UserAvatar />

                <IconContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                    <IconButton>
                        <ExitToAppIcon onClick={() => auth.signOut()} />
                    </IconButton>
                </IconContainer>
            </Header>

            <Search>
                <SearchIcon />
                <SearchInput placeholder='search chats....' />
            </Search>

            <SidebarButton onClick={createChat} >
                Start a new chat
            </SidebarButton>

            {/* List of Chats */}
            {chatsSnapshot?.docs.map((chat) => (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
              ))}
        </Container>
    )
}

export default Sidebar


const Container = styled.div `
  flex: 0.45;
  border-right: 0.5px solid #262d31;
  height: 100vh;
  min-width: 350px;
  max-width: 450px;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

`

const Header = styled.div `
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  background-color: #2a2f32;

 
`

const UserAvatar = styled(Avatar)  `
   cursor: pointer;

   :hover {
       opacity: 0.8;
   }
`

const IconContainer = styled.div ` 
     .MuiSvgIcon-root {
     color: whitesmoke;
   }
`

const Search = styled.div `
   display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  background-color: #32373a;
  padding: 10px;
  width: 340px;
`

const SearchInput = styled.input `
  outline-width: 0;
  border: none;
  flex: 1;
  margin-left: 10px;
  background-color: transparent;
  color: white;
` 

const SidebarButton = styled(Button)`
   width: 100%;
  &&& {
    border-top: 0.5px solid #262d31;
    border-bottom: 0.5px solid #262d31;
    background-color: #131c21;
    color: white;
    border-radius: 0px !important;
  }
  :hover {
    opacity: 0.8;
  }
`