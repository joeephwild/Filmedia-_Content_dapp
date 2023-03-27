import React, {useEffect, useState} from 'react';
import {useHuddle01Mobile} from '@huddle01/react-native';
import {StyleSheet, Text, View} from 'react-native';
import {MediaStream, MediaStreamTrack, RTCView} from 'react-native-webrtc';

const PeerViewPort = ({
  peerId,
  track,
}: {
  peerId: string;
  track: MediaStreamTrack;
}) => {
  const {state} = useHuddle01Mobile();

  const [streamURL, setStreamURL] = useState('');

  const getStream = (_track: MediaStreamTrack) => {
    const stream = new MediaStream(undefined);
    stream.addTrack(_track);
    return stream;
  };

  useEffect(() => {
    setStreamURL(getStream(track).toURL());
  }, [state.context.consumers]);

  return (
    <View>
      <Text style={styles.text}>{peerId}</Text>
      <View style={styles.peerVideo}>
        <RTCView
          mirror={true}
          objectFit={'cover'}
          streamURL={streamURL}
          zOrder={0}
          style={{
            backgroundColor: 'white',
            width: '75%',
            height: '100%',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
  peerVideo: {
    height: 300,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default PeerViewPort;
