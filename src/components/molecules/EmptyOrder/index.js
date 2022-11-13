import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IlEmptyOrder} from '../../../assets';
import {Button, Gap} from '../../atoms';
import {useNavigation} from '@react-navigation/native';

const EmptyOrder = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.page}>
      <IlEmptyOrder />
      <Gap height={30} />
      <Text style={styles.title}>Yeay, Berhasil !</Text>
      <Gap height={6} />
      <Text style={styles.subTitle}>Sekarang kamu bisa membeli kerajinan</Text>
      <Text style={styles.subTitle}> yang kamu suka</Text>
      <Gap height={30} />
      <View style={styles.buttonContainer}>
        <Button
          text="Temukan Kerajinan"
          onPress={() => navigation.replace('MainApp')}
        />
      </View>
    </View>
  );
};

export default EmptyOrder;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    color: '#8D92A3',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 80,
  },
});
