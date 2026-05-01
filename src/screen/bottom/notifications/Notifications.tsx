import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import CustomHeader from '../../../compoent/CustomHeader';
import localizationStrings from '../../../compoent/Localization/Localization';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import styles from './style';
import useNotifications from './useNotifications';
import EmptyListComponent from '../../../compoent/EmptyListComponent';
import moment from 'moment';
import { SafeAreaView } from 'react-native-safe-area-context';


const Notifications = () => {
  const {
    isLoading,
    notifications,
  } = useNotifications()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      <View style={{ marginTop: 25 }}>
        <CustomHeader imageSource={imageIndex.backNav} label={localizationStrings.Notifications} />
      </View>
      <View style={styles.container}>
        {isLoading ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={30} color="#A0D803" />
          </View>
        ) : (
          <FlatList
            style={{ marginTop: 18 }}
            data={notifications}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={<EmptyListComponent message={localizationStrings.NoNotifications || "No Notifications available"} />} // Common Empty Component
            renderItem={({ item }) => {
              const formattedDate = moment(item?.created_at).format("h:mm A");
              return (
                <View style={styles.notificationCard}>
                  {/* <Image
                  source={{
                    uri:item?.image
                  }}
                  style={styles.avatar}
                /> */}
                  <View style={styles.notificationText}>
                    <Text style={styles.name}>{item?.message}</Text>
                    {/* <Text style={styles.time}></Text> */}
                  </View>
                  <Text style={styles.time}>{formattedDate}</Text>
                  {/* <Text style={styles.status}>{item.read_status}</Text> */}
                </View>
              )
            }}
          />
        )}

      </View>
    </SafeAreaView>
  );
};



export default Notifications;
