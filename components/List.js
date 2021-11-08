import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NeuMorph from './NeuMorph';

const List = ({ time, setListMode }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setListMode(true)}>
          <NeuMorph boxSize={70}>
            <MaterialIcons name="timer" size={30} color="#6DFACD" />
          </NeuMorph>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {time.map((item, index) => (
          <View key={index} style={styles.list}>
            <NeuMorph>
              <Text style={styles.text}>
                {`#List: ${index + 1} #Action: ${
                  item.min * 60 + item.sec
                }sec #Break: ${item.brmin * 60 + item.brsec}sec #Set: ${
                  item.countSet
                }`}{' '}
              </Text>
            </NeuMorph>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    marginVertical: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: '#23C197',
    fontWeight: '600',
  },
});

export default List;
