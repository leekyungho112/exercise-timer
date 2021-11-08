import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
const ModalPicker = ({
  isModal,
  setIsModal,
  isMove,
  exerciseTime,
  setExerciseTime,
  breakTime,
  setBreakTime,
}) => {
  const start = 0;
  const values = new Array(60).fill(0).map((_, i) => {
    const value = start + i;
    return value;
  });

  return (
    <Modal animationType="slide" transparent={true} visible={isModal}>
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          position: 'relative',
        }}
      >
        <View
          style={{
            backgroundColor: 'white',
            width: '100%',
            height: '40%',
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Picker
            style={{
              flex: 0.5,
              marginTop: 15,
            }}
            selectedValue={isMove ? exerciseTime.min : breakTime.brmin}
            onValueChange={(itemValue) => {
              isMove
                ? setExerciseTime({ ...exerciseTime, min: itemValue })
                : setBreakTime({ ...breakTime, brmin: itemValue });
            }}
          >
            {values.length > 0 &&
              values.map((item, index) => (
                <Picker.Item key={index} label={String(index)} value={item} />
              ))}
          </Picker>
          <TouchableOpacity onPress={() => setIsModal(!isModal)}>
            <Text style={{ top: 10 }}>
              <Fontisto name="close" size={30} color="black" />
            </Text>
          </TouchableOpacity>
          <Picker
            style={{ flex: 0.5, marginTop: 15 }}
            selectedValue={isMove ? exerciseTime.sec : breakTime.brsec}
            onValueChange={(itemValue) =>
              isMove
                ? setExerciseTime({ ...exerciseTime, sec: itemValue })
                : setBreakTime({ ...breakTime, brsec: itemValue })
            }
          >
            {values.length > 0 &&
              values.map((item, index) => (
                <Picker.Item key={index} label={String(index)} value={item} />
              ))}
          </Picker>
        </View>
      </View>
    </Modal>
  );
};

export default ModalPicker;
