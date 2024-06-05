import { View,Text,TextInput,StyleSheet } from "react-native";
export const Input = ({titulo,valor,editable,tamanho,placeholder,funcao, multiline, required, theme}) =>{
    var tamanho_filtrado = ""
    if(tamanho == "full") tamanho_filtrado = "100%";
    if(tamanho == "medio") tamanho_filtrado = "48%";
    if(tamanho == "pequeno") tamanho_filtrado = "35%"
    return(
        <View style={[style.boxInput, {width:tamanho_filtrado}]}>
            <Text style={[style.titulo, {color:theme}]}>{titulo+" "}{required == true ? <Text style={style.required}>*</Text> : ""}</Text>
            <TextInput multiline={multiline} value={valor} style={[style.input, {width:"100%", color:theme, borderColor:theme}]} onChangeText={funcao} placeholder={placeholder} editable={editable}></TextInput>
        </View>
    )
}
const style = StyleSheet.create({
    boxInput:{
        display:"flex",
        alignItems:"flex-start",
        justifyContent:"flex-start",
        gap:5,
    },
    titulo:{
        fontSize:16,
        fontWeight:"600",
    },
    required:{
        color:"red",
    },
    input:{
        borderRadius: 5,
        borderStyle:"solid",
        borderBottomWidth: 1,
        fontSize: 15,
        paddingLeft:5,
        paddingVertical:5,
    }
})