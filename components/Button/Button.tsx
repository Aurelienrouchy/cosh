import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { FC } from 'react';

interface ButtonProps {
  onPress: () => void;
  text: string;
  onlyText?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: FC<ButtonProps> = ({
  onPress,
  onlyText = true,
  text,
  style,
  textStyle,
}) => {
  return (
    <Pressable style={[onlyText && styles.container, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  text: {
    fontSize: 16,
    color: '#FFF',
  },
});
