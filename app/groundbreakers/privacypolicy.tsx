import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function GroundbreakersPrivacyPolicy() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                GROUNDBREAKERS does not collect your data.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    text: {
        fontSize: 24,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'monospace', // Giving it a raw/plaintext feel
    },
});
