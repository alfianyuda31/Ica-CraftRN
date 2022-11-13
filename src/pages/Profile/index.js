import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {ProfileTabSection} from '../../components';
import {API_HOST} from '../../config';
import {getData, showMessage, storeData} from '../../utils';

const Profile = ({navigation}) => {
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    navigation.addListener('focus', () => {
      updateUserProfile();
    });
  }, [navigation]);

  const updateUserProfile = () => {
    getData('userProfile').then(res => {
      setUserProfile(res);
    });
  };

  const updatePhoto = () => {
    ImagePicker.showImagePicker(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          showMessage('Anda tidak memilih photo');
        } else {
          const dataImage = {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          };

          const photoForUpload = new FormData();
          photoForUpload.append('file', dataImage);
          getData('token').then(resToken => {
            axios
              .post(`${API_HOST.url}/user/photo`, photoForUpload, {
                headers: {
                  Authorization: resToken.value,
                  'Content-Type': 'multipart/form-data',
                },
              })
              .then(res => {
                getData('userProfile').then(resUser => {
                  showMessage('Update Photo Berhasil', 'success');
                  resUser.profile_photo_url = `${API_HOST.storage}/${res.data.data[0]}`;
                  storeData('userProfile', resUser).then(() => {
                    updateUserProfile();
                  });
                });
              })
              .catch(err => {
                console.log('UPDATE POTO ERROR: ', err.response);
                showMessage(
                  `${err?.response?.data?.message} on Update Photo API` ||
                    'Terjadi kesalahan di API Update Photo',
                );
              });
          });
        }
      },
    );
  };
  return (
    <View style={styles.page}>
      {/* Dummy ambil foto */}
      <View style={styles.profileDetail}>
        <View style={styles.photo}>
          <TouchableOpacity onPress={updatePhoto}>
            <View style={styles.borderPhoto}>
              <Image
                source={{uri: userProfile.profile_photo_url}}
                style={styles.photoContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>
      <View style={styles.content}>
        <ProfileTabSection />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  profileDetail: {
    backgroundColor: 'white',
    paddingBottom: 26,
  },
  name: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: '#020202',
    textAlign: 'center',
  },
  email: {
    fontFamily: 'Poppins-Light',
    fontSize: 13,
    color: '#8D92A3',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  photo: {
    alignItems: 'center',
    marginTop: 26,
    marginBottom: 16,
  },
  borderPhoto: {
    borderWidth: 1,
    borderColor: '#8D92A3',
    width: 110,
    height: 110,
    borderRadius: 110,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    backgroundColor: '#F0F0F0',
    padding: 24,
  },
});
