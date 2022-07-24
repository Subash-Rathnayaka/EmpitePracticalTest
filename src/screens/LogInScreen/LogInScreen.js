import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import Logo from '../../../assets/images/logo_dummy.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';

const LogInScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const {height} = useWindowDimensions();

  const onLogInPressed = () => {
    // Email validation
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (reg.test(username) === false) {
      console.warn('Email is Not Correct');
    } else {
      // Check credential
      if (username === 'abcd@gmail.com' && password === '1234') {
        navigation.navigate('BottomTab');
      } else {
        console.warn('LogIn failed');
      }
    }
  };

  return (
    <View style={styles.root}>
      <Image
        source={Logo}
        style={[styles.Logo, {height: height * 0.3}]}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="Username"
        value={username}
        setvalue={setUsername}
      />
      <CustomInput
        placeholder="Password"
        value={password}
        setvalue={setPassword}
        secureTextEntry
      />

      <CustomButton text="Log In" onPress={onLogInPressed} />
    </View>
  );
};

//Styles

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },

  Logo: {
    width: '700%',
    maxWidth: 300,
    height: 100,
  },
});

export default LogInScreen;
