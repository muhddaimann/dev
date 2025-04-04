import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const categories = [
  { id: 1, name: 'Chest', description: 'Push-Ups, Bench Press, Flys' },
  { id: 2, name: 'Legs', description: 'Squats, Lunges, Leg Press' },
  { id: 3, name: 'Back', description: 'Pull-Ups, Deadlifts, Rows' },
  { id: 4, name: 'Core', description: 'Planks, Crunches, Russian Twists' },
  { id: 5, name: 'Arms', description: 'Bicep Curls, Tricep Dips' },
];

export default function Explore() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Explore Categories</Text>

        {categories.map(cat => (
          <TouchableOpacity key={cat.id} onPress={() => {}}>
            <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
              <Card.Content>
                <Text style={[styles.cardTitle, { color: theme.colors.onSurface }]}>
                  {cat.name}
                </Text>
                <Text style={[styles.cardDesc, { color: theme.colors.onSurfaceVariant }]}>
                  {cat.description}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollBody: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('4%'),
  },
  title: {
    fontSize: hp('2.6%'),
    fontWeight: '700',
    marginBottom: hp('2%'),
  },
  card: {
    marginBottom: hp('1.5%'),
    borderRadius: hp('1.2%'),
    elevation: 2,
  },
  cardTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
    marginBottom: hp('0.5%'),
  },
  cardDesc: {
    fontSize: hp('1.8%'),
    fontWeight: '400',
  },
});
