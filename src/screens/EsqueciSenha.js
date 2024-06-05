import { useEffect, useState } from "react"
import { TouchableOpacity, Image, Text,View, TextInput, StyleSheet,ActivityIndicator, Keyboard } from "react-native"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPen, faRightToBracket, faUsers } from "@fortawesome/free-solid-svg-icons"
import { endpoints } from "../services/endpoints"
import { Get, Post } from "../services"
import { DADOS_STORAGE, setAsyncStorage } from "../services/AsyncStorage"

export const EsqueciSenhaPage = ({navigation}) =>{
    const [CPF, setCPF] = useState('samuel@gmail.com')
    const [senha, setSenha] = useState('')
    const [repetirSenha, setRepetirSenha] = useState('')
    const [erro,setErro] = useState('')
    const [load,setLoad] = useState(false)

    const logar = async () =>{
        var params = {
            "login": CPF,
            "senha": senha
        }
        const user = await Post(endpoints.loginContratante,params)
        if(user.error == true){
            setErro(user.message)
            setLoad(false)
            return
        }
        const salvarUser = await setAsyncStorage(DADOS_STORAGE.USER, JSON.stringify(user.user))
        navigation.navigate('Home')
    }
    return(
            <View style={style.page}>
                <Image 
                style={style.logo}
                source={require('../assets/logo_fundo_escuro.png')}
                />
                <TextInput
                style={style.input}
                onChangeText={setCPF}
                placeholder="CPF"
                placeholderTextColor={"white"}
                />
                <TextInput
                placeholderTextColor={"white"}
                style={style.input}
                secureTextEntry={true}
                onChangeText={setSenha}
                placeholder="Senha"
                />
                <TextInput
                placeholderTextColor={"white"}
                style={style.input}
                secureTextEntry={true}
                onChangeText={setRepetirSenha}
                placeholder="Repetir Senha"
                />
                {load == true ?
                    <TouchableOpacity disabled style={style.botaoLogin}>
                        <ActivityIndicator size="small" color="white" />
                    </TouchableOpacity>
                :
                <TouchableOpacity onPress={logar} style={style.botaoLogin}>
                    <Text style={style.textoBotao}>Redefinir Senha</Text>
                    <FontAwesomeIcon icon={faPen} color="white" size={18} />
                </TouchableOpacity>
                }
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
        width:"50%",
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