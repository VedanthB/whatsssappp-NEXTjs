const getRecipientEmail = (users, userLoggedIn) => // userLoggedIn is an object , is also async (useAuthState)
  users?.filter((userToFilter) => userToFilter !== userLoggedIn?.email)[0];  // we are filtering through array so we get back an array 

export default getRecipientEmail;
