import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Text, Checkbox, Divider, useTheme, FAB, ProgressBar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const initialExercises = [
  { id: 1, name: 'Push-Ups', completed: false },
  { id: 2, name: 'Squats', completed: false },
  { id: 3, name: 'Plank', completed: false },
  { id: 4, name: 'Jumping Jacks', completed: false },
  { id: 5, name: 'Lunges', completed: false },
];

export default function Checklist() {
  const theme = useTheme();
  const [exercises, setExercises] = useState(initialExercises);

  const toggleCheck = (id: number) => {
    setExercises(prev =>
      prev.map(ex => (ex.id === id ? { ...ex, completed: !ex.completed } : ex))
    );
  };

  const resetChecklist = () => {
    setExercises(initialExercises);
  };

  const completedCount = exercises.filter(ex => ex.completed).length;
  const progress = completedCount / exercises.length;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false} bounces={false}>
        <Text style={[styles.title, { color: theme.colors.primary }]}>Today's Workout</Text>
        <Divider style={{ marginBottom: hp('2%') }} />

        {exercises.map(ex => (
          <Checkbox.Item
            key={ex.id}
            label={ex.name}
            status={ex.completed ? 'checked' : 'unchecked'}
            onPress={() => toggleCheck(ex.id)}
            labelStyle={{ fontSize: hp('2%') }}
          />
        ))}

        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progress}
        />

        <Text style={[styles.progressText, { color: theme.colors.onBackground }]}>
          {completedCount} of {exercises.length} completed
        </Text>
      </ScrollView>

      <FAB
        icon="refresh"
        style={[styles.fab, { backgroundColor: theme.colors.error }]}
        color={theme.colors.onError}
        onPress={resetChecklist}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollBody: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('3%'),
    paddingBottom: hp('12%'), // Space for FAB
  },
  title: {
    fontSize: hp('2.8%'),
    fontWeight: '700',
    marginBottom: hp('1%'),
  },
  progress: {
    height: hp('1%'),
    marginTop: hp('2%'),
    borderRadius: hp('1%'),
  },
  progressText: {
    textAlign: 'center',
    marginTop: hp('1%'),
    fontSize: hp('1.8%'),
  },
  fab: {
    position: 'absolute',
    right: hp('2%'),
    bottom: hp('2%'),
  },
});
