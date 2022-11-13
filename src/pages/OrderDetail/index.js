import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  Button,
  Gap,
  Header,
  ItemListCraft,
  ItemValue,
  Loading,
} from '../../components';
import {CraftDummy1} from '../../assets';
import axios from 'axios';
import {getData} from '../../utils';
import {API_HOST} from '../../config';
import WebView from 'react-native-webview';

const OrderDetail = ({route, navigation}) => {
  const [paymentURL, setPaymentURL] = useState('https://google.com');

  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const order = route.params;
  const onCancel = () => {
    const data = {
      status: 'CANCELLED',
    };
    getData('token').then(resToken => {
      axios
        .post(`${API_HOST.url}/transaction/${order.id}`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then(res => {
          console.log('sukses MNEGCALCEN ORDER', res);
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        })
        .catch(err => {
          console.log('ERRORNYA APA: ', err.response);
        });
    });
  };

  const onPay = () => {
    setIsPaymentOpen(true);
    setPaymentURL(order.payment_url);
  };

  const onNavChange = state => {
    console.log('nav: ', state);
    const urlSuccess =
      'http://icacraft.my.id/midtrans/success?order_id=45&status_code=201&transaction_status=pending';
    const titleWeb = 'Transaction Success';
    if (state.title === titleWeb) {
      navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
    }
  };

  if (isPaymentOpen) {
    return (
      <>
        <Header
          title="Pembayaran"
          subTitle="Ayo bayar pesanan kamu"
          onBack={() => setIsPaymentOpen(false)}
        />
        <WebView
          source={{uri: paymentURL}}
          startInLoadingState={true}
          renderLoading={() => <Loading />}
          onNavigationStateChange={onNavChange}
        />
      </>
    );
  }
  return (
    <ScrollView>
      <Header
        title="Payment"
        subTitle="24 Hours Payment"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListCraft
          type="order-summary"
          name={order.craft.name}
          price={order.craft.price}
          items={order.quantity}
          image={{uri: order.craft.picturePath}}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          label={order.craft.name}
          value={order.craft.price * order.quantity}
          type="currency"
        />
        <ItemValue label="Ongkos Kirim" value={10000} type="currency" />
        <ItemValue
          label="Pajak 10%"
          value={(10 / 100) * order.total}
          type="currency"
        />
        <ItemValue
          label="Total Harga"
          value={order.total}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Nama" value={order.user.name} />
        <ItemValue label="No. Hp" value={order.user.phoneNumber} />
        <ItemValue label="Alamat" value={order.user.address} />
        <ItemValue label="No. Rumah" value={order.user.houseNumber} />
        <ItemValue label="Kode Pos" value={order.user.postalCode} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Order Status:</Text>
        <ItemValue
          label={`#${order.id}`}
          value={order.status}
          valueColor={order.status === 'CANCELLED' ? '#D9435E' : '#1ABC9C'}
        />
      </View>
      <View style={styles.button}>
        {order.status === 'PENDING' && (
          <>
            <Button
              text="Bayar pesanan"
              onPress={onPay}
              color="#1ABC9C"
              textColor="white"
            />
            <Gap height={16} />
            <Button
              text="Batalkan pesanan saya"
              onPress={onCancel}
              color="#D9435E"
              textColor="white"
            />
          </>
        )}
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 24,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#020202',
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
});
