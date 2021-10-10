import React, { useContext, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Record from "../components/Record";
import { RecordContext } from "../services/record/record.service";
import { AuthCOntext } from "../services/auth/auth.service";

const HomeScreen = ({ navigation }) => {
  const { isFetching, error, records } = useContext(RecordContext);
  const { setUser } = useContext(AuthCOntext);

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
      <StatusBar barStyle="light-content" backgroundColor="#1E319D" />
      {isFetching && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#1E319D" />
        </View>
      )}
      {error && (
        <View>
          <Text>An error occurred</Text>
        </View>
      )}
      <FlatList
        data={records}
        renderItem={({ item }) => (
          <Record item={item} navigation={navigation} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 14,
    paddingBottom: 20,
  },
  loader: {
    marginTop: 70,
  },
  logout: {
    color: "#FFFFFF",
    fontFamily: "Lato_700Bold",
    fontSize: 15,
  },
});

export default HomeScreen;
