import {useEffect, useState} from "react"
import { Button, Text } from "@rneui/themed"
import axiosConfig from "./axios"
import { Divider, ListItem } from "react-native-elements"
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content"
import { ScrollView, Image } from "react-native"
import ListItemTitle from "react-native-elements/dist/list/ListItemTitle"
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store'


export default function Home({ navigation }) {
    const [produtos, setProdutos] = useState([])
    const [nomeUser, setNomeUser] = useState('')

    useEffect(() =>{
        axiosConfig.get('/products').then((response) =>{
            setProdutos(response.data.products)
        })
        .catch(() => {
            alert('Erro!')
        })
        AsyncStorage.getItem('user').then((user) =>{
            setNomeUser(user)
        })
    },[])

    async function sair (){
        await SecureStore.deleteItemAsync('token')
        await AsyncStorage.removeItem('user')
        navigation.navigate('Login')
    }


    return (
        <ScrollView>
            <Text h1>Home</Text>
            <Text h1> ola,{nomeUser}</Text>
            <Button title='Sair' onPress={
              sair
            } />
            <Text h3>produtos</Text>
            {produtos.map((produto)=>
            (
                <ListItem key={produto.id} onPress bottomDivider>
                    <ListItemContent>
                        <ListItemTitle>
                            <Text>{produto.title}</Text>
                            
                            
                        </ListItemTitle>
                        <ListItemSubtitle><Text>R$ {produto.price},00</Text></ListItemSubtitle>
                    </ListItemContent>
                </ListItem>
            ))}
            
        </ScrollView>
    )
}