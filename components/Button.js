import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import NeuMorph from './NeuMorph';
const Button = ({ play, isPaused, reset, setListMode }) => {
  return (
    <View style={styles.btns}>
      <TouchableOpacity onPress={play}>
        <NeuMorph boxSize={70}>
          {isPaused ? (
            <Fontisto name="play" size={24} color="#92ff38" />
          ) : (
            <Fontisto name="pause" size={24} color="#92ff38" />
          )}
        </NeuMorph>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setListMode((prev) => !prev);
        }}
      >
        <NeuMorph boxSize={70}>
          <Fontisto name="list-2" size={28} color="white" />
        </NeuMorph>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <NeuMorph boxSize={70}>
          <Ionicons name="refresh-circle" size={40} color="#92ff38" />
        </NeuMorph>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default Button;
