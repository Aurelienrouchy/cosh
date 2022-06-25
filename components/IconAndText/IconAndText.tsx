import React, { FC } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import { height, width } from '../../constants/Layout';

interface IconAndTextProps {
  icon: string;
  title: string;
  subTitle: string;
  onClick?: () => {};
  style?: any;
  hasIconRight?: boolean;
}

const IconAndText: FC<IconAndTextProps> = ({
  icon,
  title,
  subTitle,
  onClick,
  style,
  hasIconRight = true,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={{ uri: icon }} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subTitle} numberOfLines={1}>
          {subTitle}
        </Text>
      </View>
      <Image
        style={styles.arrow}
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/271/271228.png',
        }}
      />
    </View>
  );
};

export default IconAndText;

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: '#ffd1d1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  arrow: { position: 'absolute', right: 10, top: 25, width: 10, height: 10 },
  textContainer: {
    flexDirection: 'column',
    height: 60,
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    width: width - 130,
    overflow: 'hidden',
  },
  subTitle: {
    fontSize: 18,
    width: width - 130,
    overflow: 'hidden',
  },
});
