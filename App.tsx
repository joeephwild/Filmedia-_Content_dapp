/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {useEventListener} from '@huddle01/react';
import {useHuddle01Mobile} from '@huddle01/react-native';
import React, {useState} from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import Video from './components/Video';

function App(): JSX.Element {
  const {onEvent, send, state} = useHuddle01Mobile();

  const [streamURL, setStreamURL] = useState('');

  useEventListener(state, 'JoinedLobby.Cam.On', () => {
    if (state.context.camStream) {
      console.log('camStream: ', state.context.camStream.toURL());
      setStreamURL(state.context.camStream.toURL());
    }
  });

  console.log('consumers:', state.context.consumers);

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View>
        <Text>Welcome to State Machines!</Text>

        <Text>Room State</Text>
        <Text>{JSON.stringify(state.value)}</Text>
        <Text>Me Id</Text>
        <Text>{JSON.stringify(state.context.peerId)}</Text>
        <Text>Peers</Text>
        <Text>{JSON.stringify(state.context.peers)}</Text>
        <Text>Consumers</Text>
        <Text>{JSON.stringify(state.context.consumers)}</Text>

        <Text>Idle</Text>
        <Button
          title="INIT"
          disabled={!state.matches('Idle')}
          onPress={() => send('INIT')}
        />

        <Text>Initialized</Text>

        <Button
          title="JOIN_LOBBY"
          disabled={!state.matches('Initialized')}
          onPress={() => send('JOIN_LOBBY')}
        />

        <Text>Lobby</Text>
        <View>
          {/* <Button title="RESTART" onPress={() => send('RESTART')} /> */}
          <Button
            title="ENABLE_CAM"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('ENABLE_CAM')}
          />

          <Button
            title="ENABLE_MIC"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('ENABLE_MIC')}
          />

          <Button
            title="JOIN_ROOM"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('JOIN_ROOM')}
          />

          <Button
            title="LEAVE_LOBBY"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('LEAVE_LOBBY')}
          />

          <Button
            title="DISABLE_CAM"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('DISABLE_CAM')}
          />

          <Button
            title="DISABLE_MIC"
            disabled={!state.matches('JoinedLobby')}
            onPress={() => send('DISABLE_MIC')}
          />
        </View>

        <Text>Room</Text>
        <View>
          <Button
            title="PRODUCE_MIC"
            disabled={!state.matches('JoinedRoom')}
            onPress={() => send('PRODUCE_MIC')}
          />

          <Button
            title="PRODUCE_CAM"
            disabled={!state.matches('JoinedRoom')}
            onPress={() => send('PRODUCE_CAM')}
          />

          <Button
            title="STOP_PRODUCING_MIC"
            disabled={!state.matches('JoinedRoom')}
            onPress={() => send('STOP_PRODUCING_MIC')}
          />

          <Button
            title="STOP_PRODUCING_CAM"
            disabled={!state.matches('JoinedRoom')}
            onPress={() => send('STOP_PRODUCING_CAM')}
          />

          <Button
            title="LEAVE_ROOM"
            disabled={!state.matches('JoinedRoom')}
            onPress={() => send('LEAVE_ROOM')}
          />
        </View>
      </View>
      <View>
        <Text>Me Video:</Text>

        <RTCView
          mirror={true}
          objectFit={'cover'}
          streamURL={streamURL}
          zOrder={0}
          style={{backgroundColor: 'white', width: '100%', height: 500}}
        />
        <View>
          {Object.keys(state.context.consumers)
            .filter(
              peerId =>
                state.context.consumers[peerId] &&
                state.context.consumers[peerId].track?.kind === 'video',
            )
            .map(peerId => (
              <Video
                key={peerId}
                peerId={peerId}
                track={state.context.consumers[peerId].track}
              />
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

export default App;
