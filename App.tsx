import {useHuddle01Mobile} from '@huddle01/react-native';
import {useEventListener} from '@huddle01/react';
import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, Text, View} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import PeerViewPort from './PeerViewPort';

function App(): JSX.Element {
  const {state, send} = useHuddle01Mobile();

  const [streamURL, setStreamURL] = useState('');

  useEventListener(state, 'JoinedLobby.Cam.On', () => {
    if (state.context.camStream) {
      console.log('camStream: ', state.context.camStream.toURL());
      setStreamURL(state.context.camStream.toURL());
    }
  });

  return (
    <ScrollView style={styles.background}>
      <Text style={styles.appTitle}>My Video Conferencing App</Text>

      <View style={styles.infoSection}>
        <View style={styles.infoTab}>
          <View style={styles.infoKey}>
            <Text style={styles.text}>Room State</Text>
          </View>
          <View style={styles.infoValue}>
            <Text style={styles.text}>{JSON.stringify(state.value)}</Text>
          </View>
        </View>
        <View style={styles.infoTab}>
          <View style={styles.infoKey}>
            <Text style={styles.text}>Me Id</Text>
          </View>
          <View style={styles.infoValue}>
            <Text style={styles.text}>
              {JSON.stringify(state.context.peerId)}
            </Text>
          </View>
        </View>
        <View style={styles.infoTab}>
          <View style={styles.infoKey}>
            <Text style={styles.text}>Peers</Text>
          </View>
          <View style={styles.infoValue}>
            <Text style={styles.text}>
              {JSON.stringify(state.context.peers)}
            </Text>
          </View>
        </View>
        <View style={styles.infoTab}>
          <View style={styles.infoKey}>
            <Text style={styles.text}>Consumers</Text>
          </View>
          <View style={styles.infoValue}>
            <Text style={styles.text}>
              {JSON.stringify(state.context.consumers)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.controlsSection}>
        <View style={styles.controlsColumn}>
          <View style={styles.controlGroup}>
            <Text style={styles.controlsGroupTitle}>Idle</Text>
            <View style={styles.button}>
              <Button
                title="INIT"
                disabled={!state.matches('Idle')}
                onPress={() => send('INIT')}
              />
            </View>
          </View>
          <View style={styles.controlGroup}>
            <Text style={styles.controlsGroupTitle}>Lobby</Text>
            <View>
              <View style={styles.button}>
                <Button
                  title="ENABLE_CAM"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('ENABLE_CAM')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="ENABLE_MIC"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('ENABLE_MIC')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="JOIN_ROOM"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('JOIN_ROOM')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="LEAVE_LOBBY"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('LEAVE_LOBBY')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="DISABLE_CAM"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('DISABLE_CAM')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="DISABLE_MIC"
                  disabled={!state.matches('JoinedLobby')}
                  onPress={() => send('DISABLE_MIC')}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.controlsColumn}>
          <View style={styles.controlGroup}>
            <Text style={styles.controlsGroupTitle}>Initialized</Text>

            <View style={styles.button}>
              <Button
                title="JOIN_LOBBY"
                disabled={!state.matches('Initialized')}
                onPress={() =>
                  send({type: 'JOIN_LOBBY', roomId: 'your_unique_room_id'})
                }
              />
            </View>
          </View>

          <View style={styles.controlGroup}>
            <Text style={styles.controlsGroupTitle}>Room</Text>
            <View>
              <View style={styles.button}>
                <Button
                  title="PRODUCE_MIC"
                  disabled={!state.matches('JoinedRoom')}
                  onPress={() => send('PRODUCE_MIC')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="PRODUCE_CAM"
                  disabled={!state.matches('JoinedRoom')}
                  onPress={() => send('PRODUCE_CAM')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="STOP_PRODUCING_MIC"
                  disabled={!state.matches('JoinedRoom')}
                  onPress={() => send('STOP_PRODUCING_MIC')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="STOP_PRODUCING_CAM"
                  disabled={!state.matches('JoinedRoom')}
                  onPress={() => send('STOP_PRODUCING_CAM')}
                />
              </View>

              <View style={styles.button}>
                <Button
                  title="LEAVE_ROOM"
                  disabled={!state.matches('JoinedRoom')}
                  onPress={() => send('LEAVE_ROOM')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.videoSection}>
        <Text style={styles.text}>My Video:</Text>
        <View style={styles.myVideo}>
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
        <View>
          {Object.keys(state.context.consumers)
            .filter(
              peerId =>
                state.context.consumers[peerId] &&
                state.context.consumers[peerId].track?.kind === 'video',
            )
            .map(peerId => (
              <PeerViewPort
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

const styles = StyleSheet.create({
  appTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  background: {
    backgroundColor: '#222222',
    height: '100%',
    width: '100%',
    paddingVertical: 50,
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
  },
  infoSection: {
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    padding: 10,
  },
  infoTab: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 6,
    marginTop: 4,
  },
  infoKey: {
    borderRightColor: '#fff',
    borderRightWidth: 2,
    padding: 4,
  },
  infoValue: {
    flex: 1,
    padding: 4,
  },
  controlsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
  },
  controlsColumn: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    marginTop: 4,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  controlsGroupTitle: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  controlGroup: {
    marginTop: 4,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  videoSection: {},
  myVideo: {
    height: 300,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});

export default App;
