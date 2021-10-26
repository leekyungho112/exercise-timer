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
  const [exerciseTime, setExerciseTime] = useState({
    min: 1,
    sec: 10,
  });
  const [breakTime, setBreakTime] = useState({
    min: 0,
    sec: 30,
  });
  const [isMove, setIsMove] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [count, setCount] = useState(0);
  const { height } = Dimensions.get('window');
  const [seconds, setSeconds] = useState(0);
  const secondLeft = useRef(seconds);

  const timeBreak = () => {
    if (breakTime.sec === 0) {
      if (breakTime.min !== 0) {
        setBreakTime({
          ...breakTime,
          sec: 59,
          min: breakTime.min - 1,
        });
      } else {
        setIsPaused(true);
        setIsBreak(false);
        setCount(0);
        setBreakTime({ min: 0, sec: 30 });
      }
    } else {
      setBreakTime({ ...breakTime, sec: breakTime.sec - 1 });
    }
    setCount((count) => count + 1);
  };

  const tick = () => {
    if (exerciseTime.sec === 0) {
      if (exerciseTime.min !== 0) {
        setExerciseTime({
          ...exerciseTime,
          sec: 59,
          min: exerciseTime.min - 1,
        });
      } else {
        setIsBreak(true);
        setCount(0);
        setSeconds(0);
      }
    } else {
      setExerciseTime({ ...exerciseTime, sec: exerciseTime.sec - 1 });
    }
  };
  console.log('ex', exerciseTime);

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
  }, [isPaused, isBreak, count]);

  useEffect(() => {
    if (isBreak) {
      secondLeft.current =
        breakTime.min === 0
          ? breakTime.sec
          : breakTime.min * 60 + breakTime.sec + count;
      setSeconds(secondLeft.current);
    } else {
      secondLeft.current =
        exerciseTime.min === 0
          ? count + 60
          : exerciseTime.min * 60 + exerciseTime.sec + count;
      setSeconds(secondLeft.current);
    }
  }, [exerciseTime, isBreak, seconds]);
  const play = () => {
    setIsPaused(!isPaused);
  };
  const reset = () => {
    setExerciseTime({ min: 1, sec: 10 });
    setBreakTime({ min: 0, sec: 30 });
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
              ? `${
                  exerciseTime.min < 10
                    ? `0${exerciseTime.min}`
                    : exerciseTime.min
                } : ${
                  exerciseTime.sec < 10
                    ? `0${exerciseTime.sec}`
                    : exerciseTime.sec
                } `
              : `${
                  breakTime.min < 10 ? `0${breakTime.min}` : breakTime.min
                } : ${
                  breakTime.sec < 10 ? `0${breakTime.sec}` : breakTime.sec
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
            exerciseTime.min < 10 ? `0${exerciseTime.min}` : exerciseTime.min
          }:${
            exerciseTime.sec < 10 ? `0${exerciseTime.sec}` : exerciseTime.sec
          })`}</Text>
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
              breakTime.min < 10 ? `0${breakTime.min}` : breakTime.min
            }:${
              breakTime.sec < 10 ? `0${breakTime.sec}` : breakTime.sec
            })`}</Text>
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
        exerciseTime={exerciseTime}
        setExerciseTime={setExerciseTime}
        breakTime={breakTime}
        setBreakTime={setBreakTime}
        isMove={isMove}
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
