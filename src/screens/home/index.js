import React from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Icon} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Logo from '../../theme/assets/trip-logo.png';
import BgImage from '../../theme/assets/bgImage.jpg';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={BgImage}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.overlay} />
        <Icon source={Logo} size={300} />

        <View style={styles.container}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('InvoiceScreen')}
            labelStyle={styles.buttonLabel}
            style={styles.button}>
            Create New Invoice
          </Button>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 150,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
  },
  button: {
    height: 50,
    justifyContent: 'center',
  },
  buttonLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
