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
import { LensClient, development, isRelaySuccess } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development,
});

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
  createAnEOA: (name: string, email: string, password: string) => Promise<void>;
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
  const [user, setUser] = useState<FirebaseAuthUser | null>(null);
  console.log("user", session);
  // useProtectedRoute(session);

  const createAnEOA = async (name: string, email: string, password: string) => {
    // if (session) {
    //   Alert.alert("You already have an account");
    //   return;
    // }

    try {
      let accountAddress: string | undefined = await getAccount();

      if (!accountAddress) {
        accountAddress = await createAccount();
      }

      const user = {
        name,
        password,
        walletAddress: accountAddress,
      };
      console.log(user);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      const profileCreateResult = await lensClient.profile.create({
        handle: name,
        to: accountAddress,
      });

      // profileCreateResult is a Result object
      const profileCreateResultValue = profileCreateResult;

      if (!profileCreateResultValue) {
        Alert.alert(`Something went wrong`, profileCreateResultValue);
        return;
      }
      if (accountAddress && profileCreateResult) {
        router.push("/(tabs)");
      }
    } catch (error) {
      Alert.alert("Error creating a new account");
      console.error(error);
    }
  };

  const signin = async (email: string, password: string) => {
    // Signed in
    const user: string | null = await AsyncStorage.getItem("user");

    if (user != null) {
      const parseUser = JSON.parse(user);
      if (parseUser.password != password) {
        Alert.alert("Password is not correct");
        console.error("Password is not correct");
      } else {
        // User is null
        // Handle the case where the user is not found
        router.push("/(tabs)");
      }
    } else {
      console.error("User not found");
    }
  };

  useEffect(() => {
    const retrieveAccount = async () => {
      const account = await getAccount();
      setSession(account);
      router.push("/(tabs)");
    };

    retrieveAccount();
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
