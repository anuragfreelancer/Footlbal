import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import imageIndex from "../../../../assets/imageIndex";
import StatusBarComponent from "../../../../compoent/StatusBarCompoent";
import { useNavigation } from "@react-navigation/native";
import ScreenNameEnum from "../../../../routes/screenName.enum";
 
const players = Array(11).fill({
  name: "Animes S.",
  position: "Forward",
  trainingType: "Chest",
  intensity: "Beginner",
  image: "https://via.placeholder.com/50", // Replace with actual image URL
});

const Players = () => {
  const navigation  = useNavigation()
  return (
    <SafeAreaView  style={styles.container}>
      <StatusBarComponent/>
    <View style={[styles.container,{
       padding: 15 
    }]}>
      <Text style={styles.header}>Players</Text>
      <FlatList
        data={players} 
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} 
          
          onPress={()=>navigation.navigate(ScreenNameEnum.PlayerDetails)}
          >
            <Image source={imageIndex.foodBagImg} style={styles.avatar} />
            <View style={styles.infoContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.position}>{item.position}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Training Type</Text>
              <Text style={styles.value}>{item.trainingType}</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={styles.label}>Intensity</Text>
              <Text style={styles.value}>{item.intensity}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab}
      
      onPress={()=>{
        navigation.navigate(ScreenNameEnum.AddPlayer)
      }}
      > 
        <Image source={imageIndex.floter} 
        style={{height:74,width:74}}
        resizeMode="contain"
        />
       </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white",},
  header: { fontSize: 24,color:"black", fontWeight: "700", textAlign: "center",   },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginVertical: 6,
    marginHorizontal:1,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 12 },
  infoContainer: { flex: 1 },
  name: { fontSize: 12, fontWeight: "600",color:"black" },
  position: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)"  },
  detailContainer: { alignItems: "center", marginHorizontal: 10 },
  label: { fontSize: 12, fontWeight: "600",color:"black" },
  value: { fontSize: 12, fontWeight: "600",color:"rgba(153, 153, 153, 1)" },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#7ED321",
    borderRadius: 30,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 1,
  },
});

export default Players;
