import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import Button from './Button';
import ModalPicker from './ModalPicker';

const Timer = () => {
  const [exMinutes, setExMinutes] = useState(1);
  const [exSecond, setExSecond] = useState(0);
  const [brMinutes, setBrMinutes] = useState(0);
  const [brSecond, setBrSecond] = useState(30);
  const [isMove, setIsMove] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [count, setCount] = useState(0);
  const { height } = Dimensions.get('window');
  const [seconds, setSeconds] = useState(0);
  const secondLeft = useRef(seconds);

  const timeBreak = () => {
    if (brSecond === 0) {
      if (brMinutes !== 0) {
        setBrSecond(59);
        setBrMinutes((m) => m - 1);
      } else {
        setIsPaused(true);
        setIsBreak(false);
        setCount(0);
        setBrSecond(30);
        setBrMinutes(0);
      }
    } else {
      setBrSecond((s) => s - 1);
    }
    setCount((count) => count + 1);
  };

  const tick = () => {
    if (exSecond === 0) {
      if (exMinutes !== 0) {
        setExSecond(59);
        setExMinutes((m) => m - 1);
      } else {
        setIsBreak(true);
        setCount(0);
        setSeconds(0);
      }
    } else {
      setExSecond((s) => s - 1);
    }
  };

  useEffect(() => {
    const play = setInterval(() => {
      if (isPaused) {
        return;
      }
      if (isBreak) {
        timeBreak();
      } else {
        tick();
        setCount((count) => count + 1);
      }
    }, 1000);

    return () => clearInterval(play);
  }, [isPaused, exMinutes, isBreak, exSecond, count]);

  useEffect(() => {
    if (isBreak) {
      secondLeft.current =
        brMinutes === 0 ? brSecond : brMinutes * 60 + brSecond + count;
      setSeconds(secondLeft.current);
    } else {
      secondLeft.current =
        exMinutes === 0 ? count + 60 : exMinutes * 60 + exSecond + count;
      setSeconds(secondLeft.current);
    }
  }, [exMinutes, brMinutes, isBreak, seconds]);
  const play = () => {
    setIsPaused(!isPaused);
  };
  const reset = () => {
    setExMinutes(1);
    setExSecond(0);
    setBrMinutes(0);
    setBrSecond(30);
    setIsPaused(true);
    setIsBreak(false);
    setCount(0);
  };

  const percentage = (100 / parseInt(seconds)) * count;

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

  return (
    <View
      style={{
        alignItems: 'center',
        width: '100%',
        height: height,
      }}
    >
      <View style={{ marginTop: 50 }}>
        <NeuMorph boxSize={260}>
          <Text
            style={{
              color: !isBreak ? '#FFC15D' : '#00D0E5',
              fontSize: 40,
              fontWeight: '600',
            }}
          >
            {!isBreak ? 'Move' : 'Break'}
          </Text>
          <Text
            style={{
              color: !isBreak ? '#F9F871' : '#009DF1',
              fontSize: 70,
              fontWeight: '600',
            }}
          >
            {!isBreak
              ? `${exMinutes < 10 ? `0${exMinutes}` : exMinutes} : ${
                  exSecond < 10 ? `0${exSecond}` : exSecond
                } `
              : `${brMinutes < 10 ? `0${brMinutes}` : brMinutes} : ${
                  brSecond < 10 ? `0${brSecond}` : brSecond
                }`}
          </Text>
        </NeuMorph>
      </View>
      <View style={{ marginVertical: 25 }}>
        <NeuMorph>
          <View style={styles.progressBar}>
            <Animated.View
              style={
                ([StyleSheet.absoluteFill],
                {
                  backgroundColor: !isBreak ? '#FF5E76' : '#BA9300',
                  width: `${percentage}%`,
                })
              }
            />
          </View>
        </NeuMorph>
      </View>

      <NeuMorph>
        <View style={styles.inputs}>
          <Text style={styles.inputText}>{`start Time(${
            exMinutes < 10 ? `0${exMinutes}` : exMinutes
          }:${exSecond < 10 ? `0${exSecond}` : exSecond})`}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsModal(!isModal);
              setIsMove(true);
            }}
          >
            <MaterialIcons name="timer" size={30} color="#6DFACD" />
          </TouchableOpacity>
        </View>
      </NeuMorph>
      <View style={{ marginVertical: 25 }}>
        <NeuMorph>
          <View style={styles.inputs}>
            <Text style={styles.inputText}>{`start Time(${
              brMinutes < 10 ? `0${brMinutes}` : brMinutes
            }:${brSecond < 10 ? `0${brSecond}` : brSecond})`}</Text>
            <TouchableOpacity
              onPress={() => {
                setIsModal(!isModal);
                setIsMove(false);
              }}
            >
              <MaterialIcons name="timer" size={30} color="#6DFACD" />
            </TouchableOpacity>
          </View>
        </NeuMorph>
      </View>
      <View style={{ marginTop: 30 }}>
        <Button
          play={play}
          isPaused={isPaused}
          reset={reset}
          NeuMorph={NeuMorph}
        />
      </View>

      <ModalPicker
        isModal={isModal}
        setIsModal={setIsModal}
        exMinutes={exMinutes}
        setExMinutes={setExMinutes}
        exSecond={setExSecond}
        setExSecond={setExSecond}
        isMove={isMove}
        brMinutes={brMinutes}
        setBrMinutes={setBrMinutes}
        brSecond={brSecond}
        setBrSecond={setBrSecond}
      />
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
  progressBar: {
    backgroundColor: '#EEE8A9',
    height: 5,
    flexDirection: 'row',
    width: `90%`,
    borderRadius: 5,
  },
  inputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  inputText: {
    color: '#23C197',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Timer;
