import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { alert } from '../utils';
import Geolocation from '@react-native-community/geolocation';
import { Camera, CameraDevice, useCameraDevice } from 'react-native-vision-camera';
import { Button } from '../components';
import { documentDirectory, moveAsync } from 'expo-file-system';

export const CustomActions = (props:any) => {

  const { showActionSheetWithOptions } = useActionSheet();

  const device:CameraDevice|undefined = useCameraDevice('back')
  
  const cameraRef = useRef<Camera>(null);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePhoto({
        flash: 'auto',
      });
      
      const newPath = `${documentDirectory}${Date.now()}.jpg`;
      
      // Mueve la foto a un directorio de almacenamiento
      await moveAsync({
        from: photo.path,
        to: newPath,
      });
      
      setImages([{uri:newPath}]);
    }
  };

  const onActionsPress = () => {
    const options = ['Choose From Library', 'Send Location', 'Cancel'];
    const cancelButtonIndex = options.length - 1;
    showActionSheetWithOptions({
      options,
      cancelButtonIndex,
    },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            setModalVisible(true);
            break;
          case 1:
            Geolocation.getCurrentPosition(
              (position:any) => {
                props.onSend({
                  location: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                  },
                });
              },
              (error:any) => alert(error.message),
              { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
            break;
          default:
        }
      });
  }

  let _images:any = [];

  const [state, setState] = useState({modalVisible: false});

  const setImages = (images:any[]) => {
    _images = images;
  }

  const getImages = () => {
    return _images;
  }

  const setModalVisible = (visible = false) => {
    setState({ modalVisible: visible });
  }

  const selectImages = (images:any) => {
    setImages(images);
  }

  const renderNavBar = () => {
    return (
      <View>
        <Button onPress={() => {
          setModalVisible(false);
        } } text={'Cancel'}/>
        <Text>
          {'Camera Roll'}
        </Text>
        <Button onPress={() => {
          setModalVisible(false);
          const images = getImages().map((image: any) => {
            return {
              image: image.uri,
            };
          });
          props.onSend(images);
          setImages([]);
        } } text={'Send'}/>
      </View>
    );
  }

  const renderIcon = () => {
    if (props.icon) {
      return props.icon();
    }
    return (
      <View
        style={[styles.wrapper, props.wrapperStyle]}
      >
        <Text
          style={[styles.iconText, props.iconTextStyle]}
        >
          +
        </Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.container, props.containerStyle]}
      onPress={onActionsPress}
    >
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={state.modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {renderNavBar()}
        <Camera
            ref={cameraRef}
            photo={true}
            isActive={true}
            device={device!}
          />
          <Button text="Tomar Foto" onPress={takePhoto} />
      </Modal>
      {renderIcon()}
    </TouchableOpacity>
  );

}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

CustomActions.defaultProps = {
  onSend: () => { },
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

CustomActions.propTypes = {
  onSend: PropTypes.func,
  options: PropTypes.object,
  icon: PropTypes.func,
  containerStyle: PropTypes.object,
  wrapperStyle: PropTypes.object,
  iconTextStyle: PropTypes.object
};
