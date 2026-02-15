import React from 'react';
import { Linking, StyleSheet, Text, View } from 'react-native';

export default function GroundbreakersPrivacyPolicy() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                GROUNDBREAKERS does not collect your personal data.
                {'\n\n'}
                We use Google AdMob for advertising. AdMob may collect information such as:
                {'\n'}- IP Address
                {'\n'}- Device Identifiers
                {'\n'}- Performance Data
                {'\n'}- Interaction Metrics
            </Text>
            <Text
                style={[styles.text, styles.link]}
                onPress={() => Linking.openURL('https://policies.google.com/privacy')}
            >
                Google Privacy Policy
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
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'monospace',
        lineHeight: 28,
        maxWidth: 600,
    },
    link: {
        marginTop: 24,
        textDecorationLine: 'underline',
        color: '#aaaaff',
    }
});
