import * as React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Modal, Portal, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ensure you have react-native-vector-icons installed

const InvoiceModal = ({
  visible = true,
  hideModal,
  invoiceValues,
  handlePrint,
  handleShare,
}) => {
  const {date, billTo, discount, vat, other, tasks, companyName, bankAccount} =
    invoiceValues;

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
            <View style={{maxHeight: 600}}>
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
                    {label: 'Discount', value: `-${discount}`},
                    {label: 'VAT', value: vat},
                    {label: 'Other Charges', value: other},
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
                    <Text>Bank Name: Santander UK</Text>
                    <Text>Account No: GB15 ABBY 6016 1331 9268 19</Text>
                  </View>
                )}

                {/* Footer */}
                <Text style={styles.thankYouText}>Thank you!</Text>
                <Text>We really appreciate your business.</Text>
                <View style={styles.contactFooter}>
                  <View style={styles.contactInfo}>
                    <View style={styles.contactFooterText}>
                      <Text>tripservices@hotmail.com</Text>
                      <Icon name="email" style={styles.footerIcon} />
                    </View>
                    <View style={styles.contactFooterText}>
                      <Text>+447529910522</Text>
                      <Icon name="phone" style={styles.footerIcon} />
                    </View>
                  </View>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                  <Button mode="contained" onPress={handlePrint}>
                    Save
                  </Button>
                  <Button mode="contained" onPress={handleShare}>
                    Share
                  </Button>
                </View>
              </ScrollView>
            </View>
          </Modal>
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  invoiceLeft: {
    justifyContent: 'flex-start',
  },
  invoiceRightWithIcons: {
    alignItems: 'flex-end',
    marginTop: 20,
    // gap: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
  },
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
  invoiceLeft: {
    justifyContent: 'flex-start',
  },
  invoiceRight: {
    alignItems: 'flex-end',
  },
  iconTextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 5,
  },
  icon: {
    marginRight: 5,
    fontSize: 18,
    color: '#3c3cce',
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
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  tableCell: {
    width: '25%',
    textAlign: 'center',
  },
  summaryLabel: {
    textAlign: 'right',
  },
  summaryValue: {
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  paymentInfo: {
    marginVertical: 20,
  },
  thankYouText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
  },
  contactFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align the contact info to the right
    marginTop: 10,
  },
  contactInfo: {
    alignItems: 'flex-end', // Align text and icons to the right side
  },
  contactFooterText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footerIcon: {
    color: '#3c3cce',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    padding: 10,
  },
});

export default InvoiceModal;
