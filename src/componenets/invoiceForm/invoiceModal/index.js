import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';

const InvoiceModal = ({
  visible = true,
  hideModal,
  invoiceValues,
  handlePrint,
}) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const {date, billTo, description, quantity, unitPrice, discount, vat, other} =
    invoiceValues;

  const subTotal = parseFloat(quantity) * parseFloat(unitPrice) || 0;
  const total =
    subTotal -
    (parseFloat(discount) || 0) +
    (parseFloat(vat) || 0) +
    (parseFloat(other) || 0);

  return (
    <>
      {visible && (
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <ScrollView>
              {/* Header Section */}
              <Text style={styles.title}>INVOICE</Text>
              <Text style={styles.businessName}>Trip Services</Text>
              <Text style={styles.tagline}>24/7 AT YOUR DOOR STEP</Text>

              {/* Invoice Info */}
              <View style={styles.invoiceInfo}>
                <View>
                  <Text>Date: {new Date(date).toLocaleDateString()}</Text>
                  <Text>Invoice No: #INV-001</Text>
                  <Text>Bill To: {billTo}</Text>
                </View>
                <View style={styles.contactInfo}>
                  <Text>Phone: +447529910522</Text>
                  <Text>Email: tripservices@hotmail.com</Text>
                </View>
              </View>

              {/* Service Table */}
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Description</Text>
                  <Text style={styles.tableHeaderText}>Quantity</Text>
                  <Text style={styles.tableHeaderText}>Unit Price</Text>
                  <Text style={styles.tableHeaderText}>Amount</Text>
                </View>
                <View style={styles.tableRow}>
                  <Text style={styles.tableCell}>{description}</Text>
                  <Text style={styles.tableCell}>{quantity}</Text>
                  <Text style={styles.tableCell}>{unitPrice}</Text>
                  <Text style={styles.tableCell}>{subTotal}</Text>
                </View>
              </View>

              {/* Summary */}
              <View style={styles.summary}>
                <View style={styles.paymentInfo}>
                  <Text>Payment Method: Bank Transfer</Text>
                  <Text>Account No: 12345678</Text>
                  <Text>Thank you for your business!</Text>
                </View>
                <View style={styles.totals}>
                  <Text>SubTotal: ${subTotal.toFixed(2)}</Text>
                  <Text>Discount: -${discount}</Text>
                  <Text>VAT: ${vat}</Text>
                  <Text>Other Charges: ${other}</Text>
                  <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                </View>
              </View>
              <Button mode="contained" onPress={handlePrint}>
                Print
              </Button>
            </ScrollView>
          </Modal>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  businessName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tagline: {
    fontSize: 14,
    color: 'orange',
    textAlign: 'center',
    marginBottom: 20,
  },
  invoiceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactInfo: {
    textAlign: 'right',
  },
  table: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  tableHeaderText: {
    fontWeight: 'bold',
    width: '25%',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  summary: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginVertical: 20,
    gap: 20,
  },
  paymentInfo: {
    flex: 2,
  },
  totals: {
    flex: 1,
    textAlign: 'right',
  },
  total: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
  },
});
export default InvoiceModal;
