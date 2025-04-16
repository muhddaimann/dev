import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight, ChevronLeft } from 'lucide-react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { addDays, format, startOfWeek, isBefore, isAfter, isSameDay } from 'date-fns';

export default function WeeklyCard() {
  const theme = useTheme();
  const [weekOffset, setWeekOffset] = useState(0);

  const today = new Date();
  const currentWeekStart = addDays(startOfWeek(today, { weekStartsOn: 1 }), weekOffset * 7);

  const weekDays = [...Array(7)].map((_, i) => {
    const date = addDays(currentWeekStart, i);
    return {
      label: format(date, 'EEE'),
      date: format(date, 'd'),
      fullDate: format(date, 'yyyy-MM-dd'),
      isToday: isSameDay(date, today),
      isBeforeToday: isBefore(date, today),
      isAfterToday: isAfter(date, today),
    };
  });

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>
            {format(today, 'EEE, MMM d')}
          </Text>
        </View>

        <View style={styles.iconBlock}>
          <TouchableOpacity onPress={() => setWeekOffset(prev => prev - 1)}>
            <ChevronLeft size={hp('3%')} color={theme.colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setWeekOffset(prev => prev + 1)} style={{ marginLeft: hp('2%') }}>
            <ChevronRight size={hp('3%')} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.row, styles.barContainer]}>
        {weekDays.map((day, i) => {
          let backgroundColor = theme.colors.background;

          if (day.isToday) {
            backgroundColor = theme.colors.primary;
          } else if (day.isBeforeToday) {
            backgroundColor = `${theme.colors.secondary}66`;
          }

          return (
            <View key={i} style={styles.barItem}>
              <View
                style={[
                  styles.dayBlock,
                  {
                    backgroundColor,
                  },
                ]}
              >
                <Text
                  style={{
                    color: day.isToday
                      ? theme.colors.onPrimary
                      : theme.colors.onBackground,
                    fontWeight: '600',
                  }}
                >
                  {day.date}
                </Text>
              </View>
              <Text
                style={[
                  styles.dayLabel,
                  {
                    color: theme.colors.onSurface,
                  },
                ]}
              >
                {day.label}
              </Text>
            </View>
          );
        })}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2%'),
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: hp('0.5%'),
  },
  textBlock: { flex: 1 },
  iconBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: { fontSize: hp('2%'), fontWeight: '600' },
  barContainer: {
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    paddingHorizontal: wp('1%'),
  },
  barItem: {
    alignItems: 'center',
    gap: wp('1%'),
  },
  dayBlock: {
    width: wp('9%'),
    height: wp('12%'),
    borderRadius: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: hp('1.4%'),
    fontWeight: '500',
    marginTop: hp('0.3%'),
  },
});

