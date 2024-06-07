import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { formatarData } from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faFileInvoice, faMicrophone, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"
import { ModalContrato } from "../../components/ModalContrato"
import { Get } from "../../services"
import { endpoints } from "../../services/endpoints"

export const MainContratosPage = ({navigation}) =>{
    const [user, setUser] = useState(null)
    const [tipo, setTipo] = useState(null)
    const [contratos,setContratos] = useState([])
    const [modalContrato, setModalContrato] = useState(null)
    
    useEffect(() =>{
        const buscar = async () =>{
            var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            var tipo = await getAsyncStorage(DADOS_STORAGE.TIPO_USER)
            if(userJson.contratos.length == 0){
                setTipo(tipo)
                setContratos([])
                setUser(userJson)
                return
            }
            var userAtualizado = await Get(endpoints.buscarContratante, {id: userJson._id})
            setTipo(tipo)
            setUser(userAtualizado)
            setContratos(userJson.contratos)
        } 
        buscar()
    },[])

    return(
        <View style={style.page}>
        <ScrollView style={{height:"50%", width:"100%"}}>
            <Text style={{fontWeight:"bold", color:"white", fontSize:26, marginRight:"auto", marginLeft:20}}>Contratos</Text>
            {modalContrato != null && user != null &&(
                <ModalContrato user={user} fecharModal={() => setModalContrato(null)} contratos={contratos} setContratos={setContratos}/>
            )}
            {tipo == 'contratante' &&(
                <TouchableOpacity onPress={() => setModalContrato(true)} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC"}}>
                    <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Cadastrar Contrato</Text>
                    <FontAwesomeIcon icon={faFileInvoice} size={22} color="white" />
                </TouchableOpacity>
            )}
            {contratos.length == 0
            ?
            null
            :
            contratos.map(item =>
                <TouchableOpacity style={style.box} key={item.codigo} onPress={() => navigation.navigate('DetalhesContrato',{ contratoJson: item, tipo: tipo})}>
                    <Text style={{fontWeight:"bold", color:"#804DEC"}}>{item.codigo}</Text>
                    <Text style={{fontWeight:"bold"}}>{item.dataEvento}</Text>
                    <Text style={{fontWeight:"bold"}}><FontAwesomeIcon icon={faMicrophone} color="#3E54AC" />  {item.contratante.nome}</Text>
                    <Text style={{fontWeight:"bold"}}><FontAwesomeIcon icon={faUser}       color="#3E54AC" />  {item.musico.nome}</Text>
                </TouchableOpacity>
                )
            }
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
        paddingTop:30,
        backgroundColor:"#222222",
        paddingHorizontal:15,
        paddingBottom:100,
        gap:10
    },
    box:{
        margin:5,
        borderRadius:10,
        marginTop:5,
        width:"100%",
        paddingVertical:10,
        flexDirection:"column",
        alignItems:"flex-start",
        gap:5,
        paddingLeft:15,
        justifyContent:"center",
        backgroundColor:"white"
    }
})