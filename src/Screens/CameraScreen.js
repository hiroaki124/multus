
import ImagePicker from 'react-native-image-picker';

import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import styles from '../resources/Style';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class CameraScreen extends PureComponent {
    render() {
        return (
          <View style={styles.cameracontainer}>
            <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            //   onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //     console.log(barcodes);
            //   }}
            />
            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }
    
      takePicture = async() => {
        if (this.camera) {
            // alert()
          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options);
          this.props.setPhotoUrl(data.uri)
          console.log(this.props.report.photourl);
          this.props.navigation.goBack();
        }
      };
    }
    


function mapStateToProps(state) {
    return {        
        report: state.report    
    }
  }
  function mapDispatchToProps(dispatch) {
    return bindActionCreators({
      setPhotoUrl: Actions.setPhotoUrl,       
    }, dispatch);
  }
  export default connect(mapStateToProps, mapDispatchToProps)(CameraScreen);