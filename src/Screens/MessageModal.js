import React from 'react';
import Modal from "react-native-modal";
import {View, Text, Button, TouchableOpacity} from 'react-native';
import Colors from '../resources/Colors';
import PropTypes from 'prop-types';

class MessgaeModalView extends React.Component{
    static PropTypes={
        visible:PropTypes.bool.isRequired
    }
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
    }
   
    async componentWillReceiveProps (){
       await this.setState({visible:this.props.visible})
    }
    toggle = () => {
        this.setState({visible:!this.state.visible})
    }
    render(){
        // alert(this.props.visible)
        return(
            
                <Modal isVisible={this.state.visible}>
                    {/* <TouchableOpacity onPress= {this.toggle} style={{flex:1, backgroundColor:'red'}}> */}
                    <View style={{ flex: 0.5, backgroundColor:Colors.light }}>
                        <Text>Hello!</Text>
                        <Button title="Hide modal" onPress={this.toggle}/>
                    </View>
                    {/* </TouchableOpacity> */}
                </Modal>
         
        )
    }
}

export default MessgaeModalView;
