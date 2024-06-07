import { useEffect, useState } from "react"
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { settingsTab } from "../../routes"
import { Input } from "../../components/Input"
import { formatarData } from "../../utils"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCheck, faFilePen, faX } from "@fortawesome/free-solid-svg-icons"
import { Get, Post } from "../../services"
import { endpoints } from "../../services/endpoints"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"

export const DetalhesContrato = ({navigation, route, atualizarContratos}) =>{
    const {contratoJson, tipo} = route.params
    const [contrato, setContrato] = useState(null)
    const [user, setUser] = useState(null)
    const [modalContrato, setModalContrato] = useState(false) 
    const [modalAvaliacao, setModalAvaliacao] = useState(false)
    const [avaliacao, setAvaliacao] = useState('')
    const [alerta, setAlerta] = useState(null)
    const [load, setLoad] = useState(false)

    useEffect(() =>{
        navigation.getParent().setOptions({ tabBarStyle:{display:"none"}})
        const buscar = async () =>{
            var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            var url = tipo == 'musico' ? endpoints.listarMusicos : endpoints.buscarContratante
            var userAtualizado = await Get(url, {id: userJson._id})
            setUser(userAtualizado)
            var contratoFIltrado = userAtualizado.contratos.filter((item) => item.codigo == contratoJson.codigo)
            setContrato(contratoFIltrado[0])
        } 
        buscar()
        return () => {
            navigation.getParent().setOptions(settingsTab)
        }
    },[])

    const responderContrato = async (resposta) =>{
        const body = {
            cpfMusico: contrato.musico.cpf,
            cpfContratante: contrato.contratante.cpf,
            idContrato: contrato.codigo,
            resposta: resposta
        }
        const responder = await Post(endpoints.responderContrato, body)
        if(responder.error == true){
            setErro(user.message)
            setLoad(false)
            return
        }
        var contratoFIltrado = responder.user.contratos.filter((item) => item.codigo == contrato.codigo)
        setContrato(contratoFIltrado[0])
        
    }   

    const avaliarContrato = async (resposta) =>{
        setLoad(true)
        const url = endpoints.avaliarMusico
        const body = {
            "avaliacao":{
                "nome": user.nomeCompleto,
                "mensagem":avaliacao.mensagem,
                "nota": avaliacao.nota
            },
            "idMusico": contrato.musico.id
        }
        const responder = await Post(url, body)
        if(responder.error == false){
            setLoad(false)
            setModalAvaliacao(false)
            setAlerta("Avaliação realizada")
            setTimeout(()=>{
                
                setAlerta(null)
            },2000)
            return
        }
        setAlerta("Não foi possível realizar a avaliação")
        setLoad(false)
        setTimeout(()=>{
            setAlerta(null)
        },2000)
        
    }

    return(
        <View style={style.page}>
            {modalContrato == true &&(
                <Modal
                animationType="fade"
                transparent={true}
                >
                    <View style={style.modalBackground}>
                        <View style={style.modalContent}>
                            <TouchableOpacity onPress={() => responderContrato('true')} style={{width:"100%", borderRadius:5,backgroundColor:"green", alignItems:"center",justifyContent:"space-around", flexDirection:"row", padding:10}}>
                                <Text style={{fontWeight:"bold", color:"white", fontSize:18}}>Aceitar</Text>
                                <FontAwesomeIcon icon={faCheck} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => responderContrato('false')} style={{width:"100%", borderRadius:5,backgroundColor:"red", alignItems:"center",justifyContent:"space-around", flexDirection:"row", padding:10}}>
                                <Text style={{fontWeight:"bold", color:"white", fontSize:18}}>Recusar</Text>
                                <FontAwesomeIcon icon={faX} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalContrato(false)} style={{width:"100%", borderRadius:5,backgroundColor:"gray", alignItems:"center",justifyContent:"space-around", flexDirection:"row", padding:10}}>
                                <Text style={{fontWeight:"bold", color:"white", fontSize:18}}>Voltar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
            {contrato != null &&(
                <>
                <Text style={{width:"100%", color:"white", fontWeight:"bold", fontSize:20}}>Status</Text>
                <Text style={{width:"100%", color:"white", fontWeight:"bold", borderRadius:5, padding:10, backgroundColor: contrato.status == 'ACEITO' ? "#16FF00" : contrato.status == "PENDENTE" ? "#F2BE22" : "#FF1E00"}}>{contrato.status}</Text>
                <Input theme={"white"} tamanho={"full"} valor={contrato.codigo} titulo={"Código"} editable={false} />
                <Input theme={"white"} tamanho={"medio"} valor={contrato.dataEvento} titulo={"Data"} editable={false} multiline={true} />
                <Input theme={"white"} tamanho={"medio"} valor={`R$ ${contrato.valor}`} titulo={"Valor"} editable={false} multiline={true} />
                <Input theme={"white"} tamanho={"full"} valor={contrato.termo} titulo={"Termo"} editable={false} multiline={true} />
                {tipo == 'musico' &&(
                    <TouchableOpacity onPress={() => setModalContrato(true)} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC", marginTop:20}}>
                        <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Responder Contrato</Text>
                        <FontAwesomeIcon icon={faFilePen} size={22} color="white" />
                    </TouchableOpacity>
                )}
                    </>
                )}
                {tipo == 'contratante' && contrato != null &&contrato.status == "ACEITO" &&(
                    <TouchableOpacity onPress={() => setModalAvaliacao(true)} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC", marginTop:20}}>
                        <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Avaliar Músico</Text>
                        <FontAwesomeIcon icon={faFilePen} size={22} color="white" />
                    </TouchableOpacity>
                )}
                {modalAvaliacao == true &&(
                    <Modal
                    animationType="fade"
                    transparent={true}
                    >
                        <View style={style.modalBackground}>
                            <View style={style.modalContent}>
                                <Input theme={"black"} tamanho={"full"} titulo={"Comentário"} funcao={(text) => setAvaliacao({...avaliacao,mensagem:text})} />
                                <Input theme={"black"} tamanho={"full"} titulo={"Nota"} funcao={(text) => setAvaliacao({...avaliacao,nota:text})}  />
                                <TouchableOpacity onPress={avaliarContrato} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC", marginTop:20}}>
                                    {load == true 
                                    ?
                                        <ActivityIndicator color={"white"} size={"small"} />
                                    :
                                    <>
                                        <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Avaliar</Text>
                                        <FontAwesomeIcon icon={faFilePen} size={22} color="white" />
                                    </>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
        </View>
    )
}

const style = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        flexDirection:"row",
        flexWrap:"wrap",
        alignItems:"center",
        justifyContent:"space-between",
        gap:5,
        paddingTop:30,
        backgroundColor:"#222222",
        paddingHorizontal:15,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // A semi-transparent black background
    },
    modalContent: {
        width:"60%",
        paddingVertical:20,
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        gap:20
    }
})