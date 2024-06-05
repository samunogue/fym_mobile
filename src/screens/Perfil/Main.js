import { useEffect, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { DADOS_STORAGE, getAsyncStorage } from "../../services/AsyncStorage"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faGear, faStar, faUser } from "@fortawesome/free-solid-svg-icons"

export const MainPerfilPage = ({navigation}) =>{
    const [user, setUser] = useState(null)
    
    useEffect(() =>{
        const buscar = async () =>{
            var user = await getAsyncStorage(DADOS_STORAGE.USER)
            var userJson = JSON.parse(user)
            setUser(userJson)
        } 
        buscar()
    },[])
    return(
        <View style={style.page}>
            {user != null &&(
                <>
                <Text style={{fontWeight:"bold", color:"white", fontSize:20}}>{user.nomeCompleto}</Text>
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
    }
})