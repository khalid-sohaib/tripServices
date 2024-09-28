import dayjs from 'dayjs';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import RNFS from 'react-native-fs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import Share from 'react-native-share';
import InvoiceModal from './invoiceModal';
import {generateInvoiceHtml} from './invoiceTemplate';
<<<<<<< Updated upstream
import {Alert} from 'react-native';
=======
import InvoiceFormPage from './page';
>>>>>>> Stashed changes

const InvoiceForm = () => {
  const [date, setDate] = useState(dayjs());
  const [visible, setVisible] = useState(false);
  const [invoiceValues, setInvoiceValues] = useState({});
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const calculateTotal = values => {
    const {quantity, unitPrice, discount, vat, other} = values;

    const parsedQuantity = parseFloat(quantity) || 0;
    const parsedUnitPrice = parseFloat(unitPrice) || 0;
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedVat = parseFloat(vat) || 0;
    const parsedOther = parseFloat(other) || 0;

    const subTotal = parsedQuantity * parsedUnitPrice;
    const total = subTotal - parsedDiscount + parsedVat + parsedOther;

    return {subTotal, total};
  };

  const generatePDF = async values => {
    const htmlContent = generateInvoiceHtml(values, date);
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
    try {
      const pdfOptions = {
        html: htmlContent,
        fileName: `invoice - ${values.billTo}`,
<<<<<<< Updated upstream
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(pdfOptions);
      Alert.alert('PDF generated: ', file.filePath);
    } catch (error) {
      Alert.alert('PDF generation error:', error);
=======
        directory: `${RNFS.ExternalDirectoryPath}/Invoices`, // Adjust as needed
      };
      let file = await RNHTMLtoPDF.convert(pdfOptions);
      const filePath = file.filePath || '';
      console.log(filePath);
      return filePath; // Return the file path to be used for sharing
    } catch (error) {
      Alert.alert('PDF generation error:', error);
    }
  };
  const printPDF = async values => {
    try {
      const htmlContent = generateInvoiceHtml(values, date);

      // Create the directory if it doesn't exist
      const invoicesDirectory = `${RNFS.ExternalDirectoryPath}/Invoices`;
      await RNFS.mkdir(invoicesDirectory);

      // Remove filePath if you are printing HTML content directly
      const jobName = await RNPrint.print({
        html: htmlContent,
      });

      console.log('Print job created:', jobName);
    } catch (error) {
      console.error('Error printing PDF:', error);
    }
  };
  const handlePrint = async () => {
    await printPDF(invoiceValues);
    // await generatePDF(invoiceValues);
    hideModal();
  };

  const handleShare = async () => {
    const filePath = await generatePDF(invoiceValues);
    if (filePath) {
      try {
        await Share.open({
          title: 'Share PDF',
          url: `file://${filePath}`,
          type: 'application/pdf',
          message: 'Here is your PDF invoice!',
        });
      } catch (error) {
        Alert.alert('Error sharing PDF:', error.message);
      }
>>>>>>> Stashed changes
    }
  };

  const handleSave = values => {
    setInvoiceValues(values);
    showModal();
  };

  return (
    <>
      <InvoiceFormPage
        handleSave={handleSave}
        date={date}
        setDate={setDate}
        calculateTotal={calculateTotal}
        showModal={showModal}
      />
      <InvoiceModal
        visible={visible}
        hideModal={hideModal}
        invoiceValues={invoiceValues}
        handlePrint={handlePrint}
        handleShare={handleShare}
      />
    </>
  );
};

export default InvoiceForm;
