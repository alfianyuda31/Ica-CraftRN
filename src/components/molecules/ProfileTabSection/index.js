import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ItemListMenu from '../ItemListMenu';

//custom tab bar
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={styles.indicator}
    style={styles.tabBarStyle}
    tabStyle={styles.tabStyle}
    //custom label di tab bar
    renderLabel={({route, focused}) => (
      <Text style={styles.tabText(focused)}>{route.title}</Text>
    )}
  />
);

//sample page tab
const Account = () => {
  const navigation = useNavigation();
  const signOut = () => {
    AsyncStorage.multiRemove(['userProfile', 'token']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };
  return (
    <View style={styles.containerAccount}>
      {/* import Item List Menu from molecules */}
      <ItemListMenu
        text="Edit Profile"
        onPress={() => navigation.navigate('EditProfile')}
      />
      <ItemListMenu text="Keamanan" />
      <ItemListMenu text="Keluar" onPress={signOut} />
    </View>
  );
};

const IcaCraft = () => {
  return (
    <View style={styles.containerFoodMarket}>
      {/* import Item List Craft from molecules */}
      <ItemListMenu text="Nilai App" />
      <ItemListMenu text="Pusat Bantuan" />
      <ItemListMenu text="Kebijakan & Privasi" />
      <ItemListMenu text="Syarat & Ketentuan" />
    </View>
  );
};

const ProfileTabSection = () => {
  const layout = useWindowDimensions();
  //mengatur perpindahan antar tab
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'Akun'},
    {key: '2', title: 'IcaCraft'},
  ]);

  const renderScene = SceneMap({
    1: Account,
    2: IcaCraft,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={styles.tabView}
    />
  );
};

export default ProfileTabSection;

const styles = StyleSheet.create({
  tabView: {backgroundColor: 'white'},
  indicator: {
    backgroundColor: '#020202',
    height: 3,
  },
  tabBarStyle: {
    backgroundColor: 'white',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  tabStyle: {width: 'auto'},
  tabText: focused => ({
    fontFamily: 'Poppins-Medium',
    color: focused ? '#020202' : '#8D92A3',
  }),
  containerAccount: {paddingTop: 8, paddingHorizontal: 24},
  containerFoodMarket: {paddingTop: 8, paddingHorizontal: 24},
});
