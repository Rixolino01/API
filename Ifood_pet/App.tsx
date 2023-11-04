import { NavigationContainer } from "@react-navigation/native"
import Login from "./pages/Login"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from "./pages/Home";
import Historico from "./pages/Historico";
import Cadastro_pet from "./pages/Cadastro_pet";
import Agendamento from "./pages/Agendamento";
import Cadastro_cliente from "./pages/Cadastro_cliente";
//import Initial from "./pages/Initial";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Historico" component={Historico} />
        <Stack.Screen name="Cadastro_pet" component={Cadastro_pet} />
        <Stack.Screen name="Agendamento" component={Agendamento} />
        <Stack.Screen name="Cadastro_cliente" component={Cadastro_cliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
