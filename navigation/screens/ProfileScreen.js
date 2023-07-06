import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, SafeAreaView, StatusBar } from "react-native";
import { auth, firestore } from "../../config/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default function JobsScreen({ navigation }) {
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const q = query(collection(firestore, "JobsAd"));
        const querySnapshot = await getDocs(q);

        const accounts = [];
        querySnapshot.forEach((doc) => {
          const { avatar, idPutJob,jobId,desc,role } = doc.data();
          accounts.push({ id: doc.id, avatar, idPutJob,jobId,desc,role });
        });

        setAccountList(accounts);
      } catch (error) {
        console.log("Error fetching accounts: ", error);
      }
    };

    fetchAccounts();
  }, []);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this job",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, "JobsAd", accountId));
              Alert.alert("Account deleted successfully");
              navigation.goBack();
            } catch (error) {
              console.log("Error deleting account: ", error);
            }
          },
        },
      ]
    );
  };

  const handleAccountDetails = (id) => {
    // Navigate to account details screen
    navigation.navigate("JobsDetails", { accountId: id });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Management Job</Text>
      <FlatList
        data={accountList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <Text style={styles.name} numberOfLines={2}>ID:    {item.id}</Text>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <Text style={styles.name1}>ID_User_putJob: {item.idPutJob}</Text>
            <Text style={styles.name1}> Description: {item.desc}</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeleteAccount(item.id)}
            >
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => handleAccountDetails(item.id)}
            >
              <Text style={styles.buttonText}>Detail</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    marginStart: 10,
  },
  accountItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    flex: 0.3,
    fontSize: 16,
    fontWeight: "bold",
  },
  name1: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight: 10,
  },
  button1: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "green",
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  }
});
