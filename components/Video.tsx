import React, {useEffect, useState} from 'react';

import {useHuddle01Mobile} from '@huddle01/react-native';
import {Text, View} from 'react-native';
import {MediaStream, MediaStreamTrack, RTCView} from 'react-native-webrtc';

const Video = ({peerId, track}: {peerId: string; track: MediaStreamTrack}) => {
  const {onEvent, send, state} = useHuddle01Mobile();

  const [streamURL, setStreamURL] = useState('');

  const getStream = (_track: MediaStreamTrack) => {
    const stream = new MediaStream(undefined);
    stream.addTrack(_track);
    return stream;
  };

  useEffect(() => {
    setStreamURL(getStream(track).toURL());
  }, [state.context.consumers]);

  useEffect(() => {
    console.log({streamURL, peerId, track});
  }, [streamURL]);

  return (
    <View>
      <Text>{peerId}</Text>
      <RTCView
        mirror={true}
        objectFit={'cover'}
        streamURL={streamURL}
        zOrder={0}
        style={{backgroundColor: 'red', width: '100%', height: 500}}
      />
    </View>
  );
};

export default Video;
