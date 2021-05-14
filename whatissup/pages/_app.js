import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Login from './login'
import Loading from '../components/Loading'


 function App({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth) 

  // this is to get the user info after logged in so we can use it later in the app
  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          name: user.displayName,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);


  if (loading) return <Loading />
  if (!user) return <Login />
  return <Component {...pageProps} />
  
}

export default App