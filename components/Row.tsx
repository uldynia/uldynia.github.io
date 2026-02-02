import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface RowProps {
    children: React.ReactNode;
    style?: ViewStyle;
    gap?: number;
}

export default function Row({ children, style, gap = 12 }: RowProps) {
    return (
        <View style={[styles.row, { gap }, style]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
});
