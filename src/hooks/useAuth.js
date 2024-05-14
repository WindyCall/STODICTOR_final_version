import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getAuth,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updatePassword
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import React, { useState, useEffect, useContext, createContext } from "react";
import { config as firebaseConfig } from "../config/firebaseConfig.js";

// Code edited from https://usehooks.com/useAuth/ and
// https://firebase.google.com/docs/auth/web/start#add-initialize-sdk
// Not my original work.

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const firebaseAuth = getAuth(app);

// Hacky export, a cleaner way might be to export it from firebaseConfig
export const db = getFirestore(app);

export const storage = getStorage(app);

const googleAuthProvider = new GoogleAuthProvider();

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const [user, setUser] = useState(null);

  // Wrap any Firebase methods we want to use making sure ...
  // ... to save the user to state.
  const signin = (email, password) => {
    return firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signup = (email, password) => {
    return firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        return response.user;
      });
  };

  const signout = () => {
    return firebaseAuth.signOut().then(() => {
      setUser(false);
    });
  };

  const sendUserPasswordResetEmail = (email, setErrorMessage) => {
    /*return firebaseAuth.sendPasswordResetEmail(email).then(() => {
      return true;
    });*/
    sendPasswordResetEmail(firebaseAuth, email)
      .then((userCredential) => {
        alert(
          "An email has been sent to your address\n\nyou can then reset password"
        );
        setErrorMessage("");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorMessage.includes("user-not-found"))
          setErrorMessage("ERROR: Email does not exist");
        if (errorMessage.includes("invalid-email"))
          setErrorMessage("ERROR: Invalid email");
      });
  };

  const confirmPasswordReset = (code, password) => {
    return firebaseAuth.confirmPasswordReset(code, password).then(() => {
      return true;
    });
  };

  const signInWithGoogle = () => {
    return signInWithPopup(firebaseAuth, googleAuthProvider);
  };

  const createWithEmailAndPassword = (email, password, setErrorMessage) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Create succussfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        if (errorMessage.includes("internal-error"))
          setErrorMessage("ERROR: Empty Password");
        if (errorMessage.includes("email-already-in-use"))
          setErrorMessage("ERROR: Email has existed");
        if (errorMessage.includes("weak-password"))
          setErrorMessage("ERROR: Password less then 6 digits");
      });
  };

  const signinWithEmailAndPassword = (email, password, setErrorMessage) => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("Signed in successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        /*
        wrong-password

        user-not-found
        */
        if (errorMessage.includes("wrong-password"))
          setErrorMessage("ERROR: Wrong Password");
        if (errorMessage.includes("user-not-found"))
          setErrorMessage("ERROR: Email does not exist");
      });
  };

  const signOutWithEmailAndPassword = () => {
    return signOut(firebaseAuth);
  };

  const updateUserPassword = (newPassword) => {
    console.log(newPassword);
    const user = firebaseAuth.currentUser;
    updatePassword(user, newPassword);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Return the user object and auth methods
  return {
    user,
    signin,
    signup,
    signout,
    sendUserPasswordResetEmail,
    confirmPasswordReset,
    signInWithGoogle,
    createWithEmailAndPassword,
    signinWithEmailAndPassword,
    signOutWithEmailAndPassword,
    updateUserPassword
  };
}
