import { StyleSheet, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import { useAppStore } from '@/contexts/api/useAppStore';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Charts() {
  const theme = useTheme();
  const { chartData, clearData } = useAppStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
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
                color: (opacity = 1) => theme.colors.secondary + Math.floor(opacity * 255).toString(16),
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
        <Card.Actions>
          <Button onPress={clearData}>Clear Data</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: hp('2%'), paddingHorizontal: wp('5%') },
  card: { marginVertical: hp('2%'), borderRadius: 8, elevation: 2 },
  chart: { marginVertical: hp('1.5%'), borderRadius: 12, alignSelf: 'center' },
  noData: { textAlign: 'center', marginVertical: hp('4%'), fontSize: hp('2%') },
});
