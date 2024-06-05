import { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { Get } from "../../services"
import { endpoints } from "../../services/endpoints"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCompactDisc, faDrum, faFile, faGuitar, faMagnifyingGlass, faMessage, faRecordVinyl } from "@fortawesome/free-solid-svg-icons"
import { ModalMusico } from "../../components/ModalMusico"

export const HomePage = ({navigation}) =>{
    const [musicos, setMusicos] = useState(null)
    const [modalMusico, setModalMusico] = useState(null)
    const [valorPesquisa, setPesquisa] = useState('')

    useEffect(() =>{
        const buscar = async () =>{
            await buscarMusicos()
        }
        buscar()
    },[])

    const buscarMusicos = async () =>{
        const musicos = await Get(endpoints.listarMusicos, null)
        setMusicos(musicos)
    }

    return(
    <View style={style.page}>
        {modalMusico != null &&(
            <ModalMusico musico={modalMusico} fecharModal={() => setModalMusico(null)} funcaoChat={() =>{setModalMusico(null); navigation.navigate('ChatMain',{ iniciarConversa: modalMusico})}} />
        )}
        <View style={style.box_input} >
                <TextInput value={valorPesquisa} onChangeText={(text) => setPesquisa(text)} style={style.input} placeholder="Digite o nome do músico"></TextInput>
                <TouchableOpacity style={style.botao} onPress={valorPesquisa == '' ? null : () => navigation.navigate('ListaMusicos',{pesquisa:{nome:valorPesquisa}})}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size={24} color="white"/>
                </TouchableOpacity>
            </View>
        <View style={{width:"100%", flexDirection:"row", flexWrap:"wrap", paddingHorizontal:15, alignItems:"center",justifyContent:"center", gap:10, marginTop:30}}>
            <TouchableOpacity style={style.boxGenero} onPress={() => navigation.navigate('ListaMusicos',{pesquisa:{genero:'Pop'}})} >
                <Text style={{fontWeight:"bold", fontSize:17}}>Pop</Text>
                <FontAwesomeIcon icon={faCompactDisc} />
            </TouchableOpacity>
            <TouchableOpacity style={style.boxGenero} onPress={() => navigation.navigate('ListaMusicos',{pesquisa:{genero:'Sertanejo'}})}>
                <Text style={{fontWeight:"bold", fontSize:17}}>Sertanejo</Text>
                <FontAwesomeIcon icon={faGuitar} />
            </TouchableOpacity>
            <TouchableOpacity style={style.boxGenero} onPress={() => navigation.navigate('ListaMusicos',{pesquisa:{genero:'Pagode'}})}>
                <Text style={{fontWeight:"bold", fontSize:17}}>Pagode</Text>
                <FontAwesomeIcon icon={faDrum} />
            </TouchableOpacity>
            <TouchableOpacity style={style.boxGenero} onPress={() => navigation.navigate('ListaMusicos',{pesquisa:{genero:'Rock'}})}>
                <Text style={{fontWeight:"bold", fontSize:17}}>Rock</Text>
                <FontAwesomeIcon icon={faRecordVinyl} />
            </TouchableOpacity>
        </View>
        {musicos != null &&(
            <>
            <Text style={{width:"100%", paddingLeft:30, fontSize:22, fontWeight:"bold",color:"white", marginTop:20}}>Melhores Avaliações</Text>
            <FlatList
            scr
            horizontal={true}
            data={musicos}
            renderItem={({item}) =>
            <TouchableOpacity key={item.id} onPress={() => setModalMusico(item)} >
                <View style={style.boxFuncao}>
                    <Text style={{width:"100%", color:"black", fontWeight:"bold", fontSize:18}}>{item.nomeCompleto}</Text>
                    <View style={{flexDirection:"row", flexWrap:"wrap", gap:5, justifyContent:"flex-start", width:"100%"}}>
                        {item.generos.map((item, index) =>
                            <Text key={index} style={{backgroundColor:"#B5B0EC", padding:5, borderRadius:5, fontWeight:"bold", fontSize:15}}>{item}</Text>  
                        )}
                    </View>
                </View>
            </TouchableOpacity>
            }
            />
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
        justifyContent:"center",
        backgroundColor:"#222222",
        gap:10
    },
    boxFuncao:{
        width:250,
        height:150,
        borderRadius:5,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        gap:10,
        padding:10,
        margin:10,
        backgroundColor:"white"
    },
    boxGenero:{
        width:"47%",
        height:50,
        borderRadius:10,
        backgroundColor:"white",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:10
    },
    box_input:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        gap:15,
        marginBottom:15,
        justifyContent:"center",
        marginTop:25
    },
    input:{
        width:"75%",
        backgroundColor:"white",
        borderRadius:10,
        paddingLeft:10
    },
    botao:{
        backgroundColor:"#804DEC",
        padding:12,
        borderRadius:10,
        alignItems:"center",
        justifyContent:"center"
    }
})