import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import CreateEventForm from '../components/CreateEventForm/CreateEventForm';
import CreatePlaceForm from '../components/CreatePlaceForm/CreatePlaceForm';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { width } from '../constants/Layout';
import { useEventsContext } from '../provider/EventProvider';
import { useNavigation } from '@react-navigation/native';

const CreateEventModal = () => {
  const { progress } = useEventsContext();
  const navigation = useNavigation();

  const translateXAnimated = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, -width]) },
    ],
    opacity: interpolate(progress.value, [0, 0.5, 1], [1, 0, 1]),
  }));

  const translateXArrowAnimated = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [-100, 0]) }],
  }));

  const translateYTextAnimated = useAnimatedStyle(() => ({
    transform: [{ translateY: interpolate(progress.value, [0, 1], [0, -50]) }],
    opacity: interpolate(progress.value, [0, 0.5, 1], [1, 0, 1]),
  }));

  const handleClosePlaceForm = () => {
    progress.value = withSpring(0, { mass: 0.5 });
  };

  const handleOpenPlaceForm = () => {
    progress.value = withSpring(1, { mass: 0.5 });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View style={[styles.iconContainer, translateXArrowAnimated]}>
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={handleClosePlaceForm}
          >
            <Image
              style={styles.icon}
              source={require('../assets/images/left-arrow.png')}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[styles.headerTextContainer, translateYTextAnimated]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Creer un event</Text>
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Ajouter un lieu</Text>
          </View>
        </Animated.View>

        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={styles.icon}
            source={require('../assets/images/close.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.innerContainer}>
        <Animated.View style={[styles.inner, translateXAnimated]}>
          <CreateEventForm onOpenPlaceForm={handleOpenPlaceForm} />
        </Animated.View>
        <Animated.View style={[styles.inner, translateXAnimated]}>
          <CreatePlaceForm />
        </Animated.View>
      </View>
    </View>
  );
};

export default CreateEventModal;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  innerContainer: {
    flex: 1,
    position: 'relative',
    width: width * 2,
    flexDirection: 'row',
  },
  inner: {
    flex: 1,
    position: 'relative',
    width,
  },
  header: {
    height: 50,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 30,
    height: 50,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: { width: 15, height: 15 },
  headerTextContainer: { height: 100 },
  titleContainer: { height: 50, justifyContent: 'center' },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
