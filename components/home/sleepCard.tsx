import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { format, subDays } from 'date-fns';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const sleepData = [5, 7, 6, 5, 6, 4, 5];

export default function SleepCard() {
  const theme = useTheme();

  const today = new Date();
  const dayLabels = [...Array(7)].map((_, i) =>
    format(subDays(today, 6 - i), 'EEEEE')
  );

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Sleep Summary</Text>
          <Text style={[styles.sub, { color: theme.colors.onPrimaryContainer }]}>Last 7 days</Text>
        </View>
        <TouchableOpacity style={styles.iconBlock}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailBlock}>
          <Text style={[styles.duration, { color: theme.colors.primary }]}>5h</Text>
          <Text style={[styles.label, { color: theme.colors.secondary }]}>Today</Text>
        </View>

        <View style={styles.chartBlock}>
          {sleepData.map((hours, i) => (
            <View key={i} style={styles.barWrapper}>
              <View
                style={[
                  styles.bar,
                  {
                    height: `${hours * 10}%`,
                    backgroundColor:
                      i === sleepData.length - 1
                        ? theme.colors.primary
                        : `${theme.colors.secondary}66`,
                  },
                ]}
              />
              <Text
                style={[
                  styles.barLabel,
                  {
                    color:
                      i === sleepData.length - 1
                        ? theme.colors.primary
                        : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {dayLabels[i]}
              </Text>
            </View>
          ))}
        </View>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  textBlock: { flex: 1 },
  iconBlock: { justifyContent: 'center', alignItems: 'flex-end' },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingTop: hp('0.5%'),
  },
  detailBlock: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: hp('1%'),
  },
  chartBlock: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: hp('1.5%'),
  },
  barWrapper: {
    width: wp('4%'),
    height: hp('7%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bar: {
    width: '100%',
    borderTopLeftRadius: hp('0.4%'),
    borderTopRightRadius: hp('0.4%'),
  },
  barLabel: {
    fontSize: hp('1.3%'),
    fontWeight: '500',
    marginTop: hp('0.3%'),
  },
  title: {
    fontSize: hp('1.9%'),
    fontWeight: '600',
  },
  sub: {
    fontSize: hp('1.4%'),
    fontWeight: '400',
  },
  duration: {
    fontSize: hp('2.8%'),
    fontWeight: '700',
  },
  label: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    marginTop: hp('0.3%'),
  },
});
