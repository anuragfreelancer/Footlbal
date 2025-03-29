import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imageIndex from '../assets/imageIndex';

interface CardProps {
    item: any;
    onPress: () => void;
}

const CardComponent: React.FC<CardProps> = ({ item, onPress }) => {
    const formatTime12Hour = (timestamp: string) => {
        const date = new Date(timestamp);
        date.setHours(date.getHours() + 5); // Add 5 hours

        let hours: any = date.getHours();
        let minutes: any = date.getMinutes();
        let seconds: any = date.getSeconds();
        let ampm: any = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12 || 12; // Convert 0 hour to 12
        hours = hours.toString().padStart(2, '0');
        minutes = minutes.toString().padStart(2, '0');
        seconds = seconds.toString().padStart(2, '0');

        return `${hours}:${minutes}:${seconds} ${ampm}`;
    };


    const dateTime = item?.date_time;
    const formattedTime = formatTime12Hour(dateTime);

    const formattedAddress = item.address.replace(/^(?:\S+\s*\+\S+,\s*|\d+,\s*)/, '');
    const last30Chars = formattedAddress.slice(-32);
    const statusColors = {
        Pending: "orange",
        Accept: "#0047AB",
        Pickup: "purple",
        Complete: "rgba(0, 164, 0, 1)",
        Cancel: "red",

    };



    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: item?.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item?.title} </Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <Text style={[styles.cardCategory]}>
                        {item?.category_name?.charAt(0).toUpperCase() + item?.category_name?.slice(1)}
                    </Text>
                </View>
                <View style={styles.cardFooter}>
                    <Image source={imageIndex?.clock} style={styles.icon} />
                    <Text style={styles.cardTime}>{formattedTime}</Text>
                </View>
                <View style={styles.cardFooter}>
                    <Image source={imageIndex?.location} style={styles.icon} />
                    <Text style={{
                        marginLeft: 5,
                        fontSize: 12,
                        color: 'black',
                        marginTop: 5,
                        fontWeight: "500",
                        marginStart: 5
                    }}>
                        {last30Chars}
                    </Text>


                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.cardCategory, {
                        color: "black"
                    }]}>Status:</Text>
                    <Text
                        style={[
                            styles.cardCategory,

                            { color: statusColors[item?.status] || "black", marginLeft: 3 } // Default color black
                        ]}
                    >
                        {item?.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.05)",
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5
    },
    cardImage: {
        width: 120,
        height: 120,
        marginRight: 10,
        borderRadius: 10
    },
    cardContent: {
        flex: 1,
        marginLeft: 2
    },
    cardTitle: {
        fontWeight: '700',
        fontSize: 14,
        color: "black",
        lineHeight: 24,
        marginTop: 2
    },
    cardCategory: {
        fontSize: 12,
        color: 'rgba(251, 91, 43, 1)',
        marginTop: 5,
        fontWeight: "500",
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardTime: {
        marginLeft: 5,
        fontSize: 12,
        color: 'black',
        marginTop: 5,
        fontWeight: "500",
        lineHeight: 18
    },
    icon: {
        height: 20,
        width: 20,
        marginTop: 5,
    }
});

export default CardComponent;