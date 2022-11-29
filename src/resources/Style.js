import {StyleSheet,  Dimensions} from 'react-native';
import Colors from './Colors';
const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
    safeView: {
        zIndex:-1,
        flex:1,
    },
    scrollView: { 
        zIndex:-1,    
        // flex:1,  
        height: screenHeight,  
        backgroundColor: Colors.background,
    },
    body: {   
        zIndex:-1,
        height: screenHeight/1.04,         
        backgroundColor: Colors.background,
    },
    sectionContainer: {
        zIndex:-1,
        // alignItems: 'center', 
        justifyContent: 'center',
        flex:1,
        marginHorizontal:30,
        // backgroundColor:'red',
        backgroundColor: Colors.dark,
        marginTop: 15,
        paddingBottom: 32,
        paddingTop: 20,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        zIndex:-1,        
        fontSize: 24,
        fontWeight: '600',
        color: Colors.light,
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
        color: Colors.dark,
    },
    highlight: {
         fontWeight: '700',
    },
    footer: {
        color: Colors.dark,
        fontSize: 12,
        fontWeight: '600',
        padding: 4,
        paddingRight: 12,
        textAlign: 'right',
    },
    logoView: {
        flex: 0.7,        
        alignItems: 'center', 
        justifyContent: 'center'
    },
    logo: {
        width:200, 
        height:100,
        resizeMode: 'contain'
    },
    settingButtonContainer: {
        marginTop:5,
        flexDirection:'row',
        justifyContent:'flex-end',
        width:400, 
        height:50,
        
        resizeMode: 'contain'
    },
    settingButton:{
        marginRight:50,
        width:50, 
        height:50,
        borderRadius:5,
        backgroundColor:Colors.dark,
    },
    alignCenter:{        
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxText:{
        marginTop:5,
        color: Colors.light,
    },
    checkBoxColor:{
       
        color: Colors.light,        
        borderColor: Colors.light, 
        borderStyle: 'dotted'
    },
    smallIcon:{
        marginTop:7.4,
        margin:10
    },
    headerContainer:{
        flex:0.18,        
    },
    subheader:{
        backgroundColor:Colors.dark,
        flex: 1.2, 
        marginTop:1,
        flexDirection:'row',
        justifyContent:'space-between'
        // shadowColor: "#000",
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        
        // elevation: 3,
    },
    header: {        
        flexDirection:'row',
        flex:1,
        backgroundColor:Colors.background,
        justifyContent:'space-between'
    },
    headerIcon: {
        marginRight:10,
        marginLeft:10
    },
    headerTitle: {        
        color:Colors.light,
        fontSize: 16,
        fontWeight: '400',
        marginLeft: 15,
    },
    headerNavText:{
        color:Colors.headerNavTextColor,
        fontSize: 12,
        fontWeight: '300',        
    },
    headerHomeText:{
        color:Colors.light,
        fontSize: 12,
        fontWeight: '300',
        marginLeft: 15,
    },
    camera: {
        height: 330,
        width:300,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        // alignItems: 'center', 
        zIndex:-1,
        justifyContent: 'center',
        flex:1,
        margin:10,        
        backgroundColor: Colors.dark, 
        paddingVertical:10,           
        paddingHorizontal: 15,
    },
    weatherContainer: {
        justifyContent: 'center',
        flex:1.9,
        margin:10,        
        backgroundColor: Colors.dark, 
       
    },
    weatherTitle:{
        color:Colors.light,
        marginLeft:15,
        
    }, 
    weatherWeekday:{
        color:Colors.light,
        fontSize:23,
        fontWeight:'600',
        marginLeft:15,
    },
    weatherTemp:{
        color:Colors.light,
        alignItems:'center',
        fontSize:23,
        fontWeight:'600',
        marginLeft:15,
    },
    profileContainer:{
        zIndex:-1,
        justifyContent: 'center',
        flex:3.3,
        margin:10,        
        backgroundColor: Colors.dark, 
        paddingVertical:10,           
        paddingHorizontal: 15,
    },
    profileImageContainer:{
        flex:1,       
        alignItems: 'center',
        justifyContent:'center',
        // borderRadius:40,
    },
    profileImageWrapper:{
        height:100,
        width:100,
        borderRadius:50,
        overflow: 'hidden',
        backgroundColor:Colors.white,
    },
    profilelogo: {        
        width:100, 
        height:100, 
        borderRadius:50,
        resizeMode: 'contain'
    },
    profileUnderlineText:{
        fontSize:13,
        textDecorationLine: 'underline',
        color:Colors.white,
        marginBottom:2     
    },
    profiletext:{
        fontSize:11,
        color:Colors.white,     
    },
    profilebuttonIcon:{
        marginTop:3,
        margin:3
    },
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    reportContainer: {
        justifyContent: 'center',
        flex:3,
        margin:10,        
        backgroundColor: Colors.dark, 
        paddingVertical:10,           
        paddingHorizontal: 15,
    },
    reportTitleText:{
        color:Colors.white, 
        fontSize:17
    },
    reportItemSection:{
        height: 60
    },
    reportItemText:{
        color:'white',
        marginTop:5
    },
    reportItemInputText:{
        padding: 4,
        fontSize:12,
        color:'white',
        marginTop:5,
        height:25,
        paddingLeft:10,
        borderRadius:3, 
        backgroundColor:Colors.black
    },
    reportButtonContainer:{
        justifyContent: 'center',
        flex:1.5,
        margin:10,        
        // backgroundColor: Colors.dark, 
        paddingVertical:10,           
        paddingHorizontal: 15,
    },
    cameraCapture:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
    cameracontainer: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    modalCloseButtonWrapper:{
        flex:0.1, 
        marginBottom:20, 
        marginHorizontal:40
    },
    deleteComfirmModalContainer:{ 
        flex: 0.2, 
        backgroundColor:Colors.white, 
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:5 
    },
    deleteConfirmModalButtonWrapper:{
        flex:0.7,
        flexDirection:'row', 
        alignItems:'center', 
        justifyContent:'space-around'
    },
    deleteConfirmModalButton:{ 
        height:40, 
        width:60,  
        backgroundColor:Colors.green,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius:5, 
        margin: 10 
    },
    capturedImage:{
        width:250,
        height:300,
        // transform: [{ rotate: '90deg' }]
    },
    homeContainer:{
        zIndex:-1,
        flex:1
    },
    homeButtonWrapper:{
        zIndex:-1,
        flex:1, 
        justifyContent:'center'
    },
    homeButton:{ 
        zIndex:-1,
        flex:0.9, 
        backgroundColor:Colors.green,
        alignItems: 'center', 
        justifyContent: 'center', 
        borderRadius:5 
    },
    notificationBody:{
        backgroundColor:Colors.notiColor,
        zIndex: 3, 
        borderRadius:5,
    },
    notificationHeader:{
        height:30,
        backgroundColor:Colors.notiHeaderColor,
        alignItems:'center',
        justifyContent:'center'
    },
    notificationEmail:{
        flexDirection:'row',

    },
    notiAvata: {
        margin:10,
        height:50,
        width:50,
        borderRadius:30,
        backgroundColor:Colors.green
    },
    notiContent: {
        justifyContent:'center',
        margin:10,
        height:50,
        width:200,
        // backgroundColor:Colors.green
    },
    notificationHeaderText:{
        color:Colors.light
    }, 
    backIcon:{
        marginTop:3
    },
    successAvata: {
        alignItems:'center',
        justifyContent:'center',
        marginTop:20,
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:Colors.green
    },
    successAvataIcon: {
        marginRight:10,
        marginLeft:10
    },

  });
  
export default styles