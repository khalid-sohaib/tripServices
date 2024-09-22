import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Trip Services</Text>
        </View>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('InvoiceScreen')}>
          Create New Invoice
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // marginTop: 100,
    height: '100%',
  },
  titleContainer: {marginVertical: 20},
  title: {fontSize: 30},
});

export default HomeScreen;
