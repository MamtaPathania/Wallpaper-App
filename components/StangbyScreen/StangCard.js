// import React, { useState } from "react";
// import { StyleSheet, Image, View, Dimensions, TouchableOpacity, Modal } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// const { width, height } = Dimensions.get("window");

// const StangCard = ({ imageUrl, onDownload, onShare }) => {
//   const [isModalVisible, setModalVisible] = useState(false);

//   const showModal = () => setModalVisible(true);
//   const hideModal = () => setModalVisible(false);
// //category change
//   return (
//     <>
//       <View style={styles.cardContainer}>
//         <TouchableOpacity onPress={showModal}>
//           <Image
//             source={{ uri: imageUrl }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//         </TouchableOpacity>
//       </View>

//       <Modal
//         transparent={true}
//         visible={isModalVisible}
//         onRequestClose={hideModal}
//         animationType="slide"
//       >
//         <View style={styles.modalContainer}>
//           <TouchableOpacity onPress={hideModal} style={styles.closeButton}>
//             <Ionicons name="close" size={30} color="white" />
//           </TouchableOpacity>
//           <Image
//             source={{ uri: imageUrl }}
//             style={styles.modalImage}
//             resizeMode="contain"
//           />
//           <View style={styles.iconContainer}>
//             <TouchableOpacity onPress={onDownload} style={styles.iconWrapper}>
//               <Ionicons name="download-outline" size={25} color="black" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={onShare} style={styles.iconWrapper}>
//               <SimpleLineIcons name="share" size={25} color="black"/>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     flex: 1,
//     width: '100%',
//     height: height * 0.25,
//     backgroundColor: "#fff",
//     borderRadius: 8,
//     marginBottom: 10,
//     marginHorizontal: 5,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     alignSelf: "center",
//     overflow: "hidden",
//   },
//   image: {
//     width: "100%",
//     height: "100%",
//     borderWidth: 1,
//     borderColor: "#dfe5ed",
//     borderRadius: 8,
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 20,
//     left: 20,
//     zIndex: 1,
//   },
//   modalImage: {
//     width: '100%',
//     height: '80%',
//   },
//   iconContainer: {
//     position: "absolute",
//     bottom: 20,
//     left: 0,
//     right: 0,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   iconWrapper: {
//     backgroundColor: "#edece8",
//     borderRadius: 25,
//     width: 40,
//     height: 40,
//     alignItems: "center",
//     justifyContent: "center",
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 3,
//     marginHorizontal: 20,
//   },
// });

// export default StangCard;
