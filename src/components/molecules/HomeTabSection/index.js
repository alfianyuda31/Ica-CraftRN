import {StyleSheet, Text, View, useWindowDimensions, Image} from 'react-native';
import React, {useEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {
  CraftDummy1,
  CraftDummy2,
  CraftDummy3,
  CraftDummy4,
} from '../../../assets';
import ItemListCraft from '../ItemListCraft';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getCraftDataByTypes} from '../../../redux/action/home';

//custom tab bar
const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    //custom label di tab bar
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

//sample page tab
const NewCraft = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {newCraft} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getCraftDataByTypes('new_craft'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {newCraft.map(item => {
        return (
          <ItemListCraft
            key={item.id}
            rating={item.rate}
            image={{uri: item.picturePath}}
            onPress={() => navigation.navigate('CraftDetail', item)}
            type="product"
            name={item.name}
            price={item.price}
          />
        );
      })}
      {/* import Item List Craft from molecules */}
    </View>
  );
};

const Popular = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {popular} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getCraftDataByTypes('popular'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {popular.map(item => {
        return (
          <ItemListCraft
            key={item.id}
            rating={item.rate}
            image={{uri: item.picturePath}}
            onPress={() => navigation.navigate('CraftDetail', item)}
            type="product"
            name={item.name}
            price={item.price}
          />
        );
      })}
      {/* import Item List Craft from molecules */}
    </View>
  );
};

const Recommended = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {recommended} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getCraftDataByTypes('recommended'));
  }, []);
  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {recommended.map(item => {
        return (
          <ItemListCraft
            key={item.id}
            rating={item.rate}
            image={{uri: item.picturePath}}
            onPress={() => navigation.navigate('CraftDetail', item)}
            type="product"
            name={item.name}
            price={item.price}
          />
        );
      })}
      {/* import Item List Craft from molecules */}
    </View>
  );
};

const renderScene = SceneMap({
  1: NewCraft,
  2: Popular,
  3: Recommended,
});

const HomeTabSection = () => {
  const layout = useWindowDimensions();
  //mengatur perpindahan antar tab
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'New Craft'},
    {key: '2', title: 'Popular'},
    {key: '3', title: 'Recommended'},
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default HomeTabSection;

const styles = StyleSheet.create({});
