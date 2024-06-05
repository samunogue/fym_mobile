import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { Modal,View,Image, TouchableOpacity,StyleSheet,Text, ActivityIndicator } from "react-native";

export const ModalAviso = ({titulo,texto, funcaoRecusa, funcaoAceite, load}) =>{
    return(
        <Modal
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={styles.descricao}>{titulo}</Text>
                    <Text style={styles.titulo}>{texto}</Text>
                    <View style={styles.boxBotoes}>
                    {load == true 
                    ?
                    <ActivityIndicator size={"large"} color={"blue"} />
                    :
                    <>
                    {funcaoRecusa != undefined &&(
                        <TouchableOpacity style={styles.botaoRecusa} onPress={funcaoRecusa}>
                            <FontAwesomeIcon icon={faXmark} size={22}  />
                        </TouchableOpacity>
                    )}
                        {funcaoAceite != undefined &&(
                            <TouchableOpacity style={styles.botaoAceite} onPress={funcaoAceite}>
                                <FontAwesomeIcon icon={faCheck} color="white" size={22}  />
                            </TouchableOpacity>
                        )}
                    </>
                    }
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // A semi-transparent black background
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:"center",
        flexDirection:"column",
        gap:20
    },
    boxBotoes:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        gap:20,
    },
    botaoAceite:{
        width:"25%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#0C356A",
        borderRadius:5,
        paddingVertical:10,
    },
    botaoRecusa:{
        width:"25%",
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#C7C7C7",
        borderRadius:5,
        paddingVertical:10,
    },
    textoBotao:{
        color:"white",
        fontSize:18
    },
    titulo:{
        color:"black",
        fontSize:16,
        textAlign:"center"
    },
    descricao:{
        fontSize:20,
        fontWeight:"700",
        color:"#0C356A"
    }
});