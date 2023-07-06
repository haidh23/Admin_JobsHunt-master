import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, StatusBar } from "react-native";
import { auth, firestore } from "../../config/firebase.js";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

export default function HomeScreen({ navigation }) {
  const [accountList, setAccountList] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const q = query(collection(firestore, "CompanyInfo"));
        const querySnapshot = await getDocs(q);

        const accounts = [];
        querySnapshot.forEach((doc) => {
          const { companyAvatar, companyName,companyIndustry } = doc.data();
          accounts.push({ id: doc.id, companyAvatar, companyName,companyIndustry });
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
      "Are you sure you want to delete this company account?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, "CompanyInfo", accountId));
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
    navigation.navigate("CompanyDetails", { accountId: id });
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Management CompanyInfo</Text>
      <FlatList
        data={accountList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.accountItem}>
            <Text style={styles.name} numberOfLines = {3}>UID:    {item.id}</Text>
            <Image source={{ uri: item.companyAvatar }} style={styles.avatar} />
            <Text style={styles.name1}>{item.companyName}</Text>
            <Text style={styles.name1}>{item.companyIndustry}</Text>
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
    flex: 0.5,
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
