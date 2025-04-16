import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { format } from 'date-fns';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function DailyCard() {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          {format(new Date(), 'EEE, MMM d')}
        </Text>

        <TouchableOpacity style={styles.iconBlock}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.ti, { color: theme.colors.primary }]}>2/5</Text>
          <Text style={[styles.sub, { color: theme.colors.secondary }]}>Achieved</Text>
        </View>

        <View style={styles.visualBlock}>
          <View style={styles.visualBlock}>
            <View style={styles.barContainer}>
              {[...Array(5)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.barSegment,
                    {
                      backgroundColor: i < 2 ? theme.colors.primary : `${theme.colors.secondary}55`,
                    },
                  ]}
                />
              ))}
            </View>
          </View>
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
    justifyContent: 'space-between',
    marginVertical: hp('0.5%'),
  },
  textBlock: { flex: 1, justifyContent: 'center' },
  iconBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  visualBlock: { justifyContent: 'center', alignItems: 'flex-end' },
  title: { fontSize: hp('2%'), fontWeight: '600' },
  subtitle: { fontSize: hp('1.6%'), fontWeight: '600' },
  ti: { fontSize: hp('3%'), fontWeight: '600' },
  sub: { fontSize: hp('1.5%'), fontWeight: '400' },
  barContainer: {
    flexDirection: 'row',
    gap: wp('1%'),
  },
  barSegment: {
    width: wp('4%'),
    height: hp('3%'),
    borderRadius: hp('0.5%'),
  },

  visual: { fontSize: hp('2.5%'), fontWeight: '700' },
});
