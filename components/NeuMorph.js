import React from 'react';
import { View, StyleSheet } from 'react-native';

const NeuMorph = ({ children, boxSize, style }) => {
  return (
    <View style={styles.topShadow}>
      <View style={styles.bottomShadow}>
        <View
          style={[
            styles.inner,
            {
              borderRadius: boxSize / 2 || 0,
              width: boxSize || 350,
              height: boxSize || 55,
            },
            style,
          ]}
        >
          {children}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0b60d0',
  },
  topShadow: {
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#129aff',
  },
  bottomShadow: {
    shadowOffset: {
      width: -5,
      height: -5,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: '#042653',
  },
});
export default NeuMorph;
