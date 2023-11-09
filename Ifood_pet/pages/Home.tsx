import { useEffect, useState } from "react";
import { Button, Text } from "@rneui/themed";
import axiosConfig from "./axios";
import { Divider, Icon, ListItem } from "react-native-elements";
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
      <View style={styles.header}>
        <Text h1>Home</Text>
        <Text h1>Olá, {nomeUser}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          size='md'
          radius={20}
          title="Cadastro de Pet"
          onPress={() => navigation.navigate('Cadastro_pet')}
          style={styles.button}
          icon={
            <Icon
              name='paw'
              type='font-awesome'
              color='black'
            />
          }
          titleStyle={styles.buttonText}
          iconRight
        />
        <Button
          size='md'
          radius={20}
          title="Agendamentos "
          onPress={() => navigation.navigate('Agendamento')}
          style={styles.button}
          icon={
            <Icon
              name='calendar'
              type='font-awesome'
              color='black'
            />
          }
          titleStyle={styles.buttonText}
          iconRight
        />
        <Button
          size='md'
          radius={20}
          title="Histórico"
          onPress={() => navigation.navigate('Historico')}
          style={styles.button}
          icon={
            <Icon
              name='history'
              type='font-awesome'
              color='black'
            />
          }
          titleStyle={styles.buttonText}
          iconRight
        />
      </View>
      <Button
        size='md'
        radius={20}
        title='Sair'
        onPress={sair}
        style={styles.sairButton}
        icon={
          <Icon
            name='sign-out'
            type='font-awesome'
            color='black'
          />
        }
        
        titleStyle={styles.buttonText}
        iconRight
      />
      <View style={styles.imageContainer}>
        <Image style={styles.img} source={require('./src/img/logo01-removebg-preview.png')}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7E7CE',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    marginBottom: 10,
  },
  sairButton: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  buttonText: {
    marginRight: 20,
  },
  img: {
    width: 100,
    height: 100,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
