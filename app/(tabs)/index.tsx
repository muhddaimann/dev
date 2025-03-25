import { StyleSheet, View } from 'react-native';
import { Button, Card, Text, Title, useTheme } from 'react-native-paper';
import { useAppStore } from '@/contexts/api/useAppStore';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Home() {
  const theme = useTheme();
  const { chartData, addDataPoint } = useAppStore();

  const addRandomData = () => {
    const months = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const randomValue = Math.floor(Math.random() * 100);
    const nextMonth = months[chartData.length % months.length];
    addDataPoint({ value: randomValue, label: nextMonth });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow, }]}>
        <Card.Content>
          <Title>Welcome to the Showcase App</Title>
          <Text>This app demonstrates the use of React Native Paper, Chart Kit and Zustand.</Text>
        </Card.Content>
        <Card.Actions>
          <Button onPress={addRandomData}>Add Random Data</Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: hp('2%') },
  card: { marginTop: hp('2%') },
});
