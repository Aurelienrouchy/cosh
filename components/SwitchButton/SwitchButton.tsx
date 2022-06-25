import React, { Pressable, StyleSheet } from 'react-native';
import { View } from '../Themed';
import { width } from '../../constants/Layout';
import Animated, {
  useAnimatedStyle,
  withSpring,
  interpolateColor,
  SharedValue,
} from 'react-native-reanimated';

interface SwitchButton<T> {
  texts: T[];
  onClick: (side: T) => void;
  progress: SharedValue<number>;
}

const SwitchButton = ({ texts, onClick, progress }: SwitchButton<string>) => {
  const handleClick = (text: string) => {
    onClick(text);
  };

  const blStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#000', '#FFF']),
  }));

  const lStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#FFF', '#000']),
  }));
  const brStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(progress.value, [0, 1], ['#FFF', '#000']),
  }));

  const rStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#000', '#FFF']),
  }));

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          progress.value = withSpring(0);
          handleClick(texts[0]);
        }}
      >
        <Animated.View style={[styles.button, styles.buttonLeft, blStyle]}>
          <Animated.Text style={[styles.text, lStyle]}>
            {texts[0]}
          </Animated.Text>
        </Animated.View>
      </Pressable>
      <Pressable
        onPress={() => {
          progress.value = withSpring(1);
          handleClick(texts[1]);
        }}
        style={[styles.button, styles.buttonRight]}
      >
        <Animated.View style={[styles.button, styles.buttonRight, brStyle]}>
          <Animated.Text style={[styles.text, rStyle]}>
            {texts[1]}
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

export const SWITCH_BUTTON_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: SWITCH_BUTTON_HEIGHT,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  button: {
    width: (width - 40) / 2,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  buttonLeft: {
    borderRightWidth: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
  },
  buttonRight: {
    borderLeftWidth: 1,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0,
    borderLeftColor: '#000',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SwitchButton;
