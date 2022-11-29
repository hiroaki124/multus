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
import Modal from "react-native-modal";
import { Table, Row, Rows } from 'react-native-table-component';
import { WebView } from 'react-native-webview';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const scalesPageToFit = Platform.OS === 'android';
const cheerio = require('react-native-cheerio')
const INJECTEDJAVASCRIPT = `const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta)`; 

GoogleSignin.configure();

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            qrcode:'',
            activeDetailButton:true,
            isfinesModalVisible:false,
            isVisibleCaptureImage:false,
            imageUrl:'',
            isVisibleConfirm:false,
            readQR:false,
            canTakePicture:false,
            showCamera: false,
        }
    }
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

    printHTML=async()=> {
        var address = ''
        BluetoothManager.enableBluetooth().then((r)=>{            
            var paired = [];
            if(r && r.length>0){
                for(var i=0;i<r.length;i++){
                    try{                        
                        if(JSON.parse(r[i]).name==='IposPrinter'){
                            // alert(JSON.parse(r[i]).address)
                            address = JSON.parse(r[i]).address;
                            BluetoothManager.connect(JSON.parse(r[i]).address)
                            .then((s)=>{
                                // alert("connected!")                                
                            },
                            (err)=>{
                                alert(err)
                            })
                        }                        
                        paired.push(JSON.parse(r[i]));
                    }catch(e){
                        alert(e)
                    }
                }
            }         
            console.log(JSON.stringify(paired))
        },(err)=>{
            alert(err)
        });
        var qrCODE = await AsyncStorage.getItem('@QR')
        console.log("99999999999999999999", qrCODE)
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);     
        await  BluetoothEscposPrinter.printText("Multas APP®\n\r",{});
        await  BluetoothEscposPrinter.printText("Sistema\n\r",{})
        await  BluetoothEscposPrinter.printText("Facturcion\n\r",{})
        await  BluetoothEscposPrinter.printText("Fiscalizacion\n\r",{})
        await  BluetoothEscposPrinter.printText("-------------------------------\n\r",{})
        await  BluetoothEscposPrinter.printText("Desgloce de Fixcalizacion\n\r",{})
        await  BluetoothEscposPrinter.printText("-------------------------------\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
        await  BluetoothEscposPrinter.printText("Licencia: "+String(qrCODE)+"\n\r",{})
        await  BluetoothEscposPrinter.printText("Nombres : JUAN JOSE PEREZ\n\r",{})
        await  BluetoothEscposPrinter.printText("-------------------------------\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await  BluetoothEscposPrinter.printText("1-Infraccion <A>  RD$1,200.00\n\r",{})
        await  BluetoothEscposPrinter.printText("2-Infraccion <B>  RD$1,200.00\n\r",{})
        await  BluetoothEscposPrinter.printText("3-Infraccion <C>  RD$1,200.00\n\r",{})
        await  BluetoothEscposPrinter.printText("4-Infraccion <D>  RD$1,200.00\n\r",{})
        await  BluetoothEscposPrinter.printText("5-Infraccion <E>  RD$1,200.00\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);
        await  BluetoothEscposPrinter.printText("Total a Pagar :  RD$ 6,000.00\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
        await  BluetoothEscposPrinter.printText("Notas:\n\r",{})
        await  BluetoothEscposPrinter.printText("Este recibo sirve para cumplir con todos los requerimiento de la Ley de Transito de Requblica Dominicana.\n\r",{})
        await  BluetoothEscposPrinter.printText("Retension Vehicular:\n\r",{})
        await  BluetoothEscposPrinter.printText("No APlicada:\n\r",{})
        await  BluetoothEscposPrinter.printText("Aplicada en Localidad: Canodromo:\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await  BluetoothEscposPrinter.printText("-------------------------------\n\r",{})
        await  BluetoothEscposPrinter.printText("Favor Dirigirse a La Oficina\n\r",{})
        await  BluetoothEscposPrinter.printText("Principal para completar\n\r",{})
        await  BluetoothEscposPrinter.printText("Proceso de fixcalizacion\n\r",{})       
        await  BluetoothEscposPrinter.printText("-------------------------------\n\r",{})
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
        await  BluetoothEscposPrinter.printText("Creado Por:\n\r",{})      
        await  BluetoothEscposPrinter.printQRCode("RDDGST0000001", 400, BluetoothEscposPrinter.ERROR_CORRECTION.L); 
        await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});       

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

    toggleModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isfinesModalVisible: !this.state.isfinesModalVisible });
        this.setState({isVisibleCaptureImage:false}) 
    };
    toggleConfirmModal = ()=>{
        this.printHTML()
        console.log("dddddddddddddddddddddd")
        this.setState({ isVisibleConfirm: !this.state.isVisibleConfirm });
    };
    gotoggleConfirmModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isVisibleConfirm: !this.state.isVisibleConfirm });
        this.setState({ isfinesModalVisible: !this.state.isfinesModalVisible });
        this.props.navigation.navigate("Profile")
    };

    takePicture = async() => {
        // alert();
        if(this.state.canTakePicture===true){
            this.refs.toast.showTop(this.state.qrcode.split("|")[0]);
            this.props.setQRCode(this.state.qrcode.split("|")[0]);
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
    loadGraphicCards=async()=> {
        const searchUrl = this.state.qrcode;
        const response = await fetch(searchUrl);   // fetch page
      
        const htmlString = await response.text();  // get response text
        const $ = cheerio.load(htmlString);    
        
    }


    onSuccess = (e) => {
        this.setState({showCamera:true})
        this.setState({canTakePicture:true})
        this.setState({qrcode:e.data})
        this.setState({readQR:true})
        this.refs.toast.showTop("Can read QR code.. Please take a picture");
        console.log(e.data)
      }
      onBarCodeRead=(data)=>{
          console.log("------",data)
      }
    render(){
        const LOGO = require('../../logo.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
                <Toast ref="toast"/> 
                <View style={styles.body}>

                    <Header title = 'Retención de Vehículos y Grúa'/>

                    <View style={styles.alignCenter}>
                        <Text style={styles.sectionTitle}>Detalles del Vehiculo</Text>                   
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
                                onBarCodeRead={this.onBarCodeRead.bind(this.data)}
                                // onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                //     console.log(barcodes[0].data)
                                   

                                // }}
                                >
                                
                                {/* <BarcodeMask width={150} height={150}  edgeColor={'#62B1F6'} showAnimatedLine={true}/> */}
                            </RNCamera>
                            :
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <Image source={{uri: this.state.imageUrl}} style = {styles.capturedImage}/>
                            </View>
                            }
                            
                            {/* <BarcodeMask width={150} height={150}  edgeColor={'#62B1F6'} showAnimatedLine={true}/> */}
                        
                           
                        </View>
                        <View style={{flex:0.5, justifyContent:'space-between', marginBottom: 10}}>
                        
                            <TouchableOpacity style={{ flex:0.9, marginTop: 10, backgroundColor:Colors.green,alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={                   
                                    this.takePicture.bind(this)
                                }  
                            >
                                <Text style={{color:'white'}}>Escanear Marbete</Text>
                            </TouchableOpacity>
                             <TouchableOpacity disabled={this.state.activeDetailButton} style={{ flex:0.9, marginTop: 10, backgroundColor:Colors.yellow,alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                onPress={                              
                                    this.toggleModal                                    
                                }  
                            >
                                <Text style={{color:'white'}}>Detailes</Text>
                            </TouchableOpacity>                       
                           
                        </View>
                        
                       
                        
                    </View>
                    <Footer />   
                    <Modal isVisible={this.state.isfinesModalVisible}>                        
                        <View style={{ flex: 0.9, backgroundColor:Colors.white,borderRadius:5, alignItems:'center', justifyContent:'center' }}>
                            <View style = {{flex:1}}>
                                {console.log("******************************************"+this.state.qrcode)}
                            <Text style={{color:'black', fontSize:20, marginLeft:15, marginTop:15}}>Detalles del Vehiculo</Text>
                                <WebView style = {{width:300,height:400}} source={{ uri: this.state.qrcode}} 
                                        scalesPageToFit={true}
                                        bounces={false}
                                        scrollEnabled={false}
                                />
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'center'}}>
                                <TouchableOpacity style={{ height:40, width:120,  backgroundColor:Colors.green ,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10 }}
                                        onPress={this.toggleConfirmModal}  
                                    >
                                        <Text style={{color:'white'}}>Enviar</Text>
                                </TouchableOpacity>
                               
                                <TouchableOpacity style={{ height:40, width:120,  backgroundColor:Colors.red,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10 }}
                                        onPress={this.toggleModal}  
                                    >
                                        <Text style={{color:'white'}}>Cancelar</Text>
                                </TouchableOpacity>
                                
                            </View>                              
                        </View>
                    </Modal>   
                    <Modal isVisible={this.state.isVisibleConfirm}>                        
                        <View style={{ flex: 0.3, backgroundColor:Colors.white,borderRadius:5 }}>
                            <View style = {{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                                <View style={styles.successAvata}>
                                    <Icon
                                        style = {styles.successAvataIcon}
                                        name='check'
                                        size={30}
                                        color={Colors.white}
                                    /> 
                                </View>
                                <Text style={{color:'black', fontSize:25, marginLeft:15, marginTop:15}}>Envio Exitoso!</Text>
                                
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'flex-end'}}>                               
                               
                                <TouchableOpacity style={{ height:40, width:120,  backgroundColor:Colors.red,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 20 }}
                                        onPress={this.gotoggleConfirmModal}  
                                    >
                                        <Text style={{color:'white'}}>Cerrar</Text>
                                </TouchableOpacity>
                                
                            </View>                              
                        </View>
                    </Modal>                
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
