import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmptyListComponentProps {
    message?: string;
}

const EmptyListComponent: React.FC<EmptyListComponentProps> = ({ message = "No Data Available" }) => {
    return (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 32,
        paddingHorizontal: 24,
        minHeight: 120,
    },
    emptyText: {
        fontSize: 15,
        color: '#6B7280',
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default EmptyListComponent;
