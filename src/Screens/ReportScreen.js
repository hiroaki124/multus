// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity,PermissionsAndroid, TextInput } from 'react-native';

import { Button } from 'react-native-elements';
import styles from '../resources/Style';
import FontAwesomeIcon from 'react-native-vector-icons/Fontisto';
import Icon from 'react-native-vector-icons/Fontisto';
import { Sae } from 'react-native-textinput-effects';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import Header from './Header';
import Footer from './Footer';
import Colors from '../resources/Colors';

import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown } from 'react-native-material-dropdown';
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-svg';

import {BluetoothManager,BluetoothEscposPrinter,BluetoothTscPrinter} from 'react-native-bluetooth-escpos-printer';

GoogleSignin.configure();

var session;
const API_KEY = 'AIzaSyAvn6N_9AZXiYeZTAYgsRnGHPvYW5g9ar0';

class HomeScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false,
            location: [],
            temp:'',
            main:'',
            weekday:'',
            date:'',
            weather:'',
            data : [{
                value: 'Tipo de Infraccion..',
              }],
            street:'',
            city:'',
            sector:'',
            isVisibleConfirm:false,

        }
        session = this;
    }
    async componentDidMount(){
        console.log(this.props.location)
        let dd = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.location.latitude},${this.props.location.longitude}&key=${API_KEY}`
        console.log(dd)
        await this.fetchAddress(this.props.location.latitude, this.props.location.longitude)
    }
     printHTML=async()=> {
        // storageUrl: string
        // BluetoothManager.isBluetoothEnabled().then((enabled)=> {
        //     alert(enabled) // enabled ==> true /false
        // }, (err)=> {
        //     alert(err)
        // });
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
        // let options = {
        //     width: 40,
        //     height: 30,
        //     gap: 20,
        //     direction: BluetoothTscPrinter.DIRECTION.FORWARD,
        //     reference: [0, 0],
        //     tear: BluetoothTscPrinter.TEAR.ON,
        //     sound: 0,
        //     text: [{
        //         text: 'I am a testing txt',
        //         x: 20,
        //         y: 0,
        //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
        //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
        //         xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
        //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
        //     },{
        //         text: 'This is test section',
        //         x: 20,
        //         y: 50,
        //         fonttype: BluetoothTscPrinter.FONTTYPE.SIMPLIFIED_CHINESE,
        //         rotation: BluetoothTscPrinter.ROTATION.ROTATION_0,
        //         xscal:BluetoothTscPrinter.FONTMUL.MUL_1,
        //         yscal: BluetoothTscPrinter.FONTMUL.MUL_1
        //     }],
        //     qrcode: [{x: 20, y: 96, level: BluetoothTscPrinter.EEC.LEVEL_L, width: 3, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: 'RDSD0000123456'}],
        //     // barcode: [{x: 120, y:96, type: BluetoothTscPrinter.BARCODETYPE.CODE128, height: 40, readable: 1, rotation: BluetoothTscPrinter.ROTATION.ROTATION_0, code: '1234567890'}],
        //     image: [{x: 160, y: 160, mode: BluetoothTscPrinter.BITMAP_MODE.OVERWRITE,width: 60,image: base64Image}]
        //  }
        // BluetoothTscPrinter.printLable(options)
        // .then(()=>{
        //     //success
        // },
        // (err)=>{
        //     alert(err)
        // })
        await  BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
       
        // await  BluetoothEscposPrinter.printQRCode(String(this.props.report.qrcode),30,10);
        
        // await  BluetoothEscposPrinter.printQRCode("RDSD0000123456");
               
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
        // await  BluetoothEscposPrinter.printBarCode("123456789012", BluetoothEscposPrinter.BARCODETYPE.JAN13, 3, 120, 0, 2)
        // await  BluetoothEscposPrinter.printBarCode("123456789012", BluetoothEscposPrinter.BARCODETYPE.JAN13, 3, 120, 0, 2);
        // await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
        //.then(()=>{alert('done')},(err)=>{alert(err)});
        await  BluetoothEscposPrinter.printQRCode("RDDGST0000001", 400, BluetoothEscposPrinter.ERROR_CORRECTION.L); 
        await  BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
        // await  BluetoothEscposPrinter.printQRCode(String(this.props.report.qrcode),30,10);
        

      }
    fetchAddress = async (lat, lon) => {
		await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${API_KEY}`
		)
			.then(res => res.json())
			.then(json => {
                // alert()                
               console.log(json.results[0].address_components)
               if(json.results[0].address_components[1].types[0]==='route'){
                    this.setState({street:json.results[0].address_components[1].short_name})
                    console.log('----------------------------------------------------------',json.results[0].address_components[1].short_name)
               } else {}
               if(json.results[0].address_components[2].types[1]==='sublocality'){
                    this.setState({sector:json.results[0].address_components[2].short_name})
                    console.log('----------------------------------------------------------',json.results[0].address_components[2].short_name)

               } else {}
               if (json.results[0].address_components[3].types[0]==='locality'){
                    this.setState({city:json.results[0].address_components[3].short_name})
                    console.log('----------------------------------------------------------',json.results[0].address_components[3].short_name)
               }

            })
            .catch(error=>{
                // alert(error)
            })
    }
    toggleConfirmModal = ()=>{
        this.printHTML()
        // console.log("dddddddddddddddddddddd")
        this.setState({ isVisibleConfirm: !this.state.isVisibleConfirm });
    };
    goDetailScreen=()=>{
        this.setState({ isVisibleConfirm: !this.state.isVisibleConfirm });
        this.props.navigation.navigate('Profile')
    }

    render(){
        const LOGO = require('../../logo.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
                               
                <View style={styles.body}>

                    <Header title = 'Detalles del Conductor'/>
                    <ScrollView style={{flex:1,zIndex:-1 }}>
                        <View style={{flex:2,height:1100}}>                            
                            <View style={styles.reportContainer}>                
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={styles.reportTitleText}>Formulario Fiscalizacion</Text>                        
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>No. Identificacion</Text>  
                                        <Text style={styles.reportItemInputText}>{this.props.report.qrcode}</Text>
                                    </View>  
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Nambres</Text>  
                                        <Text style={styles.reportItemInputText}>JOSE RAMON PEREZ</Text>
                                    </View>   
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Ultima Direccion</Text>  
                                        <Text style={styles.reportItemInputText}>Calle Principal, No.21, Esq. Calle Secundaria. Villa Villa, D.N</Text>
                                    </View>  
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Otras Direcciones</Text>  
                                        <Text style={styles.reportItemInputText}>Calle Final, No.123, Domingo Segura. D.N</Text>
                                    </View>                         
                                </View>                        
                            </View>
                            <View style={styles.reportContainer}>                
                                <View style={{flex:1, justifyContent:'center'}}>
                                    <Text style={styles.reportTitleText}>Detalles de Infraccion</Text>                        
                                    <View style = {styles.reportItemSection}>
                                        {/* <Text style={styles.reportItemText}>Seleccione Tipo de Infraccion..</Text>   */}
                                        <Dropdown
                                            label='Seleccione Tipo de Infraccion..'
                                            textColor = {Colors.light}
                                            baseColor = {Colors.white}
                                            data={this.state.data}
                                        />
                                    </View>  
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Seleccione Ciudad</Text>  
                                        <Text style={styles.reportItemInputText}>{this.state.city}</Text>
                                    </View>   
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Seleccione Sector</Text>  
                                        <Text style={styles.reportItemInputText}>{this.state.sector}</Text>
                                    </View>  
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Seleccione Calle</Text>  
                                        <Text style={styles.reportItemInputText}>{this.state.street}</Text>
                                    </View> 
                                    <View style = {styles.reportItemSection}>
                                        <Text style={styles.reportItemText}>Observaciones:</Text>  
                                        <TextInput style={styles.reportItemInputText}></TextInput>
                                    </View>                        
                                </View>                        
                            </View>
                            <View style={styles.buttonContainer}>                
                                <View style={{flex:1, justifyContent:'center'}}>                        
                                    <Text style={styles.reportTitleText}>Subir Documentos</Text> 
                                    <Text style={{color:'black'}}>{this.props.report.photourl}</Text>
                                    <TouchableOpacity style={{ height:30,width:150,  backgroundColor:Colors.white, alignItems: 'center', justifyContent: 'center', borderRadius:3, marginTop:20 }}
                                        onPress={() => {                       
                                            this.props.navigation.navigate('Camera');
                                            // this.props.increase(15);
                                            // this.SignUp(email, password, phone);
                                        }}  
                                    >
                                        <Text style={{color:'black'}}>Seleccionar archivo</Text>
                                    </TouchableOpacity>             
                                </View>                        
                            </View>
                            <View style={styles.reportButtonContainer}>                
                                <View style={{flex:1, justifyContent:'center'}}>  
                                 
                                    <TouchableOpacity style={{ flex:0.9,  backgroundColor:Colors.green, alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                        onPress={                       
                                            this.toggleConfirmModal
                                        }  
                                    >
                                        <Text style={{color:'white'}}>Enviar e Imprimir</Text>
                                    </TouchableOpacity>                        
                                    <TouchableOpacity style={{ flex:0.9,  backgroundColor:Colors.yellow, alignItems: 'center', justifyContent: 'center', borderRadius:5, marginTop:20 }}
                                        onPress={() => {                       
                                            this.props.navigation.navigate('Home');
                                            // this.props.increase(15);
                                            // this.SignUp(email, password, phone);
                                        }}  
                                    >
                                        <Text style={{color:'black'}}>Cancelar</Text>
                                    </TouchableOpacity>                   
                                </View>                        
                            </View>                       
                        </View>
                   
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
                                            onPress={this.goDetailScreen}  
                                        >
                                            <Text style={{color:'white'}}>Cerrar</Text>
                                    </TouchableOpacity>
                                    
                                </View>                              
                            </View>
                        </Modal>      
                    </ScrollView>
                    <Footer />             
                </View>

            </SafeAreaView>
        );
    }
  
};


function mapStateToProps(state) {
    return {
      location: state.location, 
      report:state.report     
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLocation: Actions.setLocation,
      
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
