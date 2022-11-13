import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {CraftDummy1, CraftDummy2, CraftDummy3, CraftDummy4} from '../../assets';
import {CraftCard, Gap, HomeProfile, HomeTabSection} from '../../components';
import {useDispatch, useSelector} from 'react-redux';
import {getCraftData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {craft} = useSelector(state => state.homeReducer);
  useEffect(() => {
    dispatch(getCraftData());
  });
  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.craftCardContainer}>
            <Gap width={24} />
            {craft.map(itemCraft => {
              return (
                <CraftCard
                  key={itemCraft.id}
                  name={itemCraft.name}
                  image={{uri: itemCraft.picturePath}}
                  rating={itemCraft.rate}
                  onPress={() => navigation.navigate('CraftDetail', itemCraft)}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  craftCardContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'white',
  },
});
