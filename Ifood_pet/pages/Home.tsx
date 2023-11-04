import {useEffect, useState} from "react"
import { Button, Text } from "@rneui/themed"
import axiosConfig from "./axios"
import { Divider, ListItem } from "react-native-elements"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ScrollView, Image, View, StyleSheet } from "react-native"
import ListItemTitle from "react-native-elements/dist/list/ListItemTitle"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store'


export default function Home({ navigation }) {
    const [produtos, setProdutos] = useState([])
    const [nomeUser, setNomeUser] = useState('')

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

    async function sair (){
        await SecureStore.deleteItemAsync('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }


    return (
        <ScrollView>
            <Text h1>Home</Text>
            <Text h1> ola,{nomeUser}</Text>
           <View>
        <Button size='md' radius={20}
          title="Cadastro de Pet"
          onPress={() => navigation.navigate('Cadastro_pet')}
        />
        <Button size='md' radius={20}
          title="Agendamentos"
          onPress={() => navigation.navigate('Agendamento')}
        />
        <Button size='md' radius={20}
          title="Histórico"
          onPress={() => navigation.navigate('Historico')}
        />
      </View>
      <Button size='md' radius={20} title='Sair' onPress={
              sair
            } />
            
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F7E7CE',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });