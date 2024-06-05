import { ActivityIndicator, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native"
import { Input } from "../components/Input"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons"
import { endpoints } from "../services/endpoints"
import { Post } from "../services"

export const CadastroPage = ({navigation}) =>{
    const [load, setLoad] = useState(false)
    const [tipo, setTipo] = useState(false)
    const [descricao, setDescricao] = useState('')
    const [repetirSenha, setRepetirSenha] = useState(null)
    const [alerta, setAlerta] = useState(null)
    const [forms,setForms] = useState({
        situacao: true,
        nomeCompleto: null,
        CPF: null,
        email: null,
        senha: null,
        telefone: null,
        endereco:{
            cep:null,
            logradouro: null,
            bairro:null,
            estado: null,
            cidade: null,
            numero: null
        }
    })

    const cadastrar = async () =>{
            setLoad(true)
            if(tipo == null) return
            setLoad(true)
            var url = tipo == true ? endpoints.cadastrarMusico : endpoints.cadastrarContratante
            if(tipo == 'musico') forms.descricao = descricao
            const cadastrar = await Post(url , forms)
            console.log(cadastrar)
            if(cadastrar.error == false){
                const salvarTipo = await setAsyncStorage(DADOS_STORAGE.TIPO_USER, tipo == true ? 'musico' : 'contratante')
                const salvarUser = await setAsyncStorage(DADOS_STORAGE.USER, JSON.stringify(cadastrar.user))
                navigation.navigate('Home')
                return
            }
            setAlerta("Não foi possível cadastrar o usuário")
            setLoad(false)
            setTimeout(()=>{
                setAlerta(null)
            },2000)
        }

    return(
        <ScrollView contentContainerStyle={{paddingBottom:100, backgroundColor:"#222222"}}>
        <View style={style.page}>
            <Image 
                style={style.logo}
                source={require('../assets/logo_fundo_escuro.png')}
                />
            <Input theme={"white"} required={true} titulo={"Nome Completo"} tamanho={"full"} funcao={(text) => setForms({...forms, nomeCompleto: text})} />
            <Input theme={"white"} required={true} titulo={"Email"} tamanho={"full"} funcao={(text) => setForms({...forms, email: text})} />
            <Input theme={"white"} required={true} titulo={"Telefone"} tamanho={"full"} funcao={(text) => setForms({...forms, telefone: text})} />
            <Input theme={"white"} required={true} titulo={"CPF"} tamanho={"full"} funcao={(text) => setForms({...forms, CPF: text})} />
            <Input theme={"white"} required={true} titulo={"Senha"} tamanho={"full"} funcao={(text) => setForms({...forms, senha: text})} type={"password"}/>
            <Input theme={"white"} required={true} titulo={"Repetir Senha"} tamanho={"full"} funcao={(text) => setRepetirSenha(text)} type={"password"} />
            <Input theme={"white"} required={true} titulo={"CEP"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, cep: text}})} />
            <Input theme={"white"} required={true} titulo={"Logradouro"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, logradouro: text}})} />
            <Input theme={"white"} required={true} titulo={"Número"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, numero: text}})} />
            <Input theme={"white"} required={true} titulo={"Bairro"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, bairro: text}})} />
            <Input theme={"white"} required={true} titulo={"Estado"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, estado: text}})} />
            <Input theme={"white"} required={true} titulo={"Cidade"} tamanho={"full"} funcao={(text) => setForms({...forms, endereco: {...forms.endereco, cidade: text}})} />
            <View style={{flexDirection:"row", width:"100%", alignItems:"center", justifyContent:"center", gap:10 }}>
                <Text style={{color:"white", fontWeight:"bold",fontSize:20}}>Contratante</Text>
            <Switch
                    trackColor={{false: '#767577', true: '#81b0ff'}}
                    thumbColor={tipo ? '#f5dd4b' : '#f4f3f4'}
                    onValueChange={(e) => setTipo(e)}
                    value={tipo}
                />
                <Text style={{color:"white", fontWeight:"bold",fontSize:20}}>Músico</Text>
            </View>
            {tipo == true &&(
                <Input theme={"white"} required={true} titulo={"Descrição"} tamanho={"full"} multiline={true} funcao={(text) => setDescricao(text)} />
            )}
        </View>
        {alerta != null &&(
            <Text style={{color:"red", fontWeight:"bold", marginLeft:"20%"}}>{alerta}</Text>
        )}
        <TouchableOpacity onPress={cadastrar} style={style.botaoLogin}>
                    {load == true 
                    ?
                    <ActivityIndicator size={"small"} color={"white"} />
                    :
                    <>
                    <Text style={style.textoBotao}>Cadastrar</Text>
                    <FontAwesomeIcon icon={faRightToBracket} color="white" size={18} />
                    </>
                    }
                </TouchableOpacity>
        </ScrollView>
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
        backgroundColor:"#222222",
        paddingHorizontal:15,
        gap:15
    },
    botaoLogin:{
        marginTop:40,
        width:"40%",
        marginLeft:"30%",
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