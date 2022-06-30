import { useMapContext } from '../../provider/MapProvider';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../constants/Layout';
import React from 'react';
import { Slider } from '@miblanchard/react-native-slider';
import AddressFinder from '../AddressFinder/AddressFinder';
import RadiusSelector from '../RadiusSelector/RadiusSelector';

const AddressEditorModal = () => {
  const { setIsOpenAddressEditor, isOpenAddressEditor } = useMapContext();

  return (
    <Modal
      isVisible={isOpenAddressEditor}
      swipeDirection="down"
      avoidKeyboard={true}
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onSwipeComplete={() => setIsOpenAddressEditor(false)}
      onBackdropPress={() => setIsOpenAddressEditor(false)}
    >
      <View style={styles.container}>
        {/* <AddressFinder /> */}
        <RadiusSelector />
      </View>
    </Modal>
  );
};

export default AddressEditorModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 10,
    marginBottom: 0,
  },
  container: {
    height: height / 2,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  rangeContainer: {
    width: width - 60,
    padding: 10,
  },
  rangeText: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 10,
  },
});
