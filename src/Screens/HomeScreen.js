// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity,PermissionsAndroid } from 'react-native';

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
import Geolocation from '@react-native-community/geolocation';
import * as Actions from '../redux/actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from "react-native-modal";
import { Table, Row, Rows } from 'react-native-table-component';
import DateTimePicker from "react-native-modal-datetime-picker";



GoogleSignin.configure();

var session;
const API_KEY = 'fb27bb515d0cd65c7fe271d7f5cc0e42';

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
        session = this;
    }
    async componentDidMount(){
        var that =this;
        // To Start Scanning    
        if(Platform.OS === 'android'){
            async function requestCameraPermission() {
                try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    'title': 'Get Location Permission',
                    'message': 'Multas App needs access to your location'
                    }
                )
               
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          
                    Geolocation.getCurrentPosition(info => session.setLocations(info));
   
                } else {
                    alert("Location permission denied");
                }
                } catch (err) {
                    alert(err);
        
                }
            }
            
            requestCameraPermission();
        }  
        
    }
    setLocations = async (info) =>{
        
        await this.props.setLocation(info['coords'])
        console.log(this.props.location.longitude, this.props.location.latitude)
        await this.fetchWeather(this.props.location.latitude, this.props.location.longitude)
        
    }

    fetchWeather = async (lat = 25, lon = 25) => {
		await fetch(
			`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
		)
			.then(res => res.json())
			.then(json => {

                let day=new Date();
                // getDayOfWeek(day)
                console.log(json.main.temp)
                console.log(json.weather[0]['main'])
                console.log(day.toString().substr(4, 12))
                this.setState({weekday:this.getDayOfWeek(day)})
                this.setState({temp:json.main.temp})
                this.setState({main:json.weather[0]['main']})
                this.setState({date:day.toString().substr(4, 12)})
                if (json.weather[0]['main'] === 'Clear'){
                    this.setState({weather:'day-sunny'})
                } else if (json.weather[0]['main'] === 'Clouds'){
                    this.setState({weather:'day-cloudy'})
                } else if (json.weather[0]['main'] === 'Rain'){
                    this.setState({weather:'rains'})
                }
                
                // alert(JSON.stringify(json))
				// this.setState({
				// 	temperature: json.main.temp,
				// 	weatherCondition: json.weather[0].main,
				// 	isLoading: false
				// });
            })
            .catch(error=>{
                alert(error)
            });
	}
    getDayOfWeek = (date) => {
        var dayOfWeek = date.getDay();    
        return isNaN(dayOfWeek) ? null : [ 'Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][dayOfWeek];
    }

    toggleModal = ()=>{
        console.log("dddddddddddddddddddddd")
        this.setState({ isfinesModalVisible: !this.state.isfinesModalVisible });
    };

    signOut = () => {
        // alert()
        this.setState({isVisibleConfirmModal:!this.state.isVisibleConfirmModal})       
    }
    goLogOut =() =>{
        this.props.navigation.navigate("Login")
    }

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
        const LOGO = require('../../logo.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
                               
                <View style={styles.body}>

                    <Header title = 'Menu Principal'/>

                    <View style={styles.homeContainer}>
                        <View style={styles.buttonContainer}>                
                            <View style={styles.homeButtonWrapper}>                        
                                <TouchableOpacity style={styles.homeButton}
                                    onPress={() => {                       
                                        this.props.navigation.navigate('Scanner');
                                        
                                    }}  
                                >
                                    <Text style={{color:'white'}}>Escanear Licencia</Text>
                                </TouchableOpacity>                   
                            </View>                        
                        </View>
                        <View style={styles.buttonContainer}>                
                            <View style={{flex:1, justifyContent:'center'}}>                        
                                <TouchableOpacity style={{ flex:0.9,  backgroundColor:Colors.yellow, alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={this.toggleModal}  
                                >
                                    <Text style={{color:'white'}}>Reporte de Fiscalizacion</Text>
                                </TouchableOpacity>                   
                            </View>                        
                        </View>

                        <View style={styles.buttonContainer}>                
                            <View style={{flex:1, justifyContent:'center'}}>                        
                                <TouchableOpacity style={{ flex:0.9,  backgroundColor:Colors.gray,alignItems: 'center', justifyContent: 'center', borderRadius:5 }}
                                    onPress={   
                                        this.signOut                   
                                        
                                        // this.props.increase(15);
                                        // this.SignUp(email, password, phone);
                                    }  
                                >
                                    <Text style={{color:'black'}}>Cierre del Dia</Text>
                                </TouchableOpacity>                   
                            </View>                        
                        </View>
                        <View style={styles.weatherContainer}>                
                            <View style={{flex:1, justifyContent:'center'}}>                        
                                <View style = {{flex:1, justifyContent:'center', backgroundColor:Colors.midledark}}>
                                    <Text style={styles.weatherTitle}>Clima Hoy</Text>   
                                </View> 
                                <View style = {{flex:1.5, flexDirection:'row', justifyContent:'space-between'}}>
                                    <View style={{justifyContent:'space-around'}}>
                                        <Text style={styles.weatherWeekday}>{this.state.weekday}</Text> 
                                        <Text style={styles.weatherTitle}>{this.state.date}</Text> 
                                    </View>
                                    <View style = {{flexDirection:'row',alignItems:'center'}}>
                                        <Icon
                                            style = {styles.smallIcon}
                                            name= {this.state.weather}
                                            size={35}
                                            color='white'
                                        />
                                        <Text style={styles.weatherTemp}>{this.state.temp}°C</Text> 
                                    </View>
                                </View>            
                            </View>                        
                        </View>
                    </View>
                    <Footer />
                    <Modal isVisible={this.state.isVisibleConfirmModal}>
                        <View style={styles.deleteComfirmModalContainer}>
                            <Text>Esta Seguro Que Desea Salir?</Text>
                            <View style={styles.deleteConfirmModalButtonWrapper}>
   
                                <TouchableOpacity style={{ height:40, width:60,  backgroundColor:Colors.green,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10 }}
                                    onPress={this.goLogOut}  
                                >
                                    <Text style={{color:'black'}}>Si</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ height:40, width:60,  backgroundColor:Colors.red,alignItems: 'center', justifyContent: 'center', borderRadius:5, margin: 10  }}
                                    onPress={this.signOut}  
                                >
                                    <Text style={{color:'black'}}>No</Text>
                                </TouchableOpacity>         
                            </View>
                        </View>
                    </Modal>
                    <Modal isVisible={this.state.isfinesModalVisible}>                        
                        <View style={{ flex: 0.9, backgroundColor:Colors.white,borderRadius:5 }}>
                            <View style = {{flex:1}}>
                                <Text style={{color:'black', fontSize:20, marginLeft:15, marginTop:15}}>Reporte de Fiscalización</Text>
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
                                <Button title="Close" onPress={this.toggleModal} />
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
      location: state.location    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setLocation: Actions.setLocation,
      
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
