import { StyleSheet, View } from 'react-native';
import Modal from 'react-native-modal';
import { height, width } from '../../constants/Layout';
import React from 'react';
import { useEventsContext } from '../../provider/EventProvider';
import AddEventForm from '../AddEventForm/AddEventForm';

const AddEventModal = () => {
  const { isOpenAddEventModal, setIsOpenAddEventModal } = useEventsContext();

  return (
    <Modal
      isVisible={isOpenAddEventModal}
      swipeDirection="down"
      propagateSwipe={true}
      style={styles.modal}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      onSwipeComplete={() => setIsOpenAddEventModal(false)}
      onBackdropPress={() => setIsOpenAddEventModal(false)}
    >
      <View style={styles.container}>
        <AddEventForm />
      </View>
    </Modal>
  );
};

export default AddEventModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    height: height * 0.9,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
