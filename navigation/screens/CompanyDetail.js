import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { firestore } from "../../config/firebase.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function CompanyDetails({ route, navigation }) {
  const [account, setAccount] = useState(null);
  const accountId = route.params.accountId;

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const userDocRef = doc(firestore, "CompanyInfo", accountId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setAccount(userDocSnapshot.data());
        }
      } catch (error) {
        console.log("Error fetching account details: ", error);
      }
    };

    fetchAccountDetails();
  }, [route.params.accountId]);

  const back = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete this account?",
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
  

  if (!account) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Account Details</Text>
      <Text>ID Company: {account.id}</Text>
      <Text>AccountID: {account.accountId}</Text>
      <Image source={{ uri: account.companyAvatar }} style={styles.avatar} />
      <Text>Company Name: {account.companyName}</Text>
      <Text>Company Address: {account.companyAddress}</Text>
      <Text>Compay Description: {account.companyDescription}</Text>
      <Text>Company Industry: {account.companyIndustry}</Text>
      <Text>Company Contact: {account.companyPhone}</Text>
      <Text>Company Employers: {account.companyScale}</Text>
      <Text>Company Website: {account.companyWebsite}</Text>
      <View style={{ flexDirection: "row" }}>
        <Button title="Back" onPress={back} />
        <View style={{ width: 10 }} />
        <Button title="Delete Account" onPress={handleDeleteAccount} />

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 25,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatar1: {
    width: 100,
    height: 100,

    marginBottom: 10,
  },
});
