import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { LineChart } from 'react-native-chart-kit';
import { format, subDays } from 'date-fns';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const stepData = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

export default function StepCard() {
  const theme = useTheme();
  const today = new Date();
  const dayLabels = [...Array(7)].map((_, i) => format(subDays(today, 6 - i), 'EEEEE'));

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.onSurface }]}>Step Count</Text>
          <Text style={[styles.sub, { color: theme.colors.onPrimaryContainer }]}>Last 7 days</Text>
        </View>
        <TouchableOpacity style={styles.iconBlock}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <View style={styles.detailBlock}>
          <Text style={[styles.steps, { color: theme.colors.primary }]}>8,200</Text>
          <Text style={[styles.label, { color: theme.colors.secondary }]}>Today</Text>
        </View>

        <View style={styles.chartContainer}>
          <LineChart
            data={{
              labels: Array(7).fill(''),
              datasets: [{ data: stepData }],
            }}
            width={wp('65%')}
            height={hp('12%')}
            withDots
            withShadow
            withInnerLines={false}
            withOuterLines={false}
            bezier
            chartConfig={{
              backgroundColor: theme.colors.surface,
              backgroundGradientFrom: theme.colors.surface,
              backgroundGradientTo: theme.colors.surface,
              decimalPlaces: 0,
              color: () =>  `${theme.colors.secondary}66`,
              labelColor: () => 'transparent',
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: theme.colors.surface,
                fill: theme.colors.primary,
              },
              propsForBackgroundLines: {
                stroke: 'transparent',
              },
            }}
            style={styles.chart}
          />
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
    alignItems: 'center',
  },
  detailBlock: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: hp('1%'),
  },
  chartContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingLeft: hp('1%'),
  },
  chart: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    borderRadius: hp('1.5%'),
  },
  title: {
    fontSize: hp('1.9%'),
    fontWeight: '600',
  },
  sub: {
    fontSize: hp('1.4%'),
    fontWeight: '400',
  },
  steps: {
    fontSize: hp('2.6%'),
    fontWeight: '700',
  },
  label: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    marginTop: hp('0.3%'),
  },
});
