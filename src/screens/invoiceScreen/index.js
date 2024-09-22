import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InvoiceForm from '../../componenets/invoiceForm';

export default function InvoiceScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>InvoiceScreen</Text> */}
      <InvoiceForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
});
