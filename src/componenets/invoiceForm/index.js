import React, {useState} from 'react';
import dayjs from 'dayjs';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import InvoiceFormPage from './page';
import InvoiceModal from './invoiceModal';
import {generateInvoiceHtml} from './invoiceTemplate';
import {Alert} from 'react-native';

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

    try {
      const pdfOptions = {
        html: htmlContent,
        fileName: `invoice - ${values.billTo}`,
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(pdfOptions);
      Alert.alert('PDF generated: ', file.filePath);
    } catch (error) {
      Alert.alert('PDF generation error:', error);
    }
  };

  const handleSave = values => {
    setInvoiceValues(values);
    showModal();
  };
  const handlePrint = async () => {
    await generatePDF(invoiceValues);
    hideModal();
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
      />
    </>
  );
};

export default InvoiceForm;
