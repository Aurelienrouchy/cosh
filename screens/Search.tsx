import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '../components/Themed';
import ChangeAddress, {
  CHANGE_ADDRESS_HEIGHT,
} from '../components/ChangeAddress/ChangeAddress';
import { width } from '../constants/Layout';
import SwitchButton, {
  SWITCH_BUTTON_HEIGHT,
} from '../components/SwitchButton/SwitchButton';
import EventsList from '../components/EventsList/EventsList';
import { BlurView } from 'expo-blur';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { default as MapComponent } from '../components/Map/Map';

export default function Search() {
  const progress = useSharedValue(0);
  const translateXAnimated = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(progress.value, [0, 1], [0, -width]) },
    ],
  }));

  return (
    <View style={styles.container}>
      <BlurView intensity={10} style={styles.header}>
        {/*<ChangeAddress />*/}
        <SwitchButton
          texts={['Liste', 'Plan']}
          progress={progress}
          onClick={(key) => {
            progress.value = withSpring(key === 'Liste' ? 0 : 1, {
              mass: 0.6,
            });
          }}
        />
      </BlurView>
      <View style={styles.container}>
        <Animated.View style={[styles.inner, translateXAnimated]}>
          <EventsList />
        </Animated.View>
        <Animated.View style={[styles.inner, translateXAnimated]}>
          <MapComponent />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
    ...StyleSheet.absoluteFillObject,
    zIndex: 200,
    width,
    paddingTop: 20,
    paddingHorizontal: 20,
    height: SWITCH_BUTTON_HEIGHT + 20,
  },
  headerPlan: {},
  buttons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    height: 50,
    width,
    overflow: 'hidden',
  },
  button: {
    width: (width - 40) / 2,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLeft: {
    borderRightWidth: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonRight: {
    borderLeftWidth: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
