import { faArrowLeft, faArrowRight, faFilePen, faMagnifyingGlass, faMessage, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Modal, ActivityIndicator, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel'
import { Input } from './Input';
import { Get, Post } from '../services';
import { endpoints } from '../services/endpoints';

const { width } = Dimensions.get("window");

export const ModalChat = ({user, fecharModal, buscarDados, setConversas}) =>{
    const [pesquisa, setPesquisa] = useState('')
    const [musicos, setMusicos] = useState(null)
    const [load, setLoad] = useState(false)
    const [loadCadastro, setLoadCadastro] = useState(false)
    const [contrato, setContrato] = useState({
        cpfMusico: '',
        cpfContratante: user.CPF,
    })
    const buscarMusicos = async () =>{
        if(pesquisa == '') return
        setLoad(true)
        const musicos = await Get(endpoints.listarMusicos,{ nome: pesquisa})
        setMusicos(musicos.slice(0,9))
        setLoad(false)
    }

    const cadastrarContrato = async () =>{
        setLoadCadastro(true)
        console.log(contrato)
        const contratoJson = {
            idUserDestinatario: contrato.cpfMusico._id,
            idUserRemetente: user._id,
            tipoRemetente: user.hasOwnProperty('descricao') == true ? 'musico' : 'contratante',
            tipoDestinatario: contrato.cpfMusico.hasOwnProperty('descricao') == true ? 'musico' : 'contratante'
        }
        const cadastrar = await Post(endpoints.criarConversa, contratoJson)
        const dados = await buscarDados()
        setConversas(dados)
        setLoadCadastro(false)
        fecharModal()
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <ScrollView contentContainerStyle={{paddingBottom:100}}>
                    {contrato.cpfMusico == undefined || contrato.cpfMusico == '' 
                    ?
                    <View style={{width:"100%", flexDirection:"row", alignItems:"flex-start", justifyContent:"center", flexWrap:"wrap"}}>
                        <Input theme={"black"} titulo={"Contratante"} tamanho={"full"} editable={false} placeholder={user.nomeCompleto}/>
                        <Input theme={"black"} titulo={"Músico"} tamanho={"full"} placeholder={"Nome Musico"} funcao={(text) => setPesquisa(text)}/>
                        <TouchableOpacity disabled={load} onPress={buscarMusicos} style={{width:"50%", borderRadius:5,backgroundColor:"#804DEC", alignItems:"center",justifyContent:"center", gap:10,padding:10,marginTop:10, flexDirection:"row"}}>
                            {load == true 
                            ?
                            <ActivityIndicator color={'white'} />
                            :
                            <>
                            <Text style={{color:"white", fontWeight:"bold"}}>Pesquisar</Text>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size={14} color='white' />
                            </>
                            }
                        </TouchableOpacity>
                        <View style={{width:"100%", alignItems:"center", flexDirection:"column", paddingTop:20, gap:10}}>
                        {musicos != null &&(
                            musicos.map((item, index) =>
                            <TouchableOpacity key={index} style={{width:"100%" ,backgroundColor:"#F4EAD5", borderRadius:5, padding:8}} onPress={() => setContrato({...contrato, cpfMusico:item})}>
                                <Text style={{fontWeight:"bold", color:"#3E54AC", fontSize:17}}>{item.nomeCompleto}</Text>
                            </TouchableOpacity>
                            )
                        )}
                        </View>
                    </View>
                    :
                    <View style={{width:"100%", flexDirection:"row", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap"}}>
                        <Input theme={"black"} titulo={"Contratante"} tamanho={"full"} editable={false} placeholder={user.nomeCompleto}/> 
                        <Input theme={"black"} titulo={"Músico"} tamanho={"full"} placeholder={contrato.cpfMusico.nomeCompleto} editable={false} />
                    </View>}
                    </ScrollView>
                    <View style={{flexDirection:"row", width:"100%",gap:10, alignItems:"center", justifyContent:"center", marginTop:"auto",paddingBottom:20}}>
                        <TouchableOpacity onPress={fecharModal} style={{width:"35%",padding:10, backgroundColor:"red", borderRadius:10, justifyContent:"center", alignItems:"center", height:50}}>
                            <FontAwesomeIcon icon={faX} color='white' size={18}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={cadastrarContrato} style={{width:"60%",padding:10, backgroundColor:"#16FF00", borderRadius:10, justifyContent:"center", alignItems:"center", height:50}}>
                            {loadCadastro == true 
                            ?
                            <ActivityIndicator size={"small"} color={"white"} />
                            :
                            <FontAwesomeIcon icon={faMessage} color='white' size={20}/>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // A semi-transparent black background
    },
    modalContent: {
        width:"90%",
        height:"90%",
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingTop:20,
        alignItems: 'center',
    }
});