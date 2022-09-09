import React, { FC, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { width } from '../../constants/Layout';
import { PRICE_RANGE } from '../../services/types';

interface PriceRangeProps {
  onChange: (value: PRICE_RANGE) => void;
}

const PriceRange: FC<PriceRangeProps> = ({ onChange }) => {
  const prices: PRICE_RANGE[] = [
    PRICE_RANGE.$,
    PRICE_RANGE.$$,
    PRICE_RANGE.$$$,
    PRICE_RANGE.$$$$,
  ];
  const [active, setActive] = useState<number>();

  const handleSelect = (price: PRICE_RANGE, index: number) => {
    setActive(index);
    onChange(price);
  };

  return (
    <View style={styles.container}>
      {prices.map((price, index) => (
        <TouchableOpacity
          key={price}
          style={[styles.price, index === active ? styles.active : null]}
          onPress={() => handleSelect(price, index)}
        >
          <Text>{price}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default PriceRange;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: width - 40,
    backgroundColor: '#e9effb',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
  },
  price: {
    width: (width - 70) / 4,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  active: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
