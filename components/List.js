import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const List = ({ time, NeuMorph }) => {
  console.log('item', time);
  return (
    <ScrollView
      style={{
        marginVertical: 100,
      }}
    >
      {time.map((item, index) => (
        <View key={index} style={styles.list}>
          <Text>{`Moving Time : ${item.min * 60 + item.sec} seconds`} </Text>
          <Text>{`Break Time : ${item.brmin * 60 + item.brsec} seconds`} </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: 'lightgrey',
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default List;
