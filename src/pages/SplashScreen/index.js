import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {LogoCrafter, LogoGambar} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      getData('token').then(res => {
        console.log('token: ', res);
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('SignIn');
        }
      });
    }, 2000);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#79B1FE',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LogoGambar />
      <View style={{height: 20}}></View>
      <LogoCrafter />
    </View>
  );
};

export default SplashScreen;
