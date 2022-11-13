import {StyleSheet, Text, View, TextInput as TextInputRN} from 'react-native';
import React from 'react';

const TextInput = ({label, placeholder, ...restProps}) => {
  return (
    <View>
      <Text style={styles.Label}>{label}</Text>
      <TextInputRN
        placeholder={placeholder}
        style={styles.input}
        {...restProps}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  Label: {fontSize: 16, fontFamily: 'Poppins-Regular', color: '#020202'},
  input: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
    borderColor: '#020202',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
});
