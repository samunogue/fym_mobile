import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"
import { Get } from "../../services"
import { endpoints } from "../../services/endpoints"
import { faFileInvoice, faMessage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { ModalChat } from "../../components/ModalChat"

export const MainChatPage = ({navigation,route}) =>{
    const params = route.params
    const [modalChat, setModalChat] = useState(null)
    const [user, setUser] = useState({})
    const [conversas, setConversas] = useState(null)

    useEffect(() =>{
        const buscar = async () =>{
            await buscarDados()
        } 
        buscar()
    },[])

    const buscarDados = async () =>{
        var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            setUser(userJson)
            var conversasJson = await Get(endpoints.buscarConversas, {id: userJson._id})
            console.log(conversasJson)
            if(conversasJson == undefined || conversasJson == false || conversasJson.error == true){
                setConversas(null)
                return
            }
            setConversas(conversasJson)
    }

    return(
        <View style={style.page}>
            <ScrollView style={{height:"80%", width:"100%",}}>
            {modalChat != null &&(
                <ModalChat user={user} buscarDados={buscarDados} setConversas={setConversas} fecharModal={() => setModalChat(null)} />
            )}
            <Text style={{fontWeight:"bold", color:"white", fontSize:26, marginRight:"auto", marginLeft:20}}>Conversas</Text>
            {conversas != null && (
            conversas.map((item, index) =>
            <TouchableOpacity onPress={() => navigation.navigate('Chat',{ conversa:item})} key={index} style={{backgroundColor:"white", borderRadius:5, padding:15,width:"95%", margin:10}}>
                <Text>{user.nomeCompleto == item.nomesUsuario[0] ? item.nomesUsuario[1] : item.nomesUsuario[0]}</Text>
            </TouchableOpacity>    
            )
            )}
            {user.hasOwnProperty('descricao') == false &&(
                <TouchableOpacity onPress={() => setModalChat(true)} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC"}}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Iniciar Conversa</Text>
                    <FontAwesomeIcon icon={faMessage} size={22} color="white" />
                </TouchableOpacity>
            )}
            </ScrollView>
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
        paddingTop:60,
        gap:10
    }
})