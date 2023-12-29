import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
  getAccountPhrase,
  permanentlyDeleteAccount,
} from "@rly-network/mobile-sdk";
import { Alert } from "react-native";
import {
  User as FirebaseAuthUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
// import { auth } from "../firebase";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { ethers } from "ethers";
import { Audio } from "expo-av";
import { auth, db } from "../firebase";
import {
  DocumentData,
  QueryDocumentSnapshot,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";

// import 'react-native-get-random-values';
// import { hmac } from '@noble/hashes/hmac';
// import { sha256 } from '@noble/hashes/sha256';
// import { sha512 } from '@noble/hashes/sha512';
// ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));
// ed.etc.sha512Async = (...m) => Promise.resolve(ed.etc.sha512Sync(...m));

// secp.etc.hmacSha256Sync = (k, ...m) =>
//   hmac(sha256, k, secp.etc.concatBytes(...m));
// secp.etc.hmacSha256Async = (k, ...m) =>
//   Promise.resolve(secp.etc.hmacSha256Sync(k, ...m));


type Session = string | undefined;

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

type AuthContextValue = {
  session: Session;
  createAnEOA: (email: string, password: string) => Promise<boolean>;
  permanentlyDeleteAccount: () => Promise<void>;
  signin: (
    email: string,
    password: string
  ) => Promise<DocumentData | undefined>;
  playSound(external_url: string, item: any): Promise<void>;
  playerOpen: boolean;
  currentlyPlayed: {
    image: string;
    title: string;
    url: string;
    artist: string;
  };
  stopSound(external_url: string): Promise<void>;
  pauseSound(): Promise<void>;
  isPlaying: boolean;
  userData: QueryDocumentSnapshot<DocumentData, DocumentData> | undefined;
  action: string;
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async (email: string, password: string) => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
    return false; // return a boolean value
  },
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  signin: async (
    email: string,
    password: string
  ): Promise<DocumentData | undefined> => {
    // Default implementation, you may want to handle this differently
    console.warn("Signin function not implemented");
    return undefined; // return undefined as per the expected return type
  },
  playSound: async (external_url: string, item: any): Promise<void> => {
    // Implementation goes here
  },
  playerOpen: false,
  currentlyPlayed: {
    image: "",
    title: "",
    url: "",
    artist: "",
  },
  stopSound: async (external_url: string): Promise<void> => {
    // Implementation goes here
  },
  pauseSound(): Promise<void> {
    return Promise.resolve();
  },
  isPlaying: false,
  userData: undefined,
  action: "",
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    // const inAuthGroup = segments[0] === "(auth)";
    if (!session) {
      router.replace("/");
    } else if (session) {
      router.replace("/(tabs)");
    }
  }, [session]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  const [playerOpen, setPlayerOpened] = useState(false);
  const [currentlyPlayed, setCurrentLyPlayed] = useState({
    image: "",
    title: "",
    url: "",
    artist: "",
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [userData, setUser] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();
  console.log("user", userData);
  const [action, setAction] = useState("");
  useProtectedRoute(userData?.id);

  const createAnEOA = async (email: string, password: string) => {
    let userCredential, newAccount;

    try {
      setAction("Signing User....");
      // Create a new user with email and password
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error("Error creating user: ", error);
      return false;
    }

    const user = userCredential.user;

    if (user) {
      try {
        setAction("Creating Wallet....");
        newAccount = await createAccount({
          storageOptions: {
            saveToCloud: false,
            rejectOnCloudSaveFailure: true,
          },
          overwrite: true,
        });
      } catch (error) {
        console.error("Error creating account: ", error);
        return false;
      }

      if (newAccount) {
        try {
          setAction("Storing your info.....");
          // Store the user's email and wallet address in Firestore
          const docSnap = await setDoc(doc(db, "users", user.uid), {
            email: email,
            walletAddress: newAccount,
          });
          return true;
        } catch (error) {
          console.error("Error storing user data in Firestore: ", error);
          return false;
        }
      }
    }

    console.log("User registered successfully");
    setAction("Account created Sucessfully 😁");
    return true;
  };

  // Add a state for the current sound object
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);

  async function playSound(external_url: string, item: any) {
    // Stop the currently playing sound if there is one
    if (soundObject) {
      await soundObject.stopAsync();
    }

    setPlayerOpened(true);
    setCurrentLyPlayed({
      image: item.image,
      title: item.name,
      url: item.external_url,
      artist: item.artist,
    });
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
      staysActiveInBackground: true, // Add this line
    });
    try {
      const { sound: playbackObject } = await Audio.Sound.createAsync(
        {
          uri: external_url,
        },
        { shouldPlay: true }
      );

      setSoundObject(playbackObject); // Save the sound object
      await playbackObject.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.log("Error loading audio", error);
    }
  }

  async function pauseSound() {
    if (soundObject) {
      await soundObject.pauseAsync();
      setIsPlaying(false);
    }
  }

  async function stopSound() {
    if (soundObject) {
      await soundObject.stopAsync();
      setIsPlaying(false);
      setSoundObject(null); // Clear the sound object
    }
  }



  const signin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return user;
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    permanentlyDeleteAccount,
    playSound,
    currentlyPlayed,
    playerOpen,
    stopSound,
    isPlaying,
    pauseSound,
    signin,
    userData,
    action,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
