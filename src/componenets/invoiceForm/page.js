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
  // useTheme,
} from 'react-native-paper';
import {Formik} from 'formik';
import DateTimePicker from 'react-native-ui-datepicker';
import {validationSchema} from './validationSchema';
import {colors} from '../../theme/colors';

const InvoiceFormPage = ({handleSave, date, setDate}) => {
  // const {colors} = useTheme();
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
          customerAddress: '',
          discount: 0,
          vat: 0,
          other: 0,
          tasks: [{description: '', quantity: 1, unitPrice: 0}],
          companyName: false,
          bankAccount: false,
          specialInstructions: false,
          email: false,
          phone: false,
          all: false,
        }}
        onSubmit={values => {
          console.log('Form Submitted:', values);
          values.discount = -Math.abs(values.discount);
          console.log('Processed Values:', values);
          handleSave(values);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldValue,
          handleSubmit,
          resetForm,
        }) => {
          const {total} = calculateTotal(values);
          // Function to handle the "Add all" checkbox
          const handleAllCheckbox = checked => {
            setFieldValue('all', checked);
            setFieldValue('companyName', checked);
            setFieldValue('bankAccount', checked);
            setFieldValue('specialInstructions', checked);
            setFieldValue('email', checked);
            setFieldValue('phone', checked);
          };

          // Determine if "all" should be checked based on individual states
          const isAllChecked =
            values.companyName &&
            values.bankAccount &&
            values.specialInstructions &&
            values.email &&
            values.phone;

          // Update "all" checkbox dynamically
          if (values.all !== isAllChecked) {
            setFieldValue('all', isAllChecked);
          }
          return (
            <SafeAreaView style={styles.container}>
              <ScrollView contentContainerStyle={styles.scrollView}>
                {/* 1: Date Section */}
                <View style={styles.sectionContainer}>
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
                </View>

                {/* 2: Customer Section */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Customer</Text>
                  <TextInput
                    label="Customer Name"
                    value={values.billTo}
                    onChangeText={handleChange('billTo')}
                    error={!!errors.billTo}
                    style={styles.input}
                  />
                  {errors.billTo && (
                    <Text style={styles.errorText}>{errors.billTo}</Text>
                  )}
                  <TextInput
                    label="Customer Address"
                    value={values.customerAddress}
                    onChangeText={handleChange('customerAddress')}
                    error={!!errors.customerAddress}
                    style={styles.input}
                  />
                  {errors.customerAddress && (
                    <Text style={styles.errorText}>
                      {errors.customerAddress}
                    </Text>
                  )}
                </View>

                {/* 3: Task Section */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>Tasks</Text>

                  {values.tasks.map((task, index) => (
                    <View style={styles.accordionContainer}>
                      <List.Accordion
                        key={index}
                        title={`Task ${index + 1}`}
                        expanded={openAccordionIndex === index}
                        onPress={() => {
                          setOpenAccordionIndex(
                            openAccordionIndex === index ? null : index,
                          );
                        }}>
                        <Divider style={styles.divider} />

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
                          error={
                            !!(errors.tasks && errors.tasks[index]?.description)
                          }
                        />
                        {errors.tasks && errors.tasks[index]?.description && (
                          <Text style={styles.errorText}>
                            {errors.tasks[index]?.description}
                          </Text>
                        )}

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
                            style={[styles.quantityInput, styles.input]}
                            onChangeText={text =>
                              handleTaskChange(
                                setFieldValue,
                                index,
                                'quantity',
                                Number(text),
                                values.tasks,
                              )
                            }
                            error={
                              !!(errors.tasks && errors.tasks[index]?.quantity)
                            }
                          />
                          {errors.tasks && errors.tasks[index]?.quantity && (
                            <Text style={styles.errorText}>
                              {errors.tasks[index]?.quantity}
                            </Text>
                          )}

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
                          error={
                            !!(errors.tasks && errors.tasks[index]?.unitPrice)
                          }
                          right={<TextInput.Affix text="£" />}
                        />
                        {errors.tasks && errors.tasks[index]?.unitPrice && (
                          <Text style={styles.errorText}>
                            {errors.tasks[index]?.unitPrice}
                          </Text>
                        )}
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
                    mode="contained"
                    style={styles.button}>
                    Add Task
                  </Button>
                </View>

                {/* 4: Summary Section */}
                <Text style={styles.sectionTitle}>Summary</Text>
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
                  label="Total"
                  value={String(total)}
                  editable={false}
                  right={<TextInput.Affix text="£" />}
                  style={styles.input}
                />
                <View style={styles.sectionContainer}>
                  <List.Accordion
                    title="Additional Details"
                    expanded={values.openAccordion}
                    onPress={() =>
                      setFieldValue('openAccordion', !values.openAccordion)
                    }>
                    <Divider style={styles.divider} />

                    {/* Checkbox Options */}
                    {[
                      {label: 'Add company name', key: 'companyName'},
                      {label: 'Add bank account', key: 'bankAccount'},
                      {
                        label: 'Add special instructions',
                        key: 'specialInstructions',
                      },
                      {label: 'Add email', key: 'email'},
                      {label: 'Add phone', key: 'phone'},
                    ].map(({label, key}) => (
                      <View style={styles.checkboxContainer} key={key}>
                        <Checkbox
                          status={values[key] ? 'checked' : 'unchecked'}
                          onPress={() => setFieldValue(key, !values[key])}
                        />
                        <Text>{label}</Text>
                      </View>
                    ))}

                    {/* Add All Checkbox */}
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        status={values.all ? 'checked' : 'unchecked'}
                        onPress={() => handleAllCheckbox(!values.all)}
                      />
                      <Text>Add all</Text>
                    </View>
                  </List.Accordion>
                </View>

                <View style={styles.buttonContainer}>
                  <Button
                    mode="contained"
                    style={styles.button}
                    onPress={() =>
                      resetForm({
                        values: {
                          billTo: '',
                          discount: 0,
                          vat: 0,
                          other: 0,
                          tasks: [{description: '', quantity: 1, unitPrice: 0}], // Reset to initial task
                          companyName: false,
                          bankAccount: false,
                        },
                      })
                    }>
                    Reset
                  </Button>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}>
                    Submit Invoice
                  </Button>
                </View>
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
    backgroundColor: colors.subtleBackground,
  },
  scrollView: {
    padding: 10,
  },
  buttonContainer: {
    marginVertical: 10,
  },
  button: {
    marginBottom: 20,
    borderRadius: 5,
  },
  datePicker: {
    // marginBottom: 10,
  },
  sectionContainer: {
    borderColor: colors.secondary,
    borderStyle: 'solid',
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 5,
  },
  accordionContainer: {
    borderColor: colors.primary,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: colors.background,
    borderRadius: 5,
    padding: 10,
  },
  sectionTitle: {
    padding: 5,
    paddingHorizontal: 5,
    color: colors.primary,
    fontSize: 18,
    fontWeight: 700,
  },
  input: {
    // height: 50, // Adjust height as needed
    borderColor: colors.text,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.subtleBackground,
    color: colors.text,
    fontSize: 16,
    marginVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginVertical: 0,
  },
  quantityInput: {
    flex: 1,
    // marginHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  deleteButton: {
    margin: 10,
  },
  divider: {
    backgroundColor: colors.primary,
    height: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default InvoiceFormPage;
