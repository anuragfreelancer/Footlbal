import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { MapApiKey } from '../redux/Api';

const AddressPickup = ({ placeholderText, fetchAddress }) => {
    
    const onPressAddress = (data, details) => {
        console.log("🚀 Google API Full Response:", details); // Log full response

        if (!details) {
            console.error("❌ Error: 'details' is undefined");
            return;
        }

        if (!details.address_components) {
            console.error("❌ Error: 'address_components' is missing in API response");
            return;
        }

        let zipCode = '';
        let cityText = 'Unknown';

        details.address_components.forEach(component => {
            if (component.types.includes('locality') || component.types.includes('sublocality')) {
                cityText = component.long_name;
            }
            if (component.types.includes('postal_code')) {
                zipCode = component.long_name;
            }
        });

        const lat = details.geometry?.location?.lat || 0;
        const lng = details.geometry?.location?.lng || 0;

        console.log("✅ Extracted Data -> Lat:", lat, "Lng:", lng, "Zip:", zipCode, "City:", cityText);
        fetchAddress(lat, lng, zipCode, cityText);
    };

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder={placeholderText}
                fetchDetails={true}
                onPress={(data, details) => onPressAddress(data, details)}
                query={{
                    key: MapApiKey,
                    language: 'en',
                }}
                styles={{
                    textInputContainer: styles.containerStyle,
                    textInput: styles.textInputStyle,
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        backgroundColor: 'white',
    },
    textInputStyle: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#f3f3f3',
    },
});

export default AddressPickup;
