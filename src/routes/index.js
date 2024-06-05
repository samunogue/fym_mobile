import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginPage } from '../screens/Login';
import { HomePage } from '../screens/Home/Home';
import { faCommentSms, faComments, faFileInvoice, faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import { Text, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { MainContratosPage } from '../screens/Contratos/Main';
import { MainPerfilPage } from '../screens/Perfil/Main';
import { MainChatPage } from '../screens/Chat/Main';
import { DetalhesContrato } from '../screens/Contratos/DetalhesContrato';
import { ListaMusicosPage } from '../screens/Home/ListaMusicos';
import { EsqueciSenhaPage } from '../screens/EsqueciSenha';
import { CadastroPage } from '../screens/Cadastro';
import { FavoritosPage } from '../screens/Perfil/Favoritos';
import { ChatPage } from '../screens/Chat/Chat';

const settingsHeader = {
    headerStyle: {
        backgroundColor: '#804DEC',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
}

export const settingsTab = {
  tabBarLabelStyle: { 
    display:"none"
  },
  tabBarStyle: {
    position:"absolute",
    top:"89%",
    width: "96%",
    marginLeft:"2%",
    marginBottom:10,
    borderRadius:10,
    height: 70,
    backgroundColor:"white"
  },
}

const IconeTab = ({config, icone, titulo}) =>{
    return(
      <View style={{height:"100%", borderRadius:10, width:"100%",flexDirection:"column", alignItems:"center", justifyContent:"center", gap:3, backgroundColor:config.focused == true ? "#804DEC" : "white"}}>
        <FontAwesomeIcon icon={icone} color={config.focused == true ? "white" : "black"} size={25} />
      </View>
    )
  }

const StackInicio = createStackNavigator()

export function StackRoutesInicio(){
    return(
      <StackInicio.Navigator initialRouteName="Login">
          <StackInicio.Screen 
          name="Login" 
          component={LoginPage} 
          options={Object.assign({}, settingsHeader, {headerShown: false})}
          />
          <StackInicio.Screen 
          name="EsqueciSenha" 
          component={EsqueciSenhaPage} 
          options={Object.assign({}, settingsHeader, {headerShown: false})}
          />
          <StackInicio.Screen 
          name="Cadastro" 
          component={CadastroPage} 
          options={Object.assign({}, settingsHeader, {headerShown: false})}
          />
          <StackInicio.Screen 
          name="Home" 
          component={TabRoutes}
          options={Object.assign({}, settingsHeader, {headerShown: false})}
          />
      </StackInicio.Navigator>
    )
}


const TabPrincipal = createBottomTabNavigator();

export function TabRoutes(){
  return (
      <TabPrincipal.Navigator initialRouteName={"Home"}>
        <TabPrincipal.Screen 
        name="HomeMain" 
        component={StackRoutesHome}
        options={Object.assign({}, settingsTab, {
          tabBarIcon: (config) => <IconeTab titulo={"Home"} config={config} icone={faHouse}/>,
          tabBarHideOnKeyboard:true,
          headerShown:false,
          })}
        />
        <TabPrincipal.Screen 
        name="ChatMain" 
        component={StackRoutesChat}
        options={Object.assign({}, settingsTab, {
          tabBarIcon: (config) => <IconeTab titulo={"Home"} config={config} icone={faComments}/>,
          tabBarHideOnKeyboard:true,
          headerShown:false,
          })}
        />
        <TabPrincipal.Screen 
        name="ContratosMain" 
        component={StackRoutesContratos}
        options={Object.assign({}, settingsTab, {
          tabBarIcon: (config) => <IconeTab titulo={"Home"} config={config} icone={faFileInvoice}/>,
          tabBarHideOnKeyboard:true,
          headerShown:false,
          })}
        />
        <TabPrincipal.Screen 
        name="PerfilMain" 
        component={StackRoutesPerfil}
        options={Object.assign({}, settingsTab, {
          tabBarIcon: (config) => <IconeTab titulo={"Home"} config={config} icone={faUser}/>,
          tabBarHideOnKeyboard:true,
          headerShown:false,
          })}
        />
      </TabPrincipal.Navigator>
  );
}


const StackHome = createStackNavigator()

function StackRoutesHome(){
    return(
      <StackHome.Navigator initialRouteName="Home">
        <StackHome.Screen 
        name="Home" 
        component={HomePage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
        <StackHome.Screen 
        name="ListaMusicos" 
        component={ListaMusicosPage}
        options={Object.assign({}, settingsHeader, {headerShown: true, headerTitle:"Músicos"})}
        />
    </StackHome.Navigator>
    )
}

const StackChat = createStackNavigator()

function StackRoutesChat(){
    return(
      <StackChat.Navigator initialRouteName="Main">
        <StackChat.Screen 
        name="Main" 
        component={MainChatPage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
        <StackChat.Screen 
        name="Chat" 
        component={ChatPage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
    </StackChat.Navigator>
    )
}

const StackContratos = createStackNavigator()

function StackRoutesContratos(){
    return(
      <StackContratos.Navigator initialRouteName="Main">
        <StackContratos.Screen 
        name="Main" 
        component={MainContratosPage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
        <StackContratos.Screen 
        name="DetalhesContrato" 
        component={DetalhesContrato}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
    </StackContratos.Navigator>
    )
}

const StackPerfil = createStackNavigator()

function StackRoutesPerfil(){
    return(
      <StackPerfil.Navigator initialRouteName="Main">
        <StackPerfil.Screen 
        name="Main" 
        component={MainPerfilPage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
         <StackPerfil.Screen 
        name="Favoritos" 
        component={FavoritosPage}
        options={Object.assign({}, settingsHeader, {headerShown: false})}
        />
    </StackPerfil.Navigator>
    )
}