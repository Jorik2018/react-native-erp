import React from 'react';
import {
  Button, Text, View
} from 'react-native';
import Confirmation from '../components/Confirmation';
import Expandable from '../components/Expandable';
import LongContent from '../components/LongContent';
import NestedModal from '../components/NestModal';
import Progress from '../components/Progress';
import AutomaticModal from '../components/AutomaticModal';
import GlobalModal, { hideGlobalModal, showGlobalModal } from '../components/modal/GlobalModal';
import ScrollingContent from '../components/ScrollingContent';

function App(): JSX.Element {


  return (
    <>
      <View style={{
        alignItems: 'center',
        height: '100%',
        justifyContent: 'space-evenly',
      }}>
        <Text style={{
          fontSize: 32,
          color: 'gray',
          fontWeight: 'bold',
        }}>Global Dialog Test</Text>
        <Button title='Open 3 Modals' onPress={() => {
          showGlobalModal({
            Component: AutomaticModal
          })
        }} />
        <Button title='Nested Modal' onPress={() => {
          showGlobalModal({
            Component: NestedModal
          })
        }} />
        <Button title='Progress Modal' onPress={() => showGlobalModal({ Component: Progress })} />
        <Button title='Confirmation Modal' onPress={() => showGlobalModal({
          modalKey: 'confirmation-modal',
          Component: () => <Confirmation onCancelPress={() => hideGlobalModal('confirmation-modal')} onYesPress={() => hideGlobalModal('confirmation-modal')} />,
          hideClose: true
        })} />
        <Button title='Long Content Modal' onPress={() => showGlobalModal({
          Component: () => <LongContent />,
        })} />
        <Button title='Scrolling Content Modal' onPress={() => showGlobalModal({
          Component: () => <ScrollingContent />,
        })} />
        <Button title='Expandable' onPress={() => showGlobalModal({
          Component: () => <Expandable />,
          disableLayoutChangeAnimation: true,
        })} />
        <Button title='Show All' onPress={() => {
          showGlobalModal({
            Component: NestedModal
          })
          setTimeout(() => {
            showGlobalModal({
              Component: Progress
            })
            setTimeout(() => {
              showGlobalModal({
                modalKey: 'confirmation-modal',
                Component: () => <Confirmation onCancelPress={() => hideGlobalModal('confirmation-modal')} onYesPress={() => hideGlobalModal('confirmation-modal')} />,
                hideClose: true
              })
              setTimeout(() => {
                showGlobalModal({
                  Component: LongContent
                })
                setTimeout(() => {
                  showGlobalModal({
                    Component: ScrollingContent,
                  })
                  setTimeout(() => {
                    showGlobalModal({
                      Component: Expandable
                    })
                  })
                }, 1000)
              }, 1000)
            }, 1000)
          }, 1000)
        }} />
      </View>
      <GlobalModal />
    </>
  );
}

export default App;
