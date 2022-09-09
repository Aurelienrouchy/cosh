import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { width } from '../../constants/Layout';
import { TimePicker } from '../DateTimePicker/DateTimePicker';

interface HoursProps {
  onChange?: (hours: number[]) => void;
  onAdd?: (hours: number[]) => void;
  onDelete?: () => void;
  index: number;
  type: OPEN_HOURS_SELECTOR_TYPE;
  value: number[];
}

enum OPEN_HOURS_SELECTOR_TYPE {
  ADD = 'add',
  DELETE = 'delete',
}

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const dateToNumber = (date: Date, index: number): number => {
  return index * 48 + date.getHours() * 2 + (date.getMinutes() === 0 ? 0 : 1);
};

const numberToDate = (number: number, index: number): string => {
  const rest = number % 2;
  const hour = (number - index * 48 - rest) / 2;
  return `${hour === 0 ? '00' : hour}:${rest === 0 ? '00' : '30'}`;
};

const Hours: FC<HoursProps> = ({
  type,
  onAdd,
  onDelete,
  index,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hours, setHours] = useState<number[]>([value[0], value[1]]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    onChange?.(hours);
  }, [hours]);

  const hancleConfirm = (time: Date) => {
    hours[current] = dateToNumber(time, index);
    setHours([...hours]);
    setIsOpen(false);
  };
  const handlePressFrom = () => {
    setIsOpen(true);
    setCurrent(0);
  };
  const handlePressTo = () => {
    setIsOpen(true);
    setCurrent(1);
  };

  const handleAdd = () => {
    onAdd?.(hours);
    setHours([index, index]);
  };
  return (
    <View style={styles.hourContainer}>
      <TimePicker
        isOpen={isOpen}
        onConfirm={hancleConfirm}
        onCancel={() => setIsOpen(false)}
      />
      <TouchableOpacity style={styles.hour} onPress={handlePressFrom}>
        <Text style={styles.dayText}>{numberToDate(hours[0], index)}</Text>
      </TouchableOpacity>
      <Text style={styles.dayText}>to</Text>
      <TouchableOpacity style={styles.hour} onPress={handlePressTo}>
        <Text style={styles.dayText}>{numberToDate(hours[1], index)}</Text>
      </TouchableOpacity>
      {type === OPEN_HOURS_SELECTOR_TYPE.ADD ? (
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.dayText}>Ajouter</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.dayText}>Delete</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

interface OpenHoursSeletorProps {
  onChange: (hours: number[][]) => void;
  value: number[][];
}

const OpenHoursSeletor: FC<OpenHoursSeletorProps> = ({ onChange, value }) => {
  const [hours, setHours] = useState<number[][][]>(
    value ? value : new Array(7).fill([]),
  );
  const [active, setActive] = useState(0);

  useEffect(() => {
    onChange(hours.flat());
  }, [hours]);

  const handlePressDay = (index: number) => {
    setActive(index);
  };

  const handleAddHour = (newHours: number[]) => {
    setHours(
      hours.map((hour: number[][], index) => {
        return active === index ? [...hour, newHours] : hour;
      }),
    );
  };

  const handleDeleteHour = (hourTodeleted: number[], idx: number) => {
    setHours(
      hours.map((hour: number[][], index) => {
        return active === index
          ? hour.filter((hourToFilter, i) => i !== idx)
          : hour;
      }),
    );
  };

  const handleChangeHour = (changedHours: number[], idx: number) => {
    setHours(
      hours.map((hour: number[][], index) => {
        return active === index
          ? hour.map((h, i) => (i === idx ? changedHours : h))
          : hour;
      }),
    );
  };

  return (
    <>
      <View style={styles.container}>
        {DAYS.map((day, index) => (
          <TouchableOpacity
            style={[styles.day, index === active ? styles.active : null]}
            key={index}
            onPress={() => handlePressDay(index)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {hours[active].map((hour, index) => (
        <Hours
          key={`${active}-${index}-${hour}`}
          onDelete={() => handleDeleteHour(hour, index)}
          onChange={(changedHours) => handleChangeHour(changedHours, index)}
          index={active}
          type={OPEN_HOURS_SELECTOR_TYPE.DELETE}
          value={hour}
        />
      ))}

      <Hours
        key={`${active}-${hours}`}
        onAdd={(newHours: number[]) => handleAddHour(newHours)}
        index={active}
        type={OPEN_HOURS_SELECTOR_TYPE.ADD}
        value={[active * 48, active * 48]}
      />
    </>
  );
};

export default OpenHoursSeletor;

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
  day: {
    width: (width - 100) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
  dayText: {},
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
  hourContainer: {
    height: 40,
    width: width - 40,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    width: (width - 100) / 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e9effb',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  deleteButton: {
    width: (width - 100) / 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffb6b6',
    borderRadius: 10,
  },
  hour: {
    width: (width - 100) / 3,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
  },
});
