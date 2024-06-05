import { useEffect, useState } from "react"
import { TouchableOpacity, Image, Text,View, TextInput, StyleSheet,ActivityIndicator, Keyboard, Switch } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faRightToBracket, faUsers } from "@fortawesome/free-solid-svg-icons"
import { endpoints } from "../services/endpoints"
import { Get, Post } from "../services"
import { DADOS_STORAGE, getAsyncStorage, setAsyncStorage } from "../services/AsyncStorage"


export const LoginPage = ({navigation}) =>{
    const [email, setEmail] = useState('samuel@gmail.com')
    const [senha, setSenha] = useState('1234')
    const [erro,setErro] = useState('')
    const [load,setLoad] = useState(false)
    const [tipo, setTipo] = useState(false)
    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)

    useEffect(() =>{
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardOpen(true);
          });
          const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardOpen(false);
          })
          const buscar = async () =>{
            var tipoJson = await getAsyncStorage(DADOS_STORAGE.TIPO_USER)
            if(tipoJson == null) return
            setTipo(tipoJson == "musico" ? true : false)
          }
          buscar()
          return () => {
              keyboardDidShowListener.remove();
              keyboardDidHideListener.remove();
            };
    },[])

    const logar = async () =>{
        setLoad(false)
        var params = {
            "login": email,
            "senha": senha
        }
        if(tipo == true){
            params.login = "maria@example.com",
            params.senha = "senha123"
        }
        var url = tipo == true ? endpoints.loginMusico : endpoints.loginContratante
        const user = await Post(url ,params)
        if(user.error == true){
            setErro(user.message)
            setLoad(false)
            return
        }
        
        const salvarTipo = await setAsyncStorage(DADOS_STORAGE.TIPO_USER, tipo == true ? 'musico' : 'contratante')
        const salvarUser = await setAsyncStorage(DADOS_STORAGE.USER, JSON.stringify(user.user))
        navigation.navigate('Home')
    }
    return(
            <View style={style.page}>
                <Image 
                style={style.logo}
                source={require('../assets/logo_fundo_escuro.png')}
                />
                <View style={{flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10}}>
                    <Text style={{fontWeight:"bold", color:"white"}}>Contratante</Text>
                    <Switch
                        trackColor={{false: 'white', true: 'white'}}
                        thumbColor={tipo ? '#804DEC' : '#40A2E3'}
                        onValueChange={(e) => setTipo(e)}
                        value={tipo}
                    />
                    <Text style={{fontWeight:"bold", color:"white"}}>Músico</Text>
                    </View>
                <TextInput
                style={style.input}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={"white"}
                editable={false}
                />
                <TextInput
                placeholderTextColor={"white"}
                style={style.input}
                secureTextEntry={true}
                onChangeText={setSenha}
                placeholder="Senha"
                editable={false}
                />
                {load == true ?
                    <TouchableOpacity disabled style={style.botaoLogin}>
                        <ActivityIndicator size="small" color="white" />
                    </TouchableOpacity>
                :
                <TouchableOpacity onPress={logar} style={style.botaoLogin}>
                    <Text style={style.textoBotao}>Login</Text>
                    <FontAwesomeIcon icon={faRightToBracket} color="white" size={18} />
                </TouchableOpacity>
                }
                {isKeyboardOpen == false &&(
                    <>
                        {erro != '' &&(
                            <Text style={{color:"red",marginTop:20,fontSize:20}}>{erro}</Text>
                        )}
                        <Text style={{position:"absolute", top:"85%", fontWeight:"bold", color:"white"}}>Versão 1.0</Text>
                    </>
                )}
                <Text style={{marginTop:40, color:"white"}} onPress={() => navigation.navigate('Cadastro')}>ainda não possui conta? Cadastre-se agora</Text>
                </View>
    )
}

const style = StyleSheet.create({
    logo:{
        resizeMode:"stretch",
        height:120,
        width:"40%",
        marginBottom:30
    },
    page:{
        width:"100%",
        height:"100%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#222222"
    },
    botaoLogin:{
        marginTop:40,
        width:"30%",
        backgroundColor:"#804DEC",
        borderRadius:5,
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
        gap:10
        
    },
    textoBotao:{
        fontSize:20,
        color:"white",
        fontWeight:"700",
    },
    input:{
    paddingVertical:5,
    borderBottomColor:"gray",
    borderBottomWidth:1,
    width:"50%",
    fontSize:18,
    color:"white",
    }
})