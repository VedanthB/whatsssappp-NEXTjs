import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'


 function App({ Component, pageProps }) {
  const [user] = useAuthState(auth) 

  if (!user) return <Login />
  return <Component {...pageProps} />
  
}

export default App