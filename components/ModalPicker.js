import { Picker } from '@react-native-picker/picker';
import React from 'react';
import { View, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
const ModalPicker = ({
  isModal,
  setIsModal,
  setExMinutes,
  exMinutes,
  setExSecond,
  exSecond,
  isMove,
  brMinutes,
  setBrMinutes,
  brSecond,
  setBrSecond,
}) => {
  const { width, height } = Dimensions.get('window');
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
          <TouchableOpacity onPress={() => setIsModal(!isModal)}>
            <Text
              style={{
                left: 190,
                top: 5,
                position: 'absolute',
              }}
            >
              <Fontisto name="close" size={30} color="red" />
            </Text>
          </TouchableOpacity>
          <Picker
            style={{
              flex: 0.5,

              marginTop: 15,
            }}
            selectedValue={isMove ? exMinutes : brMinutes}
            onValueChange={(itemValue, itemIndex) =>
              isMove
                ? setExMinutes(Number(itemValue))
                : setBrMinutes(Number(itemValue))
            }
          >
            {values.length > 0 &&
              values.map((item, index) => (
                <Picker.Item key={index} label={String(index)} value={item} />
              ))}
          </Picker>
          <Picker
            style={{ flex: 0.5, marginTop: 15 }}
            selectedValue={isMove ? exSecond : brSecond}
            onValueChange={(itemValue, itemIndex) =>
              isMove
                ? setExSecond(Number(itemValue))
                : setBrSecond(Number(itemValue))
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
