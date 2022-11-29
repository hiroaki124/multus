// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity} from 'react-native';
// import CheckBox from '@react-native-community/checkbox';
import { Button } from 'react-native-elements';
import * as Actions from '../redux/actions/index';
import styles from '../resources/Style';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesomeIcon from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/AntDesign';
import { Sae } from 'react-native-textinput-effects';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
  } from '@react-native-google-signin/google-signin';
import AndroidOpenSettings from 'react-native-android-open-settings'
import { CheckBox } from 'react-native-elements'

// GoogleSignin.configure();

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            checked: false
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

    login = async () => {
        // const that = this;
        // alert()
        this.props.navigation.navigate("Home")
        // await this.props.setUID('dkdkdkkdkdkdkkdkd')
        // alert(this.props.signup)
    }

    openSetting=()=>{
        AndroidOpenSettings.generalSettings()
    }
    render(){
        const LOGO = require('../../logo.png');
        return (     
            <SafeAreaView style = {styles.safeView}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.scrollView}>                       
                <View style={styles.body}>
                    <View style={styles.settingButtonContainer}>
                        {/* <Image source={ LOGO } style = {styles.logo}/>           */}
                        <TouchableOpacity style = {styles.settingButton}
                            onPress={this.openSetting}
                        >
                            <Icon
                                style = {styles.smallIcon}
                                name='setting'
                                size={30}
                                color='white'
                            />
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.logoView}>
                        <Image source={ LOGO } style = {styles.logo}/>          
                    </View>
                    <View style={styles.sectionContainer}>                
                        <View style={styles.alignCenter}>
                            <Text style={styles.sectionTitle}>BIENVENIDO</Text>                   
                        </View>              
                        <Sae
                            label={'Usuario'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'white'}
                            inputPadding={16}
                            labelHeight={24}                    
                            inputS
                            // active border height
                            borderHeight={2}
                            // TextInput props
                            autoCapitalize={'none'}
                            autoCorrect={false}
                            labelStyle={{ color: '#ffffff' }}
                        />
                        <Sae
                            label={'Password'}
                            iconClass={FontAwesomeIcon}
                            iconName={'key'}
                            iconColor={'white'}
                            inputPadding={16}
                            labelHeight={24}
                            secureTextEntry = {true}
                            // active border height
                            borderHeight={2}
                            // TextInput props
                            autoCapitalize={'none'}
                            labelStyle={{ color: '#ffffff' }}
                            autoCorrect={false}
                        />
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', marginBottom: 10}}>
                            <View style={{ flexDirection: 'row', marginTop:10, alignItems:'center'  }}>
                                <CheckBox
                                label='My checkbox' 
                                labelStyle={{color: 'white'}}
                               
                                  
                                    checked={this.state.checked}                                
                                    onPress={() => this.setState({ checked: !this.state.checked })}
                                />
                                <Text style={{color:'white', marginLeft:-15, marginTop:-5}}>Recordarme</Text>
                            </View>
                            <View style={{flexDirection:'row', marginTop:10}}>  
                                <Icon
                                    style = {styles.smallIcon}
                                    name='key'
                                    size={15}
                                    color='white'
                                />                             
                                <TouchableOpacity
                                    onPress={() => {this.props.navigation.navigate('#');}}
                                >
                                    <Text style={styles.checkBoxText}>Olvidó Pwd?</Text> 
                                </TouchableOpacity>     
                            </View>  
                        </View>
                        <Button
                            title="Entrar"
                            // loading
                            onPress = {this.login}
                        />
                        {/* <View style={{flexDirection:'row',justifyContent:'center', marginTop: 20}}>                       
                            <GoogleSigninButton
                                style={{ width: 48, height: 40 }}
                                size={GoogleSigninButton.Size.Wide}
                                // color={GoogleSigninButton.Color.Dark}
                                onPress={this.signIn}
                                disabled={this.state.isSigninInProgress} />
                        </View> */}
                        <View style={{flexDirection:'row',justifyContent:'center', marginTop: 5}}>                       
                            <Text style={styles.checkBoxText}>Desarrollado Por LESoluciones®</Text>
                        </View>
                    </View> 
                    <View style={{flex:0.3}}></View>            
                </View>
            </ScrollView>
            </SafeAreaView>
        );
    }  
};

function mapStateToProps(state) {
    return {
      signup: state.signup    
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setUID: Actions.setUID,
      decrease: Actions.decrease,
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
