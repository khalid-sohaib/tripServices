import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';

const InvoiceModal = ({
  visible = true,
  hideModal,
  invoiceValues,
  handlePrint,
  handleShare,
}) => {
  const containerStyle = {backgroundColor: 'white', padding: 20};
  const {date, billTo, discount, vat, other, tasks, companyName, bankAccount} =
    invoiceValues;

  // Calculate totals
  const subTotals = tasks?.map(task => ({
    ...task,
    subTotal: parseFloat(task.quantity) * parseFloat(task?.unitPrice) || 0,
  }));

  const total =
    subTotals?.reduce((acc, task) => acc + task?.subTotal, 0) -
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
              {companyName && (
                <>
                  <Text style={styles.businessName}>Trip Services</Text>
                  <Text style={styles.tagline}>24/7 AT YOUR DOOR STEP</Text>
                </>
              )}

              {/* Invoice Info */}
              <View style={styles.invoiceInfo}>
                <View>
                  <Text>Date: {new Date(date).toLocaleDateString()}</Text>
                  <Text>Invoice No: #INV-001</Text>
                  <Text>Bill To: {billTo}</Text>
                </View>
                {companyName && (
                  <View style={styles.contactInfo}>
                    <Text>Phone: +447529910522</Text>
                    <Text>Email: tripservices@hotmail.com</Text>
                  </View>
                )}
              </View>

              {/* Service Table */}
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={styles.tableHeaderText}>Description</Text>
                  <Text style={styles.tableHeaderText}>Quantity</Text>
                  <Text style={styles.tableHeaderText}>Unit Price</Text>
                  <Text style={styles.tableHeaderText}>Amount</Text>
                </View>
                {subTotals?.map((task, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{task.description}</Text>
                    <Text style={styles.tableCell}>{task.quantity}</Text>
                    <Text style={styles.tableCell}>{task.unitPrice}</Text>
                    <Text style={styles.tableCell}>
                      {task.subTotal.toFixed(2)}
                    </Text>
                  </View>
                ))}
              </View>

              {/* Summary */}
              <View style={styles.summary}>
                <View style={styles.paymentInfo}>
                  {bankAccount && (
                    <>
                      <Text>Payment Method: Bank Transfer</Text>
                      <Text>Account No: 12345678</Text>
                      <Text>Thank you for your business!</Text>
                    </>
                  )}
                </View>
                <View style={styles.totals}>
                  <Text>SubTotal: ${total.toFixed(2)}</Text>
                  <Text>Discount: -${discount}</Text>
                  <Text>VAT: ${vat}</Text>
                  <Text>Other Charges: ${other}</Text>
                  <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <Button mode="contained" onPress={handlePrint}>
                  Save
                </Button>
                <Button mode="contained" onPress={handleShare}>
                  Share
                </Button>
              </View>
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    padding: 10,
  },
});

export default InvoiceModal;
