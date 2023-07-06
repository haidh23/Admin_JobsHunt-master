import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { firestore } from "../../config/firebase.js";
import { doc, getDoc, deleteDoc } from "firebase/firestore";

export default function JobsDetails({ route, navigation }) {
  const [account, setAccount] = useState(null);
  const [role, setRole] = useState(null);
  const [name, setName] = useState(null);
  const [avatar1, setAvatar] = useState('');
  const [idPutJob, setidPutJob] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);

  const accountId = route.params.accountId;

  useEffect(() => {
    const fetchAccountDetails = async () => {
      try {
        const userDocRef = doc(firestore, "JobsAd", accountId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setAccount(userDocSnapshot.data());

          const userRole = userData.role;
          setRole(userRole);
          const userputjob = userData.idPutJob;
          setidPutJob(userputjob);

          let userInffreference;
          if (userRole === "Cá nhân") {
            userInffreference = doc(firestore, "UserInfo", userputjob);
          } else if (userRole === "Công ty") {
            userInffreference = doc(firestore, "CompanyInfo", userputjob);
          }

          if (userInffreference) {
            const userDocSnapshot = await getDoc(userInffreference);
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              setAvatar(userData.avatar);
              setName(userData.name);
            }
          }

          const { currentTime } = userData;
          const formattedTime = currentTime.toDate().toLocaleString(); // Format the time
          setFormattedTime(formattedTime); // Set the formatted time to state
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
    return <Text>Loading...</Text>; // Add a loading state if account is null
  }

  return (
    
    <View style={styles.container}>
      <Text style={styles.heading}>Jobs Details</Text>
      <Text>---------------------- USER UPLOAD ----------------------</Text>
      <Text>Role Upload {role}</Text>
      <Text>ID_User_putJob{idPutJob}</Text>
      <Image source={{ uri:avatar1 }} style={styles.avatar} />
      <Text>User_Upload: {name}</Text>
      <Text>---------------------------------------------------------</Text>
      <Text>Job Id: {account.id}</Text>
      <Text>Job Title: {account.title}</Text>
      <Text>Job Description: {account.desc}</Text>
      <Text>Profession: {account.profession}</Text>
      <Text>Job Address: {account.address}</Text>
      <Text>Time: {formattedTime}</Text> 
      <Text>Education_Require: {account.education}</Text>
      <Text>Gender: {account.gender}</Text>
      <Text>Age: {account.minAge}-{account.maxAge}</Text>
      <Text>Salary: {account.minSalary}-{account.maxSalary}</Text>
      <Text>Currency: {account.typeOfSalary}</Text>
      <Text>Time: {account.typeOfWork}</Text>
      <Text>View: {account.view}</Text>

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
