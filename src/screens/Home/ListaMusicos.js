import { faFile, faMessage } from "@fortawesome/free-solid-svg-icons"
import { settingsTab } from "../../routes"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { endpoints } from "../../services/endpoints"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useEffect, useState } from "react"
import { Get } from "../../services"

export const ListaMusicosPage = ({navigation, route}) =>{
    const pesquisa = route.params.pesquisa
    const [musicos,setMusicos] = useState(null)
    const [load, setLoad] = useState(false)
    const [erro, setErro] = useState(false)

    useEffect(() =>{
        navigation.getParent().setOptions({ tabBarStyle:{display:"none"}})
        const buscar = async () =>{
            await buscarmusicos()
        }
        buscar()

        return () => {
            navigation.getParent().setOptions(settingsTab)
        }
    },[])

    const buscarmusicos = async() =>{
        setErro(false)
        setLoad(true)
        const musicos = await Get(endpoints.listarMusicos , pesquisa)
        if(musicos == false || musicos == undefined){
            setErro(true)
            setLoad(false)
            return
        }
        setMusicos(musicos)
        setLoad(false)
    }

    return(
        <View  style={style.page}>
            {musicos != null ?
                <FlatList
                style={{paddingHorizontal:10, width:"100%"}}
                data={musicos}
                renderItem={({item}) =>
                        <View style={style.boxFuncao}>
                            <Text style={{width:"100%", color:"black", fontWeight:"bold", fontSize:18}}>{item.nomeCompleto}</Text>
                            <View style={{flexDirection:"row", flexWrap:"wrap", gap:5, justifyContent:"flex-start", width:"100%"}}>
                                {item.generos.map((itemGenero, index) =>
                                    <Text key={index} style={{backgroundColor:"#B5B0EC", padding:5, borderRadius:5, fontWeight:"bold", fontSize:15}}>{itemGenero}</Text>  
                                )}
                            </View>

                        </View>
                    }
                />
                :
                <Text style={{fontWeight:"bold", color:"gray", fontSize:22}}>Músicos não encontrados</Text>
            }
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
        width:"100%",
        height:150,
        borderRadius:5,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"flex-start",
        gap:10,
        padding:10,
        marginVertical:10,
        backgroundColor:"white"
    }
})