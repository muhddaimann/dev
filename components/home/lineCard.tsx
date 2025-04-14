import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useAppStore } from '@/contexts/api/useAppStore';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function LineCard() {
  const theme = useTheme();
  const { chartData, addDataPoint, clearData } = useAppStore();

  const addRandomData = () => {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomValue = Math.floor(Math.random() * 100);
    const nextMonth = months[chartData.length % months.length];
    addDataPoint({ value: randomValue, label: nextMonth });
  };

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <Card.Content>
        {chartData.length > 0 ? (
          <LineChart
            data={{
              labels: chartData.map((point) => point.label),
              datasets: [{ data: chartData.map((point) => point.value) }],
            }}
            width={wp('90%')}
            height={hp('28%')}
            chartConfig={{
              backgroundColor: theme.colors.surface,
              backgroundGradientFrom: theme.colors.surface,
              backgroundGradientTo: theme.colors.surface,
              decimalPlaces: 0,
              color: (opacity = 1) =>
                theme.colors.secondary + Math.floor(opacity * 255).toString(16),
              labelColor: () => theme.colors.onSurface,
              propsForDots: {
                r: '4',
                strokeWidth: '2',
                stroke: theme.colors.primary,
              },
            }}
            style={styles.chart}
            bezier
          />
        ) : (
          <Text style={[styles.noData, { color: theme.colors.outline }]}>No data available</Text>
        )}
      </Card.Content>
      <View style={styles.buttonRow}>
        <Button
          mode="contained"
          buttonColor={theme.colors.primary}
          onPress={addRandomData}
          style={styles.button}
        >
          Add Data
        </Button>
        <Button
          mode="outlined"
          onPress={clearData}
          style={[styles.button, { borderColor: theme.colors.primary }]}
        >
          Clear
        </Button>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  chart: { marginVertical: hp('1.5%'), borderRadius: 12, alignSelf: 'center' },
  noData: { textAlign: 'center', marginVertical: hp('4%'), fontSize: hp('2%') },
  buttonRow: {
    flexDirection: 'row',
    gap: hp('1%'),
    paddingHorizontal: hp('1%'),
    marginBottom: hp('2%'),
  },
  button: { flex: 1, borderRadius: hp('1%'), height: hp('5.5%'), justifyContent: 'center' },
});
