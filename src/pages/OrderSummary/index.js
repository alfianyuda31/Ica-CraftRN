import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {WebView} from 'react-native-webview';

const OrderSummary = ({navigation, route}) => {
  const {item, transaction, userProfile} = route.params;
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [paymentURL, setPaymentURL] = useState('https://google.com');

  const onCheckout = () => {
    const data = {
      craft_id: item.id,
      user_id: userProfile.id,
      quantity: transaction.totalItem,
      total: transaction.total,
      status: 'PENDING',
    };
    getData('token').then(resToken => {
      axios
        .post(`${API_HOST.url}/checkout`, data, {
          headers: {
            Authorization: resToken.value,
          },
        })
        .then(res => {
          console.log('cekout sukses: ', res.data);
          setIsPaymentOpen(true);
          setPaymentURL(res.data.data.payment_url);
        })
        .catch(err => {
          console.log('error bos: ', err);
        });
    });
  };

  const onNavChange = state => {
    console.log('nav: ', state);
    const urlSuccess =
      'http://icacraft.my.id/midtrans/success?order_id=45&status_code=201&transaction_status=pending';
    const titleWeb = 'Transaction Success';
    if (state.title === titleWeb) {
      navigation.reset({index: 0, routes: [{name: 'SuccessOrder'}]});
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
        title="Order Summary"
        subTitle="Pastikan pesanana anda benar"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <Text style={styles.label}>Item Ordered</Text>
        <ItemListCraft
          type="order-summary"
          name={item.name}
          price={item.price}
          image={{uri: item.picturePath}}
          items={transaction.totalItem}
        />
        <Text style={styles.label}>Details Transaction</Text>
        <ItemValue
          label={item.name}
          value={transaction.totalPrice}
          type="currency"
        />
        <ItemValue
          label="Ongkos Kirim"
          value={transaction.driver}
          type="currency"
        />
        <ItemValue label="Pajak 10%" value={transaction.tax} type="currency" />
        <ItemValue
          label="Total Harga"
          value={transaction.total}
          valueColor="#1ABC9C"
          type="currency"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>Deliver to:</Text>
        <ItemValue label="Nama" value={userProfile.name} />
        <ItemValue label="No. Hp" value={userProfile.phoneNumber} />
        <ItemValue label="Alamat" value={userProfile.address} />
        <ItemValue label="No. Rumah" value={userProfile.houseNumber} />
        <ItemValue label="Kode Pos" value={userProfile.postalCode} />
      </View>
      <View style={styles.button}>
        <Button text="Checkout Sekarang" onPress={onCheckout} />
      </View>
      <Gap height={40} />
    </ScrollView>
  );
};

export default OrderSummary;

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
