import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';

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
              height: boxSize || 48,
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
  ...Platform.select({
    ios: {
      inner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#275c77',
      },
      topShadow: {
        shadowOffset: {
          width: 3,
          height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#3b8cb5',
        elevation: 5,
      },
      bottomShadow: {
        shadowOffset: {
          width: -3,
          height: -3,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
        shadowColor: '#132c39',
        elevation: 4,
      },
    },
    android: {
      inner: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#275c77',
        elevation: 3,
      },
      topShadow: {
        elevation: 1,
      },
      bottomShadow: {
        elevation: 4,
      },
    },
  }),
});
export default NeuMorph;
