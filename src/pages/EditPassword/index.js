import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import {Button, Gap, Header, TextInput} from '../../components';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData, useForm} from '../../utils';

const EditProfile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  }, []);
  const [form, setForm] = useForm({
    name: '',
    email: '',
    address: '',
    postalCode: '',
    houseNumber: '',
    phoneNumber: '',
  });

  const onSubmit = () => {
    let resultObj = {};
    Object.keys(form).map(obj => {
      if (form[obj]) {
        resultObj[obj] = form[obj];
      }
    });
    getData('token').then(resToken => {
      Axios.post(`${API_HOST.url}/user`, resultObj, {
        headers: {
          Authorization: resToken.value,
        },
      })
        .then(res => {
          showMessage('Update Success', 'success');
          storeData('userProfile', res.data.data).then(() => {
            navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
          });
        })
        .catch(err => {
          showMessage(
            `${err?.response?.data?.message} on Update Profile API` ||
              'Terjadi kesalahan di API Update Profile',
          );
        });
    });
  };
  return (
    // <ScrollView contentContainerStyle={styles.scroll}>
    <View style={styles.page}>
      <Header
        title="Edit Profile"
        subTitle="Update your profile"
        onBack={() => navigation.goBack()}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}>
        <View style={styles.container}>
          <TextInput
            label="Nama Lengkap"
            placeholder={userProfile.name}
            value={form.name}
            onChangeText={value => setForm('name', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Email"
            placeholder={userProfile.email}
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Alamat"
            placeholder={userProfile.address}
            value={form.address}
            onChangeText={value => setForm('address', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nomer Rumah"
            placeholder={userProfile.houseNumber}
            value={form.houseNumber}
            onChangeText={value => setForm('houseNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Nomer HandPhone"
            placeholder={userProfile.phoneNumber}
            value={form.phoneNumber}
            onChangeText={value => setForm('phoneNumber', value)}
          />
          <Gap height={16} />
          <TextInput
            label="Kode Pos"
            placeholder={userProfile.postalCode}
            value={form.postalCode}
            onChangeText={value => setForm('postalCode', value)}
          />
          <Gap height={24} />
          <Button text="Update" onPress={onSubmit} />
        </View>
      </ScrollView>
    </View>
    // </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  scroll: {flexGrow: 1},
  page: {flex: 1},
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 24,
    flex: 1,
  },
});
