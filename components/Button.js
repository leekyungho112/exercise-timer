import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fontisto, Ionicons } from '@expo/vector-icons';
const Button = ({ play, isPaused, reset, NeuMorph }) => {
  return (
    <View style={styles.btns}>
      <TouchableOpacity onPress={play}>
        <NeuMorph boxSize={80}>
          {isPaused ? (
            <Fontisto name="play" size={24} color="#00D0E5" />
          ) : (
            <Fontisto name="pause" size={24} color="#00D0E5" />
          )}
        </NeuMorph>
      </TouchableOpacity>
      <TouchableOpacity onPress={reset}>
        <NeuMorph boxSize={80}>
          <Ionicons name="refresh-circle" size={40} color="#6DFACD" />
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
