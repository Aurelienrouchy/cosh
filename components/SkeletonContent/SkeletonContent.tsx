import React, { FC, useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

interface SkeletonContentProps {
  style: ViewStyle;
}

const SkeletonContent: FC<SkeletonContentProps> = ({ style }) => {
  const animatedValue = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: animatedValue.value,
  }));

  useEffect(() => {
    animatedValue.value = withRepeat(withSpring(1), -1, true);

    return () => {
      animatedValue.value = 0;
    };
  }, []);

  return <Animated.View style={[styles.container, animatedStyle, style]} />;
};

export default SkeletonContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// #e4e5e3
// #f0f3f2
