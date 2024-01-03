import { router, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { Web5 } from "@web5/api";
import { Alert } from "react-native";

type Session = string | undefined;

interface DataItem {
  id: string;
  image: string;
  name: string;
  current_price: number;
  symbol: string;
}

type Web5ContextType = {
  createDid: () => Promise<void>;
};

const Web5Context = React.createContext<Web5ContextType>({
  createDid: async () => {},
});

export function useWeb5() {
  return React.useContext(Web5Context);
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

export function Web5Provider({ children }: AuthProviderProps) {
  const [web5, setWeb5] = useState<Web5>();
  const [did, setDid] = useState<string>();
  console.log("userdid data", web5, did);

  useEffect(() => {
    const initWeb5 = async () => {
      const { web5, did } = await Web5.connect();
      setWeb5(web5);
      setDid(did);

      // if (web5 && did) {
      //   await configureProtocol(web5, did);
      //   await fetchDings(web5, did);
      // }
    };
    initWeb5();
  }, []);

  const createDid = async () => {
    try {
      const { web5, did: userDid } = await Web5.connect();
      setWeb5(web5);
      setDid(userDid);
      console.log(web5, userDid);
    } catch (error) {
      Alert.alert("something wrong when creating did")
      console.log(error);
    }
  };

  const contextValue: Web5ContextType = {
    createDid,
  };

  return (
    <Web5Context.Provider value={contextValue}>{children}</Web5Context.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
