import React, { useState } from "react";
import { Audio } from "expo-av";
import {
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Web5 } from '@web5/api';

type Session = string | undefined;

type AuthContextValue = {
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
};

const AuthContext = React.createContext<AuthContextValue>({
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
});

export function useAuth() {
  return React.useContext(AuthContext);
}

type AuthProviderProps = {
  // createUserWithEmailAndPassword: (auth: any, email: string, password: string) => Promise<any>;
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
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

  const contextValue: AuthContextValue = {
    playSound,
    currentlyPlayed,
    playerOpen,
    stopSound,
    isPlaying,
    pauseSound,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

// 0x9ab0e4dd0ad0abc732c0d8eb6fe70ae5aa77a79fcb586789d2aaec94d91c3c46;
// e26226
