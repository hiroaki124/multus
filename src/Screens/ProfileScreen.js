// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity,PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-elements';
import styles from '../resources/Style';
import Icon from 'react-native-vector-icons/Octicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
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
import Geolocation from '@react-native-community/geolocation';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from "react-native-modal";
import { Table, Row, Rows } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker";

class ProfileScreen extends React.Component {
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
            isfinesModalVisible:false,
            isVehiculosModalVisible:false,
            isInfractionsModalVisible:false,
            isfinesModalVisible:false,
            isVisibleConfirmModal:false,
            datepickerView:false,
            TodatepickerView:false,
            fromDateTime:'',
            ToDateTime:'',
            tableHead: ['Invoice', 'User', 'Date', 'Amount', 'Status', 'Cou'],
            tableData: [
                ['Order\n26598', 'herman beck', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n58746', 'Mary Aclams', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n98458', 'Caleb', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n32658', 'herman beck', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n26598', 'herman beck', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n58746', 'Mary Aclams', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n98458', 'Caleb', 'Oct 16 2017', '45$', 'pack', 'EN'],
                ['Order\n32658', 'herman beck', 'Oct 16 2017', '45$', 'pack', 'EN'],
            ]

        }
    }
    componentDidMount(){
        
    }

    toggleModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isfinesModalVisible: !this.state.isfinesModalVisible });
    };
    toggleVehiculosModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isVehiculosModalVisible: !this.state.isVehiculosModalVisible });
    };
    toggleInfractionsModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isInfractionsModalVisible: !this.state.isInfractionsModalVisible });
    };
    showDateTimePicker = () => {
        this.show('date');
    };
    ToshowDateTimePicker = () => {
        this.Toshow('date');
    };
    show = mode => {
        this.setState({
          datepickerView: true,
          mode,
        });
    }
    Toshow = mode => {
        this.setState({
          TodatepickerView: true,
          mode,
        });
    }
    handleDateTimePicked = date => {
        console.log("A date has been picked: ", date);
        if(this.state.mode==='date'){
          this.setState({fromDateTime:this.convert(date)})
        } 
        console.log(this.state.fromDateTime)
        this.hideDateTimePicker();
    };
    TohandleDateTimePicked = date => {
        console.log("A date has been picked: ", date);
        if(this.state.mode==='date'){
          this.setState({ToDateTime:this.convert(date)})
        } 
        console.log(this.state.ToDateTime)
        this.TohideDateTimePicker();
    };
    convert = (str) => {

        var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
          
        return [date.getFullYear(), mnth, day].join("-");
      }

    hideDateTimePicker = () => {
        this.setState({ datepickerView: false });
    };
    TohideDateTimePicker = () => {
        this.setState({ TodatepickerView: false });
    };
    render(){
        const LOGO = require('../../profile.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
                               
                <View style={styles.body}>

                    <Header title = 'Detalles del Conductor'/>
                    
                    <View style={{flex:1}}>
                        <View style={styles.profileContainer}>                
                            <View style={{flex:1, justifyContent:'center'}}>
                                <View style={styles.profileImageContainer}>
                                    <View style ={styles.profileImageWrapper}>
                                        <Image source={ LOGO } style = {styles.profilelogo}/>   
                                    </View>
                                    <Text style={{color:'white'}}>JOSE RAMON PEFEZ</Text>
                                </View>  
                                <View style={{flex:1.2, marginLeft: 10}}>
                                    <Text style={styles.profileUnderlineText}>Ultima Direccion:</Text>
                                    <Text style={styles.profiletext}>Calle Principal, No.21, Calle Secundaria. Villa Villa, D.N</Text>
                                    <Text style={styles.profileUnderlineText}>Telefonos:</Text>
                                    <Text style={styles.profiletext}>809 686 6886 | 829 123 4567</Text>
                                    <Text style={styles.profileUnderlineText}>Otras Direcciones:</Text>
                                    <Text style={styles.profiletext}>Calle FInal, No. 123, Domingo Segura. D.N</Text>
                                    <Text style={styles.profileUnderlineText}>PENDIENTES:</Text>
                                    
                                </View> 
                                <View style={{flex:0.2, flexDirection: 'row', justifyContent:'space-between'}}>
                                    <TouchableOpacity style={{ flex:0.9, maxWidth:80, backgroundColor:Colors.yellow, alignItems: 'center',marginRight:5, justifyContent: 'center', borderRadius:3, flexDirection:'row' }}
                                        onPress={this.toggleModal}
                                    >
                                        <Icon
                                            style = {styles.profilebuttonIcon}
                                            name= 'law'
                                            size={15}
                                            color='white'
                                        />
                                        <Text style={{color:'white',fontSize:10}}>Multas</Text>
                                    </TouchableOpacity>    
                                    <TouchableOpacity style={{ flex:0.9, backgroundColor:Colors.blue,alignItems: 'center',marginRight:5, justifyContent: 'center', borderRadius:3, flexDirection:'row' }}
                                        onPress={this.toggleVehiculosModal}
                                    >
                                        <Icons
                                            style = {styles.profilebuttonIcon}
                                            name= 'car'
                                            size={15}
                                            color='white'
                                        />
                                        <Text style={{color:'white', fontSize:10}}>Vehiculos Asignados</Text>
                                    </TouchableOpacity>   
                                    <TouchableOpacity style={{ flex:0.9, backgroundColor:Colors.red,alignItems: 'center', justifyContent: 'center', borderRadius:3, flexDirection:'row' }}
                                        onPress = {this.toggleInfractionsModal}
                                    >
                                        <Icons
                                            style = {styles.profilebuttonIcon}
                                            name= 'hammer'
                                            size={15}
                                            color='white'
                                        />
                                        <Text style={{color:'white',fontSize:10}}>Historico Multas</Text>
                                    </TouchableOpacity>           

                                </View>                       
                                              
                            </View>                        
                        </View>
                        <View style={styles.buttonContainer}>                
                            <View style={{flex:1, justifyContent:'center'}}>                        
                                <TouchableOpacity style={{ flex:0.9,marginBottom:5, backgroundColor:Colors.green,alignItems: 'center', justifyContent: 'center', borderRadius:5, flexDirection:'row' }}
                                    onPress={() => {                       
                                        this.props.navigation.navigate('Report');                                        
                                    }}  
                                >
                                    <Icon
                                        style = {styles.smallIcon}
                                        name= 'law'
                                        size={25}
                                        color='white'
                                    />
                                    
                                    <Text style={{color:'white'}}>Fiscalizar</Text>
                                </TouchableOpacity>   
                                <TouchableOpacity style={{ flex:0.9,marginTop:5,  backgroundColor:Colors.red,alignItems: 'center', justifyContent: 'center', borderRadius:5, flexDirection:'row' }}
                                    onPress={() => {                       
                                        this.props.navigation.navigate('SecondScanner');                                        
                                    }}                                      
                                >
                                    <Icons
                                        style = {styles.smallIcon}
                                        name= 'car'
                                        size={25}
                                        color='white'
                                    />
                                    <Text style={{color:'white'}}>Retener Vehiculo</Text>
                                </TouchableOpacity>                   
                            </View>                        
                        </View>         
                        
                    </View>
                    <Footer />                   
                    <View>  
                        <Modal isVisible={this.state.isfinesModalVisible}>                        
                            <View style={{ flex: 0.9, backgroundColor:Colors.white,borderRadius:5 }}>
                                <View style = {{flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={{color:'black', fontSize:20, marginLeft:15, marginTop:15}}>Lista de Multas</Text>
                                        <Text style={{color:'black', fontSize:15, marginLeft:15, marginTop:1}}>Este listado muestra todas las multas del conductor.</Text>
                                    </View>
                                    <View style={{flex:3.5}}>
                                        <ScrollView>
                                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                                                <Rows data={this.state.tableData} textStyle={styles.text}/>
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style = {styles.modalCloseButtonWrapper}>
                                    <Button title="Close" onPress={this.toggleModal} />
                                </View>                                
                            </View>
                        </Modal>
                        <Modal isVisible={this.state.isVehiculosModalVisible}>                        
                            <View style={{ flex: 0.9, backgroundColor:Colors.white,borderRadius:5 }}>
                                <View style = {{flex:1}}>
                                    <View style={{flex:1}}>
                                        <Text style={{color:'black', fontSize:20, marginLeft:15, marginTop:15}}>Vehiculos Asignados</Text>
                                        {/* <Text style={{color:'black', fontSize:15, marginLeft:15, marginTop:1}}>Este listado muestra todas las multas del conductor.</Text> */}
                                    </View>
                                    <View style={{flex:4}}>
                                        <ScrollView>
                                            <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                                                <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                                                <Rows data={this.state.tableData} textStyle={styles.text}/>
                                            </Table>
                                        </ScrollView>
                                    </View>
                                </View>
                                <View style = {styles.modalCloseButtonWrapper}>
                                    <Button title="Close" onPress={this.toggleVehiculosModal} />
                                </View>                                
                            </View>
                        </Modal>
                        <Modal isVisible={this.state.isInfractionsModalVisible}>                        
                            <View style={{ flex: 0.9, backgroundColor:Colors.white,borderRadius:5 }}>
                                <View style = {{flex:1}}>
                                <Text style={{color:'black', fontSize:20, marginLeft:15, marginTop:15}}>Historico Multas</Text>
                                <View style={{flexDirection:'row', justifyContent:'center'}}>
                                    <TouchableOpacity style={{ height:30, width:120,  backgroundColor:Colors.dark ,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10 }}
                                            onPress={this.showDateTimePicker}  
                                        >
                                            <Text style={{color:'white'}}>{this.state.fromDateTime===''? 'Desde':this.state.fromDateTime}</Text>
                                    </TouchableOpacity>
                                
                                    <TouchableOpacity style={{ height:30, width:120,  backgroundColor:Colors.dark,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10 }}
                                            onPress={this.ToshowDateTimePicker}  
                                        >
                                            <Text style={{color:'white'}}>{this.state.ToDateTime===''? 'Hasta':this.state.ToDateTime}</Text>
                                    </TouchableOpacity>
                                    
                                </View>
                                
                                <DateTimePicker
                                    mode={this.state.mode}
                                    isVisible={this.state.datepickerView}
                                    onConfirm={this.handleDateTimePicked}
                                    onCancel={this.hideDateTimePicker}
                                    />
                                <DateTimePicker
                                    mode={this.state.mode}
                                    isVisible={this.state.TodatepickerView}
                                    onConfirm={this.TohandleDateTimePicked}
                                    onCancel={this.TohideDateTimePicker}
                                    />
                                </View>
                                <View style = {styles.modalCloseButtonWrapper}>
                                    <Button title="Close" onPress={this.toggleInfractionsModal} />
                                </View>                                
                            </View>
                        </Modal>
                    </View>                          
                </View>

            </SafeAreaView>
        );
    }
  
};


function mapStateToProps(state) {
    return {
      location: state.location    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLocation: Actions.setLocation,
      
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
