import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { firestore } from "../../config/firebase.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function ProfileUser({ route, navigation }) {
  const [account, setAccount] = useState(null);
  const accountId = route.params.accountId;

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const userDocRef = doc(firestore, "UserProfile", accountId);
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
              await deleteDoc(doc(firestore, "UserProfile", accountId));
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
      <Text>UID {account.id}</Text>
      <Image source={{ uri: account.avatar }} style={styles.avatar} />
      <Image source={{ uri: account.cv }} style={styles.avatar1} />
      <Text>Education: {account.education}</Text>
      <Text>MinSalary: {account.minSalary}</Text>
      <Text>MaxSalary: {account.maxSalary}</Text>
      <Text>TypeSalary: {account.typeSalary}</Text>
      <Text>Profession: {account.profession}</Text>
      <Text>Skill: {account.skill}</Text>
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
