import React, { Component } from 'react';
import {
    TouchableOpacity,
    Image,
    StyleSheet,
    View,
    Text,
    TextInput,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Appearences from '../config/Appearences';
import Store from './../Stores';
import {observer} from 'mobx-react';
import { withNavigation } from 'react-navigation';


@observer
 class DetailToolbarMenu extends Component<Props>  {

  constructor(props){
    super(props);
    this.state = {
      hidePostReportProgress:false,
      showEditOption:false,
    } 
  }

  
  render(){
    let {orderStore} = Store;
    if(orderStore.adDetailComponentMounted)
        {
          
          this.setState({showEditOption:true});
          orderStore.setAdDetailComponentMounted(false);

        }
        else
        {         


        }
        // const staticText = orderStore.innerResponse.data.static_text;
   
        return (

      <View>







      <View style={styles.twoButtonView}>


                        {

                        this.state.showEditOption ? 
                        <TouchableOpacity
                          onPress = {()=>{
                            let {orderStore} = Store;
                            this.props.navigation.replace('SellEdit', { adId:orderStore.adDetail.data.ad_detail.ad_id,isUpdate:true });
                          }}
                        >
                            <Image 
                            style = {styles.icons}
                            source = {require('../../res/images/edit_white.png')}/>
                        </TouchableOpacity>
                          : null
                        } 

                          <Menu>
                            <MenuTrigger>
                              <Image
                              source={require('../../res/images/menu_white.png')}
                              style = {styles.icons} />
                            </MenuTrigger> 
  
                               <MenuOptions>
                               <MenuOption onSelect = {()=>{
                                  // this.refs.reportModal.open();
                                     orderStore.setOnClickShareListener(true); 
                                  }}>
                                      <View style = {styles.menuContainer}>
                                          <Image 
                                          style = {styles.menuImage}
                                          source = {require('../../res/images/share_grey.png')}/>
                                          <Text style = {styles.menuTextStyle}>{orderStore.detailToolbarModel.shareText}</Text>
                                      </View>
                                      <View style = {styles.menuItemSperator}/>
                                  </MenuOption>
  
                                  <MenuOption onSelect = {()=>{
                                    // this.refs.reportModal.open();
                                       orderStore.setOnClickFavouritetListener(true); 
                                    }}>
                                      <View style = {styles.menuContainer}>
                                          <Image 
                                          style = {styles.menuImage}
                                          source = {require('../../res/images/heart_red.png')}/>
                                          <Text style = {styles.menuTextStyle}>{orderStore.detailToolbarModel.favouriteText}</Text>
                                      </View>
                                      <View style = {styles.menuItemSperator}/>
                                  </MenuOption>
  
                                  <MenuOption onSelect = {()=>{
                                  // this.refs.reportModal.open();
                                     orderStore.setOnClickReportListener(true); 
                                  }}>
                                      <View style = {styles.menuContainer}>
                                          <Image 
                                          style = {styles.menuImage}
                                          source = {require('../../res/images/caution_grey.png')}/>
                                          <Text style = {styles.menuTextStyle}>{orderStore.detailToolbarModel.reportText}</Text>
                                      </View>
                                  </MenuOption>
  


                               </MenuOptions>                          
                          </Menu>
                
    </View>
    </View>
  );


  }

}
const  localProps = {
  ratingHeaderDataDimens:7,
  topMargin:5,
  dataRowNumberFontSize:12,
  sidePadding:15,

};
const styles = StyleSheet.create({
   
  
    icons:{
        width:20,
        height:20,    
        marginEnd:10,
        padding:10,
        
    },
   
  
  twoButtonView: {
    flexDirection: 'row',
  },
  menuContainer:{
      flexDirection:'row',
      alignItems: 'center',
        flex:1,
    paddingStart:10,
    paddingBottom: 5,
    paddingTop: 5,
    },
  menuTextStyle:{
    fontSize:Appearences.Fonts.headingFontSize,
    color:Appearences.Colors.grey,
    marginStart:5,  
},

menuItemSperator:{
    height:1,
    width:'100%',
    backgroundColor:Appearences.Colors.lightGrey,
    marginTop: 5,
  },
  menuImage:{
      width:Appearences.Fonts.headingFontSize,
      height:Appearences.Fonts.headingFontSize,
    },
  
  });
  export default withNavigation(DetailToolbarMenu)
