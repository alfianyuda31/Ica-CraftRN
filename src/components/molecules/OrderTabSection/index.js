import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  ScrollView,
} from 'react-native';
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
import {getInProgress, getPastOrders} from '../../../redux/action';

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
const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.orderReducer);
  useEffect(() => {
    dispatch(getInProgress());
  }, []);
  return (
    <ScrollView>
      <View style={{paddingTop: 8, paddingHorizontal: 24}}>
        {inProgress.map(order => {
          return (
            <ItemListCraft
              key={order.id}
              image={{uri: order.craft.picturePath}}
              onPress={() => navigation.navigate('OrderDetail', order)}
              items={order.quantity}
              price={order.total}
              type="in-progress"
              name={order.craft.name}
              date={order.created_at}
              status={order.status}
            />
          );
        })}
        {/* import Item List Craft from molecules */}
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector(state => state.orderReducer);
  useEffect(() => {
    dispatch(getPastOrders());
  }, []);

  return (
    <View style={{paddingTop: 8, paddingHorizontal: 24}}>
      {/* import Item List Craft from molecules */}
      {pastOrders.map(order => {
        return (
          <ItemListCraft
            key={order.id}
            image={{uri: order.craft.picturePath}}
            onPress={() => navigation.navigate('OrderDetail', order)}
            items={order.quantity}
            price={order.total}
            type="past-orders"
            name={order.craft.name}
            date={order.created_at}
            status={order.status}
          />
        );
      })}
    </View>
  );
};

const renderScene = SceneMap({
  1: InProgress,
  2: PastOrders,
});

const OrderTabSection = () => {
  const layout = useWindowDimensions();
  //mengatur perpindahan antar tab
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Orders'},
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

export default OrderTabSection;

const styles = StyleSheet.create({});
