import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Record = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.card}
      onPress={() => {
        navigation.navigate("Edit", { record: item });
      }}
    >
      <View style={styles.box}>
        <Text style={styles.key}>Name: </Text>
        <Text style={styles.value}>
          {item.firstname} {item.lastname}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>Professional Qualification: </Text>
        <Text style={styles.value}>{item.prof_qual}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>Date Of Birth: </Text>
        <Text style={styles.value}>
          {new Date(item.dob * 1000).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>address: </Text>
        <Text style={styles.value}>{item.address}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>Phone Number: </Text>
        <Text style={styles.value}>{item.phone_number}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>Next Of Kin: </Text>
        <Text style={styles.value}>{item.next_of_kin}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.key}>Marital Status: </Text>
        <Text style={styles.value}>{item.marital_status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    paddingTop: 20,
    borderRadius: 8,
    marginBottom: 25,
  },
  box: {
    flexDirection: "row",
    marginBottom: 10,
  },
  key: {
    flex: 0.35,
    fontFamily: "Lato_700Bold",
    fontSize: 18,
    color: "#404040",
  },
  value: {
    flex: 0.65,
    fontFamily: "Lato_400Regular",
    fontSize: 17,
    color: "#505050",
    paddingLeft: 10,
  },
});

export default Record;
