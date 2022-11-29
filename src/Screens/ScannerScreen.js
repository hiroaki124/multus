// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity,PermissionsAndroid } from 'react-native';

import { Button } from 'react-native-elements';
import styles from '../resources/Style';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Sae } from 'react-native-textinput-effects';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import Header from './Header';
import Footer from './Footer';
import Colors from '../resources/Colors';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import Toast from 'react-native-whc-toast';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import QRCodeScanner from 'react-native-qrcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';

GoogleSignin.configure();

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            qrcode:'',
            activeDetailButton:true,
            isVisibleCaptureImage:false,
            imageUrl: '',
            readQR:false,
            canTakePicture:false,
            showCamera: false,
        }
    }
    // componentWillMount(){
    //     this.setState({isVisibleCaptureImage:false})
    // }
    async componentDidMount(){
        var that =this;
        // To Start Scanning    
        if(Platform.OS === 'android'){
            async function requestCameraPermission() {
                try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,{
                    'title': 'Barcode Scanner App Camera Permission',
                    'message': 'Barcode Scanner App needs access to your camera'
                    }
                )
                
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    //If CAMERA Permission is granted            
                    that.setState({ qrvalue: '' });
                    that.setState({ opneScanner: true });
                } else {
                    alert("CAMERA permission denied");
                }
                } catch (err) {
                alert("Camera permission err",err);
                console.warn(err);
                }
            }
            
            requestCameraPermission();
        }  
    }
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // alert(userInfo)
            // this.setState({ userInfo });
        } catch (error) {
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            } else {
            // some other error happened
            }
        }
    };

    getCurrentUser = async () => {
        const currentUser = await GoogleSignin.getCurrentUser();
        // alert(currentUser)
        this.setState({ currentUser });
    };

    takePicture = async() => {
        // alert();
        if(this.state.canTakePicture===true){
            this.setState({canTakePicture:false})
            this.refs.toast.showTop(this.state.qrcode.split("|")[0]);
            this.props.setQRCode(this.state.qrcode.split("|")[0]);
            await AsyncStorage.setItem('@QR',this.state.qrcode.split("|")[0])
            if (this.camera) {
                // alert()
                const options = { quality: 0.5, base64: true };
                const data = await this.camera.takePictureAsync(options);
                this.setState({imageUrl:data.uri})  
                this.setState({isVisibleCaptureImage:true})         
                this.setState({activeDetailButton:false})           
                console.log("-----------",this.state.imageUrl)
            }
            
        } else {
            this.refs.toast.showTop("Please adjustment camera to QR code!!!");
        }
        
    };
    onSuccess = (e) => {
        this.setState({showCamera:true})
        this.setState({canTakePicture:true})
        this.setState({qrcode:e.data})
        this.setState({readQR:true})
        this.refs.toast.showTop("Can read QR code.. Please take a picture");
        console.log(e.data)
      }
    render(){
        const LOGO = require('../../logo.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
                <Toast ref="toast"/> 
                <View style={styles.body}>

                    <Header title = 'Escanear Licencia'/>

                    <View style={styles.alignCenter}>
                        <Text style={styles.sectionTitle}>BIENVENIDO</Text>                   
                    </View> 

                    <View style={styles.sectionContainer}>                         
                        
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center',overflow: 'hidden'}}>
                            { this.state.isVisibleCaptureImage===false ?
                                this.state.showCamera===false?
                                <QRCodeScanner
                                    onRead={this.onSuccess}                              
                                /> 
                                :
                                <RNCamera
                                    ref={ref => {
                                        this.camera = ref;
                                    }}
                                    style={styles.camera}
                                    type={RNCamera.Constants.Type.back}
                                    flashMode={RNCamera.Constants.FlashMode.off}                                        
                                />                      
                            :
                                <View style={{justifyContent:'center',resizeMode: 'contain', alignItems:'center' }}>
                                    <Image source={{uri: this.state.imageUrl}} style = {styles.capturedImage}/>
                                </View>
                            }
                            
                        </View>
                        <View style={{flex:0.5, justifyContent:'space-between', marginBottom: 10, marginTop:10}}>
                        
                            <TouchableOpacity  style={{ flex:0.9, marginTop: 10, backgroundColor:Colors.green,alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={ this.takePicture.bind(this) }  
                            >
                                <Text style={{color:'white'}}>Escanear</Text>
                            </TouchableOpacity>
                             <TouchableOpacity disabled={this.state.activeDetailButton} style={{ flex:0.9, marginTop: 10, backgroundColor:Colors.yellow,alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={() => {         
                                    this.setState({isVisibleCaptureImage:false})              
                                    this.props.navigation.navigate('Profile');
                                    // this.props.increase(15);
                                    // this.SignUp(email, password, phone);

                                }}  
                            >
                                <Text style={{color:'white'}}>Detalles</Text>
                            </TouchableOpacity>                       
                           
                        </View>
                        
                       
                        
                    </View>
                    <Footer />             
                </View>

            </SafeAreaView>
        );
    }
  
};

function mapStateToProps(state) {
    return { 
      report:state.report     
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setQRCode: Actions.setQRCode,
      
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
