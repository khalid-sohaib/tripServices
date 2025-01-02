import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed
import {useNavigation} from '@react-navigation/native';
const InvoiceModal = ({
  visible = true,
  hideModal,
  invoiceValues,
  handlePrint,
  handleShare,
}) => {
  const navigation = useNavigation();
  const {
    date,
    billTo,
    customerAddress,
    discount,
    vat,
    other,
    tasks,
    companyName,
    bankAccount,
    phone,
    email,
  } = invoiceValues;
  // Calculate totals
  const subTotals = tasks?.map(task => ({
    ...task,
    subTotal: parseFloat(task.quantity) * parseFloat(task.unitPrice) || 0,
  }));

  const total =
    subTotals?.reduce((acc, task) => acc + task.subTotal, 0) -
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
            contentContainerStyle={styles.modalContainer}>
            <View style={{maxHeight: 750}}>
              <Icon
                style={{alignSelf: 'flex-end', marginLeft: 10, marginBottom: 5}}
                size={22}
                onPress={hideModal}>
                close
              </Icon>
              <ScrollView>
                {/* Header and Invoice Info */}
                <View style={styles.invoiceContainer}>
                  <View style={styles.invoiceLeft}>
                    <Text style={styles.title}>INVOICE</Text>
                    {companyName && (
                      <>
                        <Text style={styles.businessName}>Trip Services</Text>
                        <Text style={styles.tagline}>
                          24/7 At Your Doorstep
                        </Text>
                      </>
                    )}
                  </View>
                  <View style={styles.invoiceRightWithIcons}>
                    <View style={styles.iconTextRow}>
                      <Text>{new Date(date).toLocaleDateString()}</Text>
                      <Icon name="calendar-today" style={styles.icon} />
                    </View>
                    <View style={styles.iconTextRow}>
                      <Text>Invoice No: #INV-001</Text>
                      <Icon name="receipt" style={styles.icon} />
                    </View>
                    <View style={styles.iconTextRow}>
                      <Text>Bill To: {billTo}</Text>
                      <Icon name="person" style={styles.icon} />
                    </View>
                    <View style={styles.iconTextRow}>
                      <Text>Address: {customerAddress}</Text>
                      <Icon name="home" style={styles.icon} />
                    </View>
                  </View>
                </View>
                {/* Service Table */}
                <View style={styles.table}>
                  <View style={styles.tableHeader}>
                    {['Description', 'Quantity', 'Unit Price', 'Amount'].map(
                      (header, index) => (
                        <Text key={index} style={styles.tableHeaderText}>
                          {header}
                        </Text>
                      ),
                    )}
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
                  {/* Summary Rows */}
                  {[
                    {label: 'SubTotal', value: total.toFixed(2)},
                    {label: 'VAT', value: parseFloat(vat).toFixed(2)},
                    {label: 'Total', value: total.toFixed(2), isTotal: true},
                  ].map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                      <Text style={styles.tableCell}></Text>
                      <Text style={styles.tableCell}></Text>
                      <Text
                        style={[
                          styles.tableCell,
                          styles.summaryLabel,
                          item.isTotal && styles.boldText,
                        ]}>
                        {item.label}:
                      </Text>
                      <Text
                        style={[
                          styles.tableCell,
                          styles.summaryValue,
                          item.isTotal && styles.boldText,
                        ]}>
                        £{item.value}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Payment Method */}
                {bankAccount && (
                  <View style={styles.paymentInfo}>
                    <Text>Payment Method: Bank Transfer</Text>
                    <Text>Sort Code: 60-06-14</Text>
                    <Text>Account No: 35390018</Text>
                  </View>
                )}

                {/* Footer */}
                <Text style={styles.thankYouText}>Thank you!</Text>
                <Text style={{textAlign: 'center'}}>
                  We really appreciate your business.
                </Text>
                {(email || phone) && (
                  <View style={styles.contactFooter}>
                    <View style={styles.contactInfo}>
                      {email && (
                        <View style={styles.contactFooterText}>
                          <Text>tripservices@hotmail.com</Text>
                          <Icon name="email" style={styles.footerIcon} />
                        </View>
                      )}
                      {phone && (
                        <View style={styles.contactFooterText}>
                          <Text>+447529910522</Text>
                          <Icon name="phone" style={styles.footerIcon} />
                        </View>
                      )}
                    </View>
                  </View>
                )}

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <Button
                    mode="outlined"
                    style={styles.button}
                    onPress={handlePrint}>
                    Save
                  </Button>
                  <Button
                    mode="outlined"
                    style={styles.button}
                    onPress={handleShare}>
                    Share
                  </Button>
                </View>
                <Button
                  mode="contained"
                  // style={styles.button}
                  onPress={() => {
                    navigation.navigate('Home'); // Navigate to the Home screen
                  }}>
                  Back to Home
                </Button>
              </ScrollView>
            </View>
          </Modal>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    // margin: 20,
    borderRadius: 10,
  },
  invoiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 20,
  },
  invoiceLeft: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  businessName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 14,
    fontStyle: 'italic',
    color: 'gray',
  },
  invoiceRightWithIcons: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'flex-end',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  icon: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
  },
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
    paddingHorizontal: 5,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 14,
    textAlign: 'center',
    color: 'green',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'black',
  },
  paymentInfo: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  thankYouText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  contactFooter: {
    marginVertical: 20,
    padding: 10,
    // backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactFooterText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  footerIcon: {
    marginLeft: 10,
    fontSize: 14,
    color: 'gray',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  button: {
    width: 160,
  },
});

export default InvoiceModal;
