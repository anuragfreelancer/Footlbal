import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import CustomHeader from '../../../compoent/CustomHeader';
import imageIndex from '../../../assets/imageIndex';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';
import styles from './style';
import useNotifications from './useNotifications';
import LoadingModal from '../../../utils/Loader';
import EmptyListComponent from '../../../compoent/EmptyListComponent';

const NotifiData = [
  {
    title: "Today",
    data: [
      { id: '1', name: 'Warson D.', time: '32 minutes ago', status: 'Successful' },
      ],
  },
   
];

const Notifications = () => {
  const {
    isLoading,
    navigation,
    notifications, setNotifications
  } = useNotifications()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBarComponent />
      {isLoading ? <LoadingModal /> : null}
      <View style={{ marginTop: 25 }}>
        <CustomHeader imageSource={imageIndex.backNav} label={"Notifications"} />
      </View>
      <View style={styles.container}>

        <FlatList
          style={{ marginTop: 18 }}
          data={NotifiData}
          keyExtractor={(_, index) => index.toString()}
          ListEmptyComponent={<EmptyListComponent message="No Notifications available" />} // Common Empty Component
          renderItem={({ item }) => (
            <View style={styles.notificationCard}>
              <Image
                source={imageIndex.user}
                style={styles.avatar}
              />
              <View style={styles.notificationText}>
                <Text style={styles.name}>Warson D.</Text>
                <Text style={styles.time}>32 minutes ago</Text>
              </View>
              {/* <Text style={styles.status}>{item.status}</Text> */}
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};



export default Notifications;
