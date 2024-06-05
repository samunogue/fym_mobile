import { faArrowLeft, faArrowRight, faFilePen, faMessage, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Modal, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel'

const { width } = Dimensions.get("window");

export const ModalMusico = ({musico, fecharModal, funcaoChat}) =>{
    return (
        <Modal
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text style={{color:"#804DEC", fontWeight:"bold", fontSize:24 ,textAlign:"start", width:"100%",margin:15,marginTop:20}}>{musico.nomeCompleto}</Text>
                    <View style={{flexDirection:"row", flexWrap:"wrap", gap:5, justifyContent:"flex-start", width:"100%"}}>
                        {musico.generos.map((item, index) =>
                            <Text key={index} style={{backgroundColor:"#B5B0EC", padding:5, borderRadius:5, fontWeight:"bold", fontSize:15}}>{item}</Text>  
                        )}
                    </View>
                    <Text style={{marginHorizontal:5, marginVertical:10, fontSize:20}}>{musico.descricao}</Text>

                    {musico.avaliacoes.length > 0 &&(
                        <View style={{height:100, marginVertical:30}}>
                            <Carousel
                            loop
                            style={{ width:"90%", height:100, margin:0}}
                            data={musico.avaliacoes}
                            renderItem={({item,index}) => (
                                <View key={index} style={{height: 100, backgroundColor:"#F6F1E9", paddingVertical:10, justifyContent:"space-between"}}>
                                    <Text style={{padding:5, borderRadius:5, fontWeight:"700", fontSize:16,color:"#804DEC"}}>{item.mensagem}</Text> 
                                    <Text style={{padding:5, borderRadius:5, fontSize:14}}>- {item.nome}</Text>  
                                </View>
                            )}
                            sliderWidth={340}
                            itemWidth={250}
                            sliderHeight={100}
                            itemHeight={100}
                            />
                        </View>
                        )}
                    <View style={{flexDirection:"row", width:"100%",gap:10, alignItems:"center", justifyContent:"center", marginTop:"auto",paddingBottom:20}}>
                        <TouchableOpacity onPress={fecharModal} style={{width:"100%",padding:10, backgroundColor:"red", borderRadius:10, justifyContent:"center", alignItems:"center", height:50}}>
                            <FontAwesomeIcon icon={faX} color='white' size={18}/>
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
        paddingHorizontal: 10,
        alignItems: 'center',
    }
});