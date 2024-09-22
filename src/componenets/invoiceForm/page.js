import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {Button, TextInput, Text, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import {validationSchema} from './validationSchema';
import DateTimePicker from 'react-native-ui-datepicker';

const InvoiceFormPage = ({
  handleSave,
  date,
  setDate,
  calculateTotal,
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  return (
    <Formik
      initialValues={{
        date: new Date(),
        billTo: '',
        description: '',
        quantity: 1,
        unitPrice: 0,
        discount: 0,
        vat: 0,
        other: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={values => {
        handleSave(values);
      }}>
      {({handleChange, handleSubmit, values, errors, setFieldValue}) => {
        const {subTotal, total} = calculateTotal(values);

        return (
          <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <Button
                onPress={() => setDatePickerVisible(true)}
                mode="outlined"
                style={styles.button}>
                Select Date: {date.format('YYYY-MM-DD')}
              </Button>

              {isDatePickerVisible && (
                <View style={styles.datePicker}>
                  <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={params => {
                      setDate(params.date);
                      setFieldValue('date', params.date);
                      setDatePickerVisible(false);
                    }}
                  />
                </View>
              )}

              <TextInput
                label="Bill To"
                value={values.billTo}
                onChangeText={handleChange('billTo')}
                error={!!errors.billTo}
                style={styles.input}
              />
              {errors.billTo && (
                <Text style={styles.errorText}>{errors.billTo}</Text>
              )}

              <TextInput
                label="Description"
                value={values.description}
                onChangeText={handleChange('description')}
                error={!!errors.description}
                style={styles.input}
              />
              {errors.description && (
                <Text style={styles.errorText}>{errors.description}</Text>
              )}

              <View style={styles.quantityContainer}>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={() =>
                    setFieldValue('quantity', Math.max(1, values.quantity - 1))
                  }
                />
                <TextInput
                  label="Quantity"
                  value={String(values.quantity)}
                  keyboardType="numeric"
                  style={styles.quantityInput}
                  onChangeText={handleChange('quantity')}
                />
                <IconButton
                  icon="plus"
                  size={20}
                  onPress={() => setFieldValue('quantity', values.quantity + 1)}
                />
              </View>
              {errors.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}

              <TextInput
                label="Unit Price"
                value={String(values.unitPrice)}
                onChangeText={handleChange('unitPrice')}
                keyboardType="numeric"
                error={!!errors.unitPrice}
                style={styles.input}
              />
              {errors.unitPrice && (
                <Text style={styles.errorText}>{errors.unitPrice}</Text>
              )}

              <TextInput
                label="SubTotal"
                value={String(subTotal)}
                editable={false}
                right={<TextInput.Affix text="USD" />}
                style={styles.input}
              />

              <TextInput
                label="Discount"
                value={String(values.discount)}
                onChangeText={handleChange('discount')}
                keyboardType="numeric"
                error={!!errors.discount}
                style={styles.input}
              />
              {errors.discount && (
                <Text style={styles.errorText}>{errors.discount}</Text>
              )}

              <TextInput
                label="VAT"
                value={String(values.vat)}
                onChangeText={handleChange('vat')}
                keyboardType="numeric"
                error={!!errors.vat}
                style={styles.input}
              />
              {errors.vat && <Text style={styles.errorText}>{errors.vat}</Text>}

              <TextInput
                label="Other Charges"
                value={String(values.other)}
                onChangeText={handleChange('other')}
                keyboardType="numeric"
                error={!!errors.other}
                style={styles.input}
              />
              {errors.other && (
                <Text style={styles.errorText}>{errors.other}</Text>
              )}

              <TextInput
                label="Total"
                value={String(total)}
                editable={false}
                right={<TextInput.Affix text="USD" />}
                style={styles.input}
              />

              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}>
                Submit Invoice
              </Button>
            </ScrollView>
          </SafeAreaView>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
  },
  datePicker: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityInput: {
    flex: 1,
    marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default InvoiceFormPage;
