// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react'
import styles from '../resources/Style';
import { SafeAreaView, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../resources/Colors';
// import MessageModal from './MessageModal'
import NotificationPopup from 'react-native-push-notification-popup';
import NotificationBody from './Notification';
import { withNavigation } from 'react-navigation';


const renderCustomPopup = ({ appIconSource, appTitle, timeText, title, body }) => (
    <View style={styles.notificationBody}>
        <View style={styles.notificationHeader}>
            <Text style = {styles.notificationHeaderText}>Notification</Text>
        </View>
        <View style={styles.notificationEmail}>
            <View style={styles.notiAvata}>

            </View>
            <View style={styles.notiContent}>
                <Text>This is notification from server</Text>
            </View>
        </View>
        <View style={styles.notificationEmail}>
            <View style={styles.notiAvata}>

            </View>
            <View style={styles.notiContent}>
                <Text>This is notification from server</Text>
            </View>
        </View> 
    </View>
  );
class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isVisibleMessageModal:false
        }
    }

    toggleMessageModal = async() => {        
        this.popup.show({
            onPress: function() {console.log('Pressed')},
            slideOutTime: 7000
        });        
    }

    goback = () => {
        this.props.navigation.goBack();
    }

    render(){
        const {title} = this.props;
        return(
            <View style={styles.headerContainer}>
                <View style = {styles.header}>
                    
                    <View style = {{backgroundColor:Colors.dark, flex:0.15}}>
                        
                    </View>
                    <View style={{flex: 0.2, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
                        <TouchableOpacity 
                            onPress = {this.toggleMessageModal}
                        >
                            <Icon
                                style = {styles.headerIcon}
                                name='envelope-o'
                                size={16}
                                color={Colors.light}
                            /> 
                            {/* <View></View> */}
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress = {this.toggleMessageModal}
                        >
                            <Icon
                                style = {styles.headerIcon}
                                name='edit'
                                size={18}
                                color={Colors.light}
                            /> 
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.subheader}>
                    <View style = {{flex:1}}>
                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            <Text style={styles.headerTitle}>{title}</Text>
                        </View>
                        <View style={{flex:1, flexDirection: 'row'}}>
                            <Text style={styles.headerHomeText}>Home  >  </Text>
                            <Text style={styles.headerNavText}>{title}</Text>
                        </View>
                    </View>
                    <View style = {{flex:0.3,alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity style={{flexDirection:'row'}}
                            onPress = {this.goback}
                        >
                            <Icon
                                style = {styles.backIcon}
                                name='chevron-left'
                                size={18}
                                color={Colors.light}
                            /> 
                            <Text style={styles.headerTitle}>
                                
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <NotificationPopup
            ref={ref => this.popup = ref}
            renderPopupContent={renderCustomPopup} />
            </View>
        )
    }
}
export default withNavigation(Header);