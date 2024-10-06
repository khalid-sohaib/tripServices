import React, {useState} from 'react';
import {SafeAreaView, ScrollView, View, StyleSheet} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  IconButton,
  List,
  Divider,
  Checkbox,
  useTheme,
} from 'react-native-paper';
import {Formik} from 'formik';
import DateTimePicker from 'react-native-ui-datepicker';
import {colors} from '../../theme/colors';
import {validationSchema} from './validationSchema';

const InvoiceFormPage = ({handleSave, date, setDate}) => {
  const {colors} = useTheme();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [openAccordionIndex, setOpenAccordionIndex] = useState(0);

  const addTask = (setFieldValue, tasks) => {
    setFieldValue('tasks', [
      ...tasks,
      {description: '', quantity: 1, unitPrice: 0},
    ]);
  };

  const handleTaskChange = (setFieldValue, index, field, value, tasks) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setFieldValue('tasks', updatedTasks);
  };

  const calculateTotal = values => {
    const {discount, vat, other, tasks} = values;

    const subTotal = tasks?.reduce((sum, task) => {
      const taskQuantity = parseFloat(task?.quantity) || 0;
      const taskUnitPrice = parseFloat(task?.unitPrice) || 0;
      return sum + taskQuantity * taskUnitPrice;
    }, 0);

    const parsedDiscount = parseFloat(discount) || 0;
    const parsedVat = parseFloat(vat) || 0;
    const parsedOther = parseFloat(other) || 0;

    const total = subTotal - parsedDiscount + parsedVat + parsedOther;

    return {subTotal, total};
  };

  return (
    <>
      <Formik
        initialValues={{
          billTo: '',
          discount: 0,
          vat: 0,
          other: 0,
          tasks: [{description: '', quantity: 1, unitPrice: 0}],
          companyName: false,
          bankAccount: false,
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('Form Submitted:', values);
          values.discount = -Math.abs(values.discount);
          console.log('Processed Values:', values);
          handleSave(values);
        }}>
        {({
          values,
          handleChange,
          errors,
          setFieldValue,
          handleSubmit,
          resetForm,
        }) => {
          const {total} = calculateTotal(values);

          return (
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {/* 1: Date Section */}
                <Text style={styles.sectionTitle}>Date</Text>
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
                {/* 2: Customer Section */}
                <Text style={styles.sectionTitle}>Customer</Text>
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
                {/* 3: Task Section */}
                <Text style={styles.sectionTitle}>Tasks</Text>

                {values.tasks.map((task, index) => (
                  <View style={styles.taskContainer}>
                    <List.Accordion
                      key={index}
                      title={`Task ${index + 1}`}
                      expanded={openAccordionIndex === index}
                      onPress={() => {
                        setOpenAccordionIndex(
                          openAccordionIndex === index ? null : index,
                        );
                      }}
                      // style={styles.taskContainer}
                    >
                      <Divider
                        style={{
                          backgroundColor: colors.secondary,
                          height: 1,
                        }}
                      />

                      {/* Task description input */}
                      <TextInput
                        label={`Task ${index + 1} Description`}
                        value={task.description}
                        onChangeText={text =>
                          handleTaskChange(
                            setFieldValue,
                            index,
                            'description',
                            text,
                            values.tasks,
                          )
                        }
                        style={styles.input}
                      />

                      {/* Quantity input and controls */}
                      <View style={styles.quantityContainer}>
                        <IconButton
                          icon="minus"
                          size={20}
                          onPress={() =>
                            handleTaskChange(
                              setFieldValue,
                              index,
                              'quantity',
                              Math.max(1, task.quantity - 1),
                              values.tasks,
                            )
                          }
                        />
                        <TextInput
                          label="Quantity"
                          value={String(task.quantity)}
                          keyboardType="numeric"
                          style={styles.quantityInput}
                          onChangeText={text =>
                            handleTaskChange(
                              setFieldValue,
                              index,
                              'quantity',
                              Number(text),
                              values.tasks,
                            )
                          }
                        />
                        <IconButton
                          icon="plus"
                          size={20}
                          onPress={() =>
                            handleTaskChange(
                              setFieldValue,
                              index,
                              'quantity',
                              task.quantity + 1,
                              values.tasks,
                            )
                          }
                        />
                      </View>

                      {/* Unit price input */}
                      <TextInput
                        label="Unit Price"
                        value={String(task.unitPrice)}
                        onChangeText={text =>
                          handleTaskChange(
                            setFieldValue,
                            index,
                            'unitPrice',
                            Number(text),
                            values.tasks,
                          )
                        }
                        keyboardType="numeric"
                        style={styles.input}
                      />

                      <TextInput
                        label="SubTotal"
                        value={String(task.quantity * task.unitPrice)}
                        editable={false}
                        style={styles.input}
                        right={<TextInput.Affix text="USD" />}
                      />

                      {/* Delete button (not for the first task) */}
                      {index !== 0 && (
                        <Button
                          mode="outlined"
                          onPress={() => {
                            const updatedTasks = values.tasks.filter(
                              (_, taskIndex) => taskIndex !== index,
                            );
                            setFieldValue('tasks', updatedTasks);
                          }}
                          style={styles.deleteButton}>
                          Delete Task
                        </Button>
                      )}
                    </List.Accordion>
                  </View>
                ))}

                <Button
                  onPress={() => addTask(setFieldValue, values.tasks)}
                  mode="outlined"
                  style={styles.button}>
                  Add Task
                </Button>
                {/* 4: Summary Section */}
                <Text style={styles.sectionTitle}>Summary</Text>
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
                {errors.vat && (
                  <Text style={styles.errorText}>{errors.vat}</Text>
                )}
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

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Checkbox
                    status={values.companyName ? 'checked' : 'unchecked'}
                    onPress={() =>
                      setFieldValue('companyName', !values.companyName)
                    }
                  />
                  <Text> Add company name</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 10,
                  }}>
                  <Checkbox
                    status={values.bankAccount ? 'checked' : 'unchecked'}
                    onPress={() =>
                      setFieldValue('bankAccount', !values.bankAccount)
                    }
                  />
                  <Text> Add bank account</Text>
                </View>
                <Button mode="contained" onPress={resetForm}>
                  Reset
                </Button>
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
    </>
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
    // height: 50, // Adjust height as needed
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.subtleBackground,
    color: colors.text,
    fontSize: 16,
    margin: 10,
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
  taskContainer: {
    borderColor: colors.secondary,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
  },
});

export default InvoiceFormPage;
