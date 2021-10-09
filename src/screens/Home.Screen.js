import React, { useContext, Text } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Record from "../components/Record";
import { RecordContext } from "../services/record/record.service";

const HomeScreen = ({ navigation }) => {
  const { isFetching, error, records } = useContext(RecordContext);
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
});

export default HomeScreen;
