import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MaterialIcons, Fontisto } from '@expo/vector-icons';
import Button from './Button';
import ModalPicker from './ModalPicker';
import List from './List';
import NeuMorph from './NeuMorph';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

const Timer = () => {
  const [exerciseTime, setExerciseTime] = useState({
    min: 1,
    sec: 10,
  });
  const [breakTime, setBreakTime] = useState({
    brmin: 0,
    brsec: 30,
  });
  const [isMove, setIsMove] = useState(true);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [listMode, setListMode] = useState(true);
  const [countSet, setCountSet] = useState(1);
  const { height } = Dimensions.get('window');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const secondRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const [time, setTime] = useState([]);
  const [count, setCount] = useState(0);
  const [sound, setSound] = useState(null);
  const [volume, setVolume] = useState(0);

  const palySound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      !isBreak
        ? require('.././assets/wood.mp3')
        : require('.././assets/action.mp3')
    );
    await sound.setVolumeAsync(volume);
    setSound(sound);

    await sound.playAsync();
  };
  useEffect(() => {
    return sound ? () => sound.unloadAsync() : undefined;
  }, [sound, volume]);

  const saveTime = () => {
    setTime(() => {
      return [...time, { ...exerciseTime, ...breakTime, countSet }];
    });
  };
  const timeBreak = () => {
    if (secondRef.current === 0) {
      setIsBreak(false);
    } else {
      secondRef.current--;
      setSecondsLeft(secondRef.current);
      if (secondRef.current < 5) {
        palySound();
      }
    }
  };

  const tick = () => {
    if (secondRef.current === 0) {
      setIsBreak(true);
      setCount((prevState) => prevState + 1);
    } else {
      secondRef.current--;
      setSecondsLeft(secondRef.current);
      if (secondRef.current < 5) {
        palySound();
      }
    }
  };

  useEffect(() => {
    secondRef.current = !isBreak
      ? exerciseTime.min * 60 + exerciseTime.sec
      : breakTime.brmin * 60 + breakTime.brsec;

    setSecondsLeft(secondRef.current);

    const play = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (count === countSet) {
        reset();
        saveTime();
      } else {
        if (isBreak) {
          timeBreak();
        } else {
          tick();
        }
      }
    }, 1000);

    return () => clearInterval(play);
  }, [isBreak, exerciseTime, breakTime]);

  const play = () => {
    setIsPaused((prev) => (isPausedRef.current = !prev));
  };
  const reset = () => {
    setExerciseTime({ min: 1, sec: 10 });
    setBreakTime({ brmin: 0, brsec: 30 });
    setIsPaused(() => (isPausedRef.current = true));
    setIsBreak(false);
    setCountSet(1);
    setCount(0);
  };
  const increase = () => {
    setCountSet((prevState) => prevState + 1);
  };
  const decrease = () => {
    setCountSet((prevState) => (prevState === 0 ? 0 : prevState - 1));
  };

  const total = !isBreak
    ? exerciseTime.min * 60 + exerciseTime.sec
    : breakTime.brmin * 60 + breakTime.brsec;

  const percentage = Math.floor((100 / total) * secondsLeft);
  const minute = Math.floor(secondsLeft / 60);
  const secon = secondsLeft % 60;
  console.log(volume);
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
          <View style={{ marginTop: 40 }}>
            <NeuMorph boxSize={150}>
              {!isBreak ? (
                <Image
                  style={styles.logo}
                  source={require('.././assets/images/move.gif')}
                />
              ) : (
                <Image
                  style={styles.logo}
                  source={require('.././assets/images/rest.gif')}
                />
              )}

              <Text
                style={{
                  color: !isBreak ? '#29C5BC' : '#048FA3',
                  fontSize: 30,
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: 20,
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
                      backgroundColor: !isBreak ? '#80F9C0' : '#BA9300',
                      width: `${percentage}%`,
                      borderRadius: 5,
                      height: 9,
                    })
                  }
                />
              </View>
            </NeuMorph>
          </View>
          <NeuMorph>
            <Slider
              style={{
                width: '90%',
                height: 8,
              }}
              value={volume}
              onValueChange={(vol) => setVolume(vol)}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              minimumValue={0}
              maximumValue={1}
            />
          </NeuMorph>
          <Text style={styles.set}>{`Set ${count} of ${countSet}`}</Text>
          <View style={{ marginVertical: 25 }}>
            <NeuMorph>
              <View style={styles.inputs}>
                <Text style={styles.inputText}>Set Number</Text>
                <View style={styles.countBtn}>
                  <TouchableOpacity onPress={decrease}>
                    <NeuMorph boxSize={40}>
                      <Fontisto name="minus-a" size={18} color="#92ff38" />
                    </NeuMorph>
                  </TouchableOpacity>
                  <Text style={styles.countText}>{countSet}</Text>
                  <TouchableOpacity onPress={increase}>
                    <NeuMorph boxSize={40}>
                      <Fontisto name="plus-a" size={18} color="#92ff38" />
                    </NeuMorph>
                  </TouchableOpacity>
                </View>
              </View>
            </NeuMorph>
          </View>
          <NeuMorph>
            <View style={styles.inputs}>
              <Text style={styles.inputText}>{`Action(${
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
                <MaterialIcons name="timer" size={30} color="#92ff38" />
              </TouchableOpacity>
            </View>
          </NeuMorph>
          <View style={{ marginVertical: 25 }}>
            <NeuMorph>
              <View style={styles.inputs}>
                <Text style={styles.inputText}>{`Break(${
                  breakTime.brmin < 10 ? `0${breakTime.brmin}` : breakTime.brmin
                }:${
                  breakTime.brsec < 10 ? `0${breakTime.brsec}` : breakTime.brsec
                })`}</Text>
                <TouchableOpacity
                  onPress={() => {
                    setIsModal(!isModal);
                    setIsMove(false);
                  }}
                >
                  <MaterialIcons name="timer" size={30} color="#92ff38" />
                </TouchableOpacity>
              </View>
            </NeuMorph>
          </View>
          <View style={{ marginTop: 5 }}>
            <Button
              play={play}
              isPaused={isPaused}
              reset={reset}
              NeuMorph={NeuMorph}
              setListMode={setListMode}
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
        <List time={time} setListMode={setListMode} countSet={countSet} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 50,
    marginBottom: 30,
  },
  progressBar: {
    backgroundColor: '#0F4B66',
    height: 9,
    flexDirection: 'row',
    width: '90%',
    borderRadius: 5,
  },
  set: {
    fontSize: 20,
    fontWeight: '600',
    color: '#92ff38',
  },
  inputs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
  },

  countBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#92ff38',
    fontSize: 24,
    fontWeight: '600',
    paddingHorizontal: 20,
  },

  inputText: {
    color: '#92ff38',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Timer;
