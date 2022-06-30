import {
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';
import React, { FC } from 'react';
import { icons, ICONS_NAME } from '../../constants/Icon';

interface ButtonProps {
  onPress: () => void;
  text: string;
  onlyText?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconName?: ICONS_NAME;
}

const Button: FC<ButtonProps> = ({
  onPress,
  onlyText = true,
  text,
  style,
  textStyle,
  iconName,
}) => {
  return (
    <Pressable
      style={[onlyText && !style && styles.container, style]}
      onPress={onPress}
    >
      {iconName && <Image style={styles.icon} source={icons[iconName]} />}
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
  icon: {
    width: 15,
    height: 15,
    marginRight: 10,
  },
});
