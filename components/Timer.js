import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons, Fontisto } from '@expo/vector-icons';
import Button from './Button';
import ModalPicker from './ModalPicker';
import List from './List';

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
  const [listMode, setListMode] = useState(true);
  const { height } = Dimensions.get('window');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  const timeBreak = () => {
    if (secondRef.current === 0) {
      setIsBreak(false);
    } else {
      secondRef.current--;
      setSecondsLeft(secondRef.current);
    }
  };

  const tick = () => {
    if (secondRef.current === 0) {
      setIsBreak(true);
    } else {
      secondRef.current--;
      setSecondsLeft(secondRef.current);
    }
  };

  useEffect(() => {
    secondRef.current = !isBreak
      ? exerciseTime.min * 60 + exerciseTime.sec
      : breakTime.min * 60 + breakTime.sec;

    setSecondsLeft(secondRef.current);

    const play = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (isBreak) {
        timeBreak();
      } else {
        tick();
      }
    }, 1000);

    return () => clearInterval(play);
  }, [isBreak, exerciseTime]);

  const play = () => {
    setIsPaused((prev) => (isPausedRef.current = !prev));
  };
  const reset = () => {
    setExerciseTime({ min: 1, sec: 10 });
    setBreakTime({ min: 0, sec: 30 });
    setIsPaused(() => (isPausedRef.current = true));
    setIsBreak(false);
  };

  const total = !isBreak
    ? exerciseTime.min * 60 + exerciseTime.sec
    : breakTime.min * 60 + breakTime.sec;
  const percentage = Math.floor((100 / parseInt(total)) * secondsLeft);
  console.log('to', percentage);
  const minute = Math.floor(secondsLeft / 60);
  const secon = secondsLeft % 60;

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
      {listMode ? (
        <>
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
                  ? `${minute < 10 ? `0${minute}` : minute} : ${
                      secon < 10 ? `0${secon}` : secon
                    } `
                  : `${minute < 10 ? `0${minute}` : minute} : ${
                      secon < 10 ? `0${secon}` : secon
                    } `}
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
                exerciseTime.min < 10
                  ? `0${exerciseTime.min}`
                  : exerciseTime.min
              }:${
                exerciseTime.sec < 10
                  ? `0${exerciseTime.sec}`
                  : exerciseTime.sec
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
        </>
      ) : (
        <List />
      )}
      <View style={{ marginTop: 30 }}>
        <NeuMorph boxSize={70}>
          <TouchableOpacity
            onPress={() => {
              setListMode((prev) => !prev);
            }}
          >
            <Fontisto name="list-2" size={28} color="white" />
          </TouchableOpacity>
        </NeuMorph>
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
