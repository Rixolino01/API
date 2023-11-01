import { StatusBar } from 'expo-status-bar'
import { useState,useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'

import { Text, Button, Input } from '@rneui/themed'
import * as SecureStore from 'expo-secure-store'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({navigation}) {
  const [resultado, setResultado] = useState('Digite seus dados')
  const [login, setLogin] = useState('')
  const [senha, setSenha] = useState('')

  const logar = () => {
    if(login == '' && senha == ''){
      setResultado('Digite login e senha!!!')
      return
    }

    if(login == 'admin' && senha == '1234'){
      SecureStore.setItemAsync('token', '123456')
      AsyncStorage.setItem('user'," administrador")


      setResultado('Login com sucesso!')
      navigation.navigate('Home')
    } else {
      setResultado('Login ou senha inválidos!')
    }
  }

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) =>{
      if(token != null) {
        navigation.navigate('Home')
      }
    })
  })
 
  return (
    <View style={styles.container}>
      <Text h1>Robertinho</Text>
      <Image style={styles.img} source={require('./src/img/logo01-removebg-preview.png')}/>
      <Text>Login</Text>
      <Input onChangeText={setLogin} />
      <Text>Senha</Text>
      <Input onChangeText={setSenha}
      secureTextEntry={true} />
      <Button size='md' radius={20} onPress={logar} title='Acessar' />
      <Text style={styles.alert}>{resultado}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alert: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  img:{
    width: 250,
    height: 250
  }
});