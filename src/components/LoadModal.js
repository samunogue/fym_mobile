import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, Modal, ActivityIndicator } from 'react-native';

const iconLoad = require('../assets/logo_vertical.png');

export const LoadModal = ({ visible }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Image style={styles.iconeLoad} source={iconLoad} />
                    <ActivityIndicator size="large" color="#0F3692" />
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
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        gap:20
    },
    iconeLoad: {
        height: 100,
        width: 100,
        resizeMode: 'stretch',
    },
});