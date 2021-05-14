import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import Loading from '../components/Loading'


 function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth) 

  if (loading) return <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
  
}

export default App