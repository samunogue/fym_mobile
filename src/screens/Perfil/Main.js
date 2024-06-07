import { useEffect, useState } from "react"
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faFilePen, faGear, faStar, faUser } from "@fortawesome/free-solid-svg-icons"
import { Input } from "../../components/Input"
import { endpoints } from "../../services/endpoints"
import { Post } from "../../services"

export const MainPerfilPage = ({navigation}) =>{
    const [user, setUser] = useState(null)
    const [novoGenero, setNovoGenero] = useState('')
    const [modal, setModal] = useState(false)
    const [load, setLoad] = useState(false)
    
    useEffect(() =>{
        const buscar = async () =>{
            var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            setUser(userJson)
        } 
        buscar()
    },[])

    const adicionarGenero = async () =>{
        if(novoGenero == '' || novoGenero == undefined) return
        var url = user.hasOwnProperty('descricao') ? endpoints.adicionarGeneroMusico : endpoints.adicionarGeneroContratante
        const body ={
        "cpf":user.CPF,
        "genero":novoGenero
        }
        var adicionar = await Post(url,body)    
        setNovoGenero('')   
        setUser(adicionar.user) 
        setModal(false)
    }

    return(
        <View style={style.page}>
            {user != null &&(
                <>
                {modal == true &&(
                    <Modal
                    animationType="fade"
                    transparent={true}
                    >
                        <View style={style.modalBackground}>
                            <View style={style.modalContent}>
                                <Input theme={"black"} tamanho={"full"} titulo={"Genêro"} funcao={(text) => setNovoGenero(text)} />
                                <TouchableOpacity onPress={adicionarGenero} style={{width:"100%", flexDirection:"row", alignItems:"center", justifyContent:"center", gap:10, paddingVertical:15, borderRadius:10, backgroundColor:"#804DEC", marginTop:20}}>
                                    {load == true 
                                    ?
                                        <ActivityIndicator color={"white"} size={"small"} />
                                    :
                                    <>
                                        <Text style={{color:"white", fontWeight:"bold", fontSize:18}}>Adicionar</Text>
                                        <FontAwesomeIcon icon={faFilePen} size={22} color="white" />
                                    </>
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                )}
                <Text style={{fontWeight:"bold", color:"white", fontSize:20}}>{user.nomeCompleto}</Text>
                <TouchableOpacity onPress={() => setModal(true)} style={{width:"90%", borderRadius:5,backgroundColor:"gray", alignItems:"center",justifyContent:"space-around", flexDirection:"row", padding:10}}>
                    <Text style={{fontWeight:"bold", color:"white", fontSize:18}}>Adicionar Gênero</Text>
                </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const style = StyleSheet.create({
    page:{
        width:"100%",
        height:"100%",
        alignItems:"center",
        paddingTop:30,
        justifyContent:"flex-start",
        backgroundColor:"#222222",
        gap:10
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