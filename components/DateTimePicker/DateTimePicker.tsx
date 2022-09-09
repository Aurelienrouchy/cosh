import React, { Dispatch, FC, useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, TouchableOpacity, View, StyleSheet, Modal } from 'react-native';
import { height, width } from '../../constants/Layout';

interface DateTimePickerProps {
  onConfirm: (time: Date) => void;
  onCancel: () => void;
  isOpen: boolean;
}

export const TimePicker: FC<DateTimePickerProps> = ({
  onConfirm,
  onCancel,
  isOpen,
}) => {
  const [time, setTime] = useState<Date>(new Date());

  const handleConfirm = () => {
    onConfirm(time);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={isOpen}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={time}
            mode={'time'}
            is24Hour={true}
            onChange={(e, t) => {
              if (t) {
                setTime(t);
              }
            }}
            minuteInterval={30}
            display="spinner"
          />
          <TouchableOpacity
            onPress={handleConfirm}
            style={[styles.confirm, styles.button]}
          >
            <Text>Confirmer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={onCancel}
          style={[styles.cancel, styles.button]}
        >
          <Text>Annuler</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  pickerContainer: {
    width: width - 20,
    height: 270,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  button: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirm: {
    width: width - 22,
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: 1,
    borderBottomRadius: 20,
  },
  cancel: {
    width: width - 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#000',
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
  },
});
