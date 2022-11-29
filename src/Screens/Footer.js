// 
// Created by @Eduard
// -------------2019/10/6-------------

import React from 'react'
import styles from '../resources/Style';
import { View, Text } from 'react-native';
import Colors from '../resources/Colors';
class Footer extends React.Component {
    render(){        
        return(
            <View style={{flex:0.1, justifyContent: 'flex-end'}} >                
                <View style={{backgroundColor:Colors.dark,flex: 1.2, marginTop:1}}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <Text style={styles.headerHomeText}> Desarrollado Por LESoluciones®</Text>
                    </View>                    
                </View>
            </View>
        )
    }
}
export default Footer;