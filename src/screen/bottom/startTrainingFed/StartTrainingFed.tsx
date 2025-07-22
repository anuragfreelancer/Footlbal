import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, LayoutAnimation, UIManager, Platform } from 'react-native';
import axios from 'axios';
import imageIndex from '../../../assets/imageIndex';
import { SafeAreaView } from 'react-native';
import StatusBarComponent from '../../../compoent/StatusBarCompoent';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true); // for animation on Android
}

const StartTrainingFed = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedItemId, setExpandedItemId] = useState(null);

  const getTrainingData = async () => {
    try {
      const response = await axios.get('https://server-php-8-3.technorizen.com/Football/api/get_training?type=before_training');
      if (response.data.status === "1") {
        setTrainingData(response.data.result);
      }
    } catch (error) {
      console.log('API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTrainingData();
  }, []);

  const handlePress = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedItemId(prevId => (prevId === id ? null : id));
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItemId === item.id;
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)} activeOpacity={0.7}>
          <Text style={styles.title}>{item.type}</Text>
          <Image
            source={imageIndex.arroRight}
            style={[
              styles.arrowIcon,
              { transform: [{ rotate: isExpanded ? '90deg' : '0deg' }] },
            ]}
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={styles.expandedSection}>
            <Text style={styles.datetime}>{item.training_title}</Text>
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="##A0D803" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white"}}>

      <StatusBarComponent />
      
      <FlatList
        data={trainingData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        style={{marginTop:18}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  cardWrapper: {
    marginBottom: 15,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 18,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    flex: 1,
  },
  arrowIcon: {
    height: 16,
    width: 16,
    tintColor: '#2c3e50',
  },
  expandedSection: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  datetime: {
    fontSize: 14,
    color: 'balck',
    fontWeight: "500"
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartTrainingFed;
