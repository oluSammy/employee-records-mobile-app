import React, { useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { AuthCOntext } from "../services/auth/auth.service";
import { RecordContext } from "../services/record/record.service";

const isAndroid = Platform.OS === "android";
// const keyboardVerticalOffset = Platform.OS === "ios" ? 40 : 0;

const UpdateRecord = ({ route, navigation }) => {
  const [checked, setChecked] = useState(route.params.record.marital_status);
  const { user, setUser } = useContext(AuthCOntext);
  const { updateRecord } = useContext(RecordContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const [values, setValues] = useState({
    firstname: route.params.record.firstname,
    lastname: route.params.record.lastname,
    kin: route.params.record.next_of_kin,
    phone: route.params.record.phone_number,
    prof: route.params.record.prof_qual,
    address: route.params.record.address,
  });
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(
    isAndroid
      ? new Date(route.params.record.dob * 1000).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(route.params.record.dob * 1000).toLocaleString().split(",")[0]
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    if (isAndroid) {
      setDate(
        selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    } else {
      setDate(selectedDate.toLocaleString().split(",")[0]);
    }
    hideDatePicker();
  };

  const handleUpdate = async () => {
    const update = {
      firstname: values.firstname,
      lastname: values.lastname,
      prof_qual: values.prof,
      address: values.address,
      phone_number: values.phone,
      next_of_kin: values.kin,
      marital_status: checked,
      dob: new Date(date).getTime() / 1000,
    };

    try {
      setIsUpdating(true);
      await axios({
        method: "put",
        url: `https://powerful-stream-15446.herokuapp.com/api/update-employees/${route.params.record.id}`,
        headers: {
          Authorization: `Bearer ${user}`,
        },
        data: update,
      });

      updateRecord(route.params.record.id, update);
      setIsUpdating(false);
      navigation.goBack();
    } catch (e) {
      setIsUpdating(false);
      console.log(e.response);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setUser(null)}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, setUser]);

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView
        behavior={!isAndroid ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView style={styles.scroll}>
          <View style={styles.editBox}>
            <Text style={styles.title}>First Name</Text>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.firstname}
              onChangeText={(text) => {
                setValues({ ...values, firstname: text });
              }}
            />
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date()}
          />
          <View style={styles.editBox}>
            <Text style={styles.title}>Last Name</Text>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.lastname}
              onChangeText={(text) => {
                setValues({ ...values, lastname: text });
              }}
            />
          </View>
          <View style={styles.editBox}>
            <Text style={styles.title}>Next Of Kin</Text>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.kin}
              onChangeText={(text) => {
                setValues({ ...values, kin: text });
              }}
            />
          </View>
          <View style={styles.editBox}>
            <Text style={styles.title}>Address</Text>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.address}
              onChangeText={(text) => {
                setValues({ ...values, address: text });
              }}
            />
          </View>
          <View style={styles.editBox}>
            <TouchableOpacity
              onPress={showDatePicker}
              activeOpacity={0.8}
              style={styles.opa}
            >
              <Text style={styles.title}>Date Of Birth</Text>
              <View style={styles.opac}>
                <Text style={styles.sub}>Select Date</Text>
                <Fontisto name="date" size={16} color="black" />
              </View>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={date && date}
              editable={false}
            />
          </View>
          <View style={styles.editBox}>
            <Text style={styles.title}>Marital Status</Text>
            <View style={styles.radioBox}>
              <Text style={styles.label}>Single</Text>
              <RadioButton
                value="single"
                status={checked === "single" ? "checked" : "unchecked"}
                onPress={() => setChecked("single")}
                color="#1E319D"
                // uncheckedColor="red"
              />
            </View>
            <View style={styles.radioBox}>
              <Text style={styles.label}>Married</Text>
              <RadioButton
                value="married"
                status={checked === "married" ? "checked" : "unchecked"}
                onPress={() => setChecked("married")}
                color="#1E319D"
                // uncheckedColor="red"
              />
            </View>
          </View>
          <View style={styles.editBox}>
            <Text style={styles.title}>Phone Number</Text>
            <TextInput
              style={styles.input}
              textContentType="telephoneNumber"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="numeric"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.phone}
              onChangeText={(text) => {
                setValues({ ...values, phone: text });
              }}
            />
          </View>
          <View style={styles.editBox}>
            <Text style={styles.title}>Professional Qualification</Text>
            <TextInput
              style={styles.input}
              textContentType="givenName"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="default"
              returnKeyType="next"
              blurOnSubmit={false}
              value={values.prof}
              onChangeText={(text) => {
                setValues({ ...values, prof: text });
              }}
            />
          </View>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.9}
            onPress={handleUpdate}
          >
            {isUpdating ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.textBtn}>Update</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingVertical: 20,
    flex: 1,
  },
  editTitle: {
    fontFamily: "Lato_700Bold",
    fontSize: 20,
    color: "#818181",
  },
  keyboardView: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 30,
    // paddingBottom: 2100,
  },
  input: {
    height: 60,
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderRadius: 11,
    paddingHorizontal: 20,
    fontFamily: "Lato_400Regular",
    color: "#000",
    fontSize: 18,
    marginBottom: 30,
  },
  title: {
    fontFamily: "Lato_700Bold",
    fontSize: 20,
    color: "#818181",
  },
  editBox: {},
  textBtn: {
    color: "#FFFFFF",
    fontFamily: "Lato_700Bold",
    fontSize: 20,
  },
  btn: {
    backgroundColor: "#1E319D",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 100,
  },
  sub: {
    fontFamily: "Lato_700Bold",
    fontSize: 15,
    color: "#818181",
    marginRight: 10,
  },
  opa: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  opac: {
    flexDirection: "row",
  },
  radioBox: {
    flexDirection: "column",
    marginTop: 15,
  },
  label: {
    fontFamily: "Lato_700Bold",
    fontSize: 16,
    color: "#818181",
  },
  logout: {
    color: "#FFFFFF",
    fontFamily: "Lato_700Bold",
    fontSize: 15,
  },
});

export default UpdateRecord;
