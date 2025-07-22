

// import React, { useState } from "react";
// import { View, Text, Dimensions, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// const ChartComponent = ({ data, statusText, statusColor }) => {
//   const [selectedType, setSelectedType] = useState("weekly");
//   const [modalVisible, setModalVisible] = useState(false);

//   const types = Object.keys(data);
//   const currentData = data[selectedType].data;
//   const maxValue = Math.max(...currentData);

//   return (
//     <View style={{ marginTop: 15, backgroundColor: "#fff", borderRadius: 10 }}>
//       <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
//         <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: statusColor, marginRight: 5 }} />
//         <Text style={{ fontWeight: "700", color: "black", fontSize: 18, marginLeft: 5 }}>{statusText}</Text>
//         <View style={{ flex: 1, alignItems: "flex-end" }}>
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <View style={{ backgroundColor: "#ED7E62", padding: 10, borderRadius: 30 }}>
//               <Text style={{ color: "#fff", fontSize: 10, fontWeight: "500" }}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} ▼</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <LineChart
//         data={{
//           labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//           datasets: [
//             {
//               data: currentData,
//               color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//               strokeWidth: 2,
//               withDots: false,
//             },
//           ],
//         }}
//         width={screenWidth - 40}
//         height={220}
//         yAxisSuffix="%"
//         yAxisInterval={1}
//         chartConfig={{
//           backgroundColor: "#fff",
//           backgroundGradientFrom: "#fff",
//           backgroundGradientTo: "#fff",
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//           labelColor: (opacity = 1, index) =>
//             currentData[index] === maxValue ? "red" : "#7B6F72",
//           propsForLabels: {
//             fontSize: 12,
//             fontWeight: "600",
//           },
//           propsForDots: {
//             r: "0",
//           },
//         }}
//         bezier
//         style={{ marginVertical: 8, borderRadius: 16 }}
//       />
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }}>
//             <View style={{ elevation: 3, backgroundColor: "#fff", padding: 20, borderRadius: 10, width: 200 }}>
//               <FlatList
//                 data={types}
//                 keyExtractor={(item) => item}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     onPress={() => {
//                       setSelectedType(item);
//                       setModalVisible(false);
//                     }}
//                     style={{ padding: 10, alignItems: "center", borderTopWidth: 1, borderColor: "#9DB2BF" }}
//                   >
//                     <Text style={{ fontWeight: "500", fontSize: 15, color: "black" }}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };

// export default ChartComponent;
// import React, { useState } from "react";
// import { View, Text, Dimensions, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, StyleSheet } from "react-native";
// import { LineChart } from "react-native-chart-kit";

// const screenWidth = Dimensions.get("window").width;

// const ChartComponent = ({ data, statusText, statusColor }) => {
//   const [selectedType, setSelectedType] = useState("weekly");
//   const [modalVisible, setModalVisible] = useState(false);
//   const types = Object.keys(data);
//   const currentData = data[selectedType].data;
//   const maxValue = Math.max(...currentData);
//   return (
//     <View style={{ marginVertical: 1, marginHorizontal: 1, marginBottom: 20, marginTop: 12, backgroundColor: "#fff", borderRadius: 15, padding: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 1 }}>
//       <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
//         <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: statusColor, marginRight: 5 }} />
//         <Text style={{ fontWeight: "700", color: "black", fontSize: 18 }}>{statusText}</Text>
//         <View style={{ flex: 1, alignItems: "flex-end" }}>
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <View style={{ backgroundColor: "#ED7E62", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>
//               <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} ▼</Text>
//             </View>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <LineChart
//         data={{
//           labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
//           datasets: [
//             {
//               data: currentData,
//               color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//               strokeWidth: 2,
//             },
//           ],
//         }}
//         width={screenWidth - 50}
//         height={220}
//         yAxisSuffix="%"
//         yAxisInterval={1}
//         chartConfig={{
//           backgroundGradientFrom: '#ffffff',
//           backgroundGradientTo: '#ffffff',
//           decimalPlaces: 0,
//           color: (opacity = 1) => `rgba(244, 113, 113, ${opacity})`, // Soft pink/red line
//           labelColor: () => '#ccc',
//           propsForDots: {
//             r: '0', // No dots
//           },
//           propsForBackgroundLines: {
//             stroke: '#DDDADA', // Light gray grid
//             strokeDasharray: '10', // Solid lines
//           },


//           // backgroundGradientFrom: "#fff",
//           // backgroundGradientTo: "#fff",
//           // decimalPlaces: 0,
//           // color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
//           // labelColor: (opacity = 1, index) => (currentData[index] === maxValue ? "red" : "#7B6F72"),
//           // propsForLabels: {
//           //   fontSize: 12,
//           //   fontWeight: "600",
//           // },
//           // propsForDots: {
//           //   r: "0",
//           // },
//         }}
//         bezier
//         withInnerLines={true}
//         withOuterLines={false}
//         // withVerticalLabels={false}
//         withHorizontalLabels={true}
//         withVerticalLabels={true}        // withShadow={false}
//       // withDots={false}
//       // fromZero={true}
//       // withOuterLines={false}

//       // fromZero={true}

//       // withInnerLines={false}

//       // bezier
//       // style={{ marginVertical: 8, borderRadius: 16 }}
//       />
//       <Modal visible={modalVisible} transparent animationType="slide">
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View style={styles.overlay}>
//             <View style={styles.modalContainer}>
//               <FlatList
//                 data={types}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({ item }) => (
//                   <TouchableOpacity
//                     onPress={() => {
//                       setSelectedType(item);
//                       setModalVisible(false);
//                     }}
//                     style={styles.listItem}
//                   >
//                     <Text style={styles.listItemText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
//                   </TouchableOpacity>
//                 )}
//               />
//             </View>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "rgba(0,0,0,0.5)",
//   },
//   modalContainer: {
//     backgroundColor: "#fff",
//     padding: 20,
//     borderRadius: 10,
//     width: 250,
//   },
//   listItem: {
//     padding: 12,
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderColor: "#9DB2BF",
//   },
//   listItemText: {
//     fontWeight: "500",
//     fontSize: 16,
//     color: "black",
//   },
// });

// export default ChartComponent;




import React, { useState } from "react";
import { View, Text, Dimensions, TouchableOpacity, Modal, FlatList, TouchableWithoutFeedback, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;
const ChartComponent = ({ data, statusText, statusColor }) => {
  const [selectedType, setSelectedType] = useState("weekly");
  const [modalVisible, setModalVisible] = useState(false);
  const types = Object.keys(data);
  const currentData = data[selectedType].data;
  const secondData = [2800, 3000, 200, 12, 1700, 1800,2900];
  return (
    <View style={{ marginVertical: 1, marginHorizontal: 1, marginBottom: 20, marginTop: 12, backgroundColor: "#fff", borderRadius: 15, padding: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5, elevation: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
        <View style={{ width: 15, height: 15, borderRadius: 15, backgroundColor: statusColor, marginRight: 5 }} />
        <Text style={{ fontWeight: "700", color: "black", fontSize: 18 }}>{statusText}</Text>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={{ backgroundColor: "#ED7E62", paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20 }}>
              <Text style={{ color: "#fff", fontSize: 12, fontWeight: "500" }}>{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} ▼</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <LineChart
        data={{
          labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          datasets: [
            {
              data: currentData, // First line
              color: (opacity = 1) => `rgba(244, 113, 113, ${opacity})`, // Soft red/pink
              strokeWidth: 2,
            },
            // {
            //   data: secondData, // Second line
            //   color: (opacity = 1) => `rgba(255, 183, 153, ${opacity})`, // Light peach/orange
            //   strokeWidth: 2,
            // },
          ],
        }}
        width={screenWidth - 30}
        height={220}
        yAxisSuffix="%"
        yAxisInterval={1}
        chartConfig={{

          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          backgroundGradientToOpacity: 0.5,
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(244, 113, 113, ${opacity})`,
          labelColor: () => '#ccc',
          barPercentage: 0.5,
          useShadowColorFromDataset: false,
          propsForDots: {
            r: '0', // No dots, just lines
          },
          propsForBackgroundLines: {
            stroke: '#EEE',
            strokeDasharray: '', // Solid horizontal lines
            strokeWidth: 1,
          },

          propsForVerticalLabels: {
            fill: '#7B6F72',
            fontSize: 12,
            fontWeight: '600',
          },

          propsForHorizontalLabels: {
            fill: '#7B6F72',
            fontSize: 12,
            fontWeight: '600',
          },

          formatYLabel: (label) => `${label}%`,
        }}
        bezier
        withDots={false}
        withShadow={false}
        withInnerLines={true}
        withOuterLines={false}
        withVerticalLines={false}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />


      {/* <LineChart
    data={{
      labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      datasets: [
        {
          data: currentData,
          color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
          strokeWidth: 2,
        },
      ],
    }}
    width={screenWidth - 20}
    height={220}
    yAxisSuffix="%"
    chartConfig={{
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(244, 113, 113, ${opacity})`,
      labelColor: () => '#ccc',
      propsForDots: {
        r: '0',
      },
      // propsForBackgroundLines: {
      //   stroke: '#DDDADA',
      //   strokeDasharray: '500',
      //   strokeWidth: 0.5,
      // },
      propsForBackgroundLines: {
        stroke: '#DDDADA',
        strokeDasharray: '4 4', // 4 units dash, 4 units gap
        strokeWidth: 0.5,
      },
      formatYLabel: (label) => `${label}%`,
      fillShadowGradient: '#fff',  // add this
      fillShadowGradientOpacity: 0, // add this
      
     }}
    bezier
    withInnerLines={true}
    withOuterLines={false}
    withVerticalLines={false}
    withVerticalLabels={true}
    withHorizontalLabels={true}
  /> */}


      <Modal visible={modalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.overlay}>
            <View style={styles.modalContainer}>
              <FlatList
                data={types}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedType(item);
                      setModalVisible(false);
                    }}
                    style={styles.listItem}
                  >
                    <Text style={styles.listItemText}>{item.charAt(0).toUpperCase() + item.slice(1)}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  listItem: {
    padding: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#9DB2BF",
  },
  listItemText: {
    fontWeight: "500",
    fontSize: 16,
    color: "black",
  },
});

export default ChartComponent;

