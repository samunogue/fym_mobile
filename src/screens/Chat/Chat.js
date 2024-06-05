import { useEffect, useState } from "react"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { settingsTab } from "../../routes"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"
import { Get, Post } from "../../services"
import { endpoints } from "../../services/endpoints"
import { Input } from "../../components/Input"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons"

export const ChatPage = ({route, navigation}) =>{
    const [user, setUser] = useState(null)
    const [tipoUser, setTipoUser] = useState(null)
    const [destinatario, setDestinatario] = useState(null)
    const [conversa,setConversa] = useState(null)
    const [alerta, setAlerta] = useState(null)
    const [input, setInput] = useState('')

    useEffect(() =>{
        navigation.getParent().setOptions({ tabBarStyle:{display:"none"}})
        const buscar = async () =>{
            var conversaParam = route.params.conversa
            var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            var conversasJson = await Get(endpoints.buscarConversas, {id: userJson._id})
            var conversasFiltradas = conversasJson.filter((item) => item._id == route.params.conversa._id)
            if(userJson.hasOwnProperty('descricao') == false){
                setTipoUser('contratante')
                var id = conversaParam.usuarios.filter((item) => item != userJson._id )
                const buscarUser = await Get(endpoints.listarMusicos,{id: id[0]})
                setDestinatario(buscarUser)
            }else{
                setTipoUser('musico')
                var id = conversaParam.usuarios.filter((item) => item != userJson._id )
                const buscarUser = await Get(endpoints.buscarContratante,{id: id[0]})
                setDestinatario(buscarUser)
            }
            setConversa(conversasFiltradas[0])
            setUser(userJson)
        } 
        buscar()
        return () => {
            navigation.getParent().setOptions(settingsTab)
        }
    },[])
    const enviarMensagem = async () =>{
        if(input == '') return
        const body = {
            idUserRemetente : user._id,
            tipoRemetente: tipoUser,
            idUserDestinatario: destinatario._id,
            tipoDestinatario: tipoUser == "musico" ? "contratante" : "musico",
            mensagem: input
        }
        const enviar = await Post(endpoints.enviarMensagem, body)
        if(enviar == undefined || enviar == false || enviar.error == true){
            setInput
            setAlerta("Não foi possível enviar a mensagem")
            return
        }
        setInput('')
        setConversa(enviar.conversa)
    }
    return(
        <View style={style.page}>
            {user != null && conversa != null && destinatario != null &&(
                <View style={{width:"100%", gap:8}}> 
                <Text style={{width:"100%", backgroundColor:"white", padding:15,borderRadius:5, fontWeight:"bold", fontSize:18}}>{destinatario.nomeCompleto}</Text>
                {conversa.mensagens.map((item,index) =>
                    item.user == user._id
                    ?
                    <Text key={index}  style={style.mensagemRemetente} >{item.texto}</Text>  
                    :
                    <Text key={index}  style={style.mensagemDestino}>{item.texto}</Text>  
                )}
                </View>
            )}
            <View style={{width:"100%", marginTop:"auto", marginBottom:20 ,flexDirection:"row", alignItems:"center", justifyContent:"space-between", paddingHorizontal:20}}>
                <TextInput value={input} onChangeText={(text) => setInput(text)} placeholder="Mensagem" style={{backgroundColor:"white", width:"80%", borderRadius:5}} />
                <TouchableOpacity onPress={enviarMensagem} style={{width:"15%", backgroundColor:"#804DEC", borderRadius:5, height:"100%", alignItems:"center", paddingTop:"4%"}}>
                    <FontAwesomeIcon icon={faPaperPlane} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        alignItems:"center",
        justifyContent:"flex-start",
        backgroundColor:"#222222",
        paddingTop:20,
        gap:10
    },
    mensagemRemetente:{
        backgroundColor:"#804DEC",
        marginLeft:"auto",
        marginRight:20,
        padding:10,
        borderRadius:10,
        color:"white",
        fontSize:17,
        fontWeight:"bold"
    },
    mensagemDestino:{
        backgroundColor:"white",
        marginRight:"auto",
        marginLeft:20,
        padding:10,
        borderRadius:10,
        color:"black",
        fontSize:17,
        fontWeight:"bold"
    }
})