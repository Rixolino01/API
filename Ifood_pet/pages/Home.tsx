import { useEffect, useState } from "react";
import { Button, Text } from "@rneui/themed";
import axiosConfig from "./axios";
import { Divider, ListItem } from "react-native-elements";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ScrollView, Image, View, StyleSheet } from "react-native";
import ListItemTitle from "react-native-elements/dist/list/ListItemTitle";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store'

export default function Home({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  const [nomeUser, setNomeUser] = useState('');

  /*useEffect(() =>{
      axiosConfig.get('/products').then((response) =>{
          setProdutos(response.data.products)
      })
      .catch(() => {
          alert('Erro!')
      })
      AsyncStorage.getItem('user').then((user) =>{
          setNomeUser(user)
      })
  },[])*/

  async function sair() {
    await SecureStore.deleteItemAsync('token');
    await AsyncStorage.removeItem('user');
    navigation.navigate('Login');
  }

  return (
    <ScrollView style={styles.container}>
      <Text h1>Home</Text>
      <Text h1>Olá, {nomeUser}</Text>
      <View style={styles.buttonContainer}>
        <Button
          size='md'
          radius={20}
          title="Cadastro de Pet"
          onPress={() => navigation.navigate('Cadastro_pet')}
          style={styles.button}
        />
        <Button
          size='md'
          radius={20}
          title="Agendamentos"
          onPress={() => navigation.navigate('Agendamento')}
          style={styles.button}
        />
        <Button
          size='md'
          radius={20}
          title="Histórico"
          onPress={() => navigation.navigate('Historico')}
          style={styles.button}
        />
      </View>
      <Button
        size='md'
        radius={20}
        title='Sair'
        onPress={sair}
        style={styles.sairButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    marginBottom: 10,
  },
  sairButton: {
    marginTop: 20,
  }
});
