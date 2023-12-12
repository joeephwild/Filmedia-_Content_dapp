import { router, useNavigation, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  createAccount,
  getAccount,
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
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  _createWallet,
  _getWalletAddress,
  signInWithLens,
} from "../constants/_helperFunctions";
import { ethers } from "ethers";

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
  createAnEOA: (
    name: string,
    password: string,
    lensBool: boolean,
    privateKey: string
  ) => Promise<void>;
  permanentlyDeleteAccount: () => Promise<void>;
  signin: (email: string, password: string) => Promise<void>;
  // Add other values you want to provide through the context here
};

const AuthContext = React.createContext<AuthContextValue>({
  session: undefined,
  createAnEOA: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("createAnEOA function not implemented");
  },
  permanentlyDeleteAccount: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("permanentlyDeleteAccount function not implemented");
  },
  signin: async () => {
    // Default implementation, you may want to handle this differently
    console.warn("Signin function not implemented");
  },
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(session: Session) {
  const segments = useSegments();

  useEffect(() => {
    // const inAuthGroup = segments[0] === "(auth)";
    // if (!session && !inAuthGroup) {
    //   router.replace("/");
    // } else if (session && inAuthGroup) {
    //   router.replace("/(tabs)");
    // }
  }, [session, segments]);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session>();
  console.log("user", session);
  // useProtectedRoute(session);

  const createAnEOA = async (
    name: string,
    password: string,
    lensBool: boolean,
    privateKey: string
  ) => {
    // if (session) {
    //   Alert.alert("You already have an account");
    //   return;
    // }

    try {
      if (!lensBool) {
        let { privateKey: key, walletAddress, phrase } = await _createWallet();

        const user = {
          name,
          password,
          walletAddress,
          privateKey: key,
          phrase,
        };
        console.log(user);

        console.log("creating.....");

        await AsyncStorage.setItem("user", JSON.stringify(user));

        if (true) {
          Alert.alert(`Something went wrong`);
          return;
        }
        if (walletAddress) {
          await signInWithLens(walletAddress);

          router.push("/(tabs)");
        }
      } else {
        let signer = new ethers.Wallet(privateKey);

        let walletAddress = signer.address;
        const user = {
          name,
          password,
          walletAddress,
          privateKey,
          phrase: "",
        };

        await signInWithLens(walletAddress);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        router.push("/(tabs)");
      }

      // profileCreateResult is a Result object
    } catch (error) {
      Alert.alert("Error creating a new account");
      console.error(error);
    }
  };

  const signin = async (email: string, password: string) => {
    // Signed in
    const user: string | null = await AsyncStorage.getItem("user");

    if (user != undefined) {
      const parseUser = JSON.parse(user);
      if (parseUser.password != password) {
        Alert.alert("Password is not correct");
        console.error("Password is not correct");
      } else {
        // User is null
        // Handle the case where the user is not found
        await signInWithLens(parseUser.walletAddress);

        router.push("/(tabs)");
      }
    } else {
      Alert.alert("Error Please, Signup for a new account");
    }
  };

  useEffect(() => {
    // const retrieveAccount = async () => {
    //   const account = await getAccount();
    //   setSession(account);
    //   router.push("/(tabs)");
    // };
    // retrieveAccount();
  }, [session]);

  const contextValue: AuthContextValue = {
    session,
    createAnEOA,
    permanentlyDeleteAccount,
    signin,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
