import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Modal, Portal, TextInput, Button, useTheme, Menu } from 'react-native-paper';
import { WorkoutExercise, WorkoutPlan } from '@/contexts/api/workout';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSave: (plan: WorkoutPlan) => void;
  initialData?: WorkoutPlan | null;
};

export default function PlanAdd({ visible, onDismiss, onSave, initialData }: Props) {
  const theme = useTheme();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState('');
  const [exercises, setExercises] = useState<WorkoutExercise[]>([]);

  const [type, setType] = useState<'Reps' | 'Duration' | 'Distance' | ''>('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [exName, setExName] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  useEffect(() => {
    if (visible) {
      if (initialData) {
        setName(initialData.name);
        setExercises(initialData.exercises);
        setStep(2);
      } else {
        setName('');
        setExercises([]);
        setStep(1);
      }
      resetExerciseFields();
    }
  }, [visible, initialData]);

  const resetExerciseFields = () => {
    setType('');
    setExName('');
    setReps('');
    setSets('');
    setDuration('');
    setDistance('');
  };

  const handleAddExercise = () => {
    if (!exName.trim() || !type) return;

    const newExercise: WorkoutExercise = {
      id: Date.now(),
      name: exName,
      type,
      reps: type === 'Reps' ? +reps : undefined,
      sets: type === 'Reps' ? +sets : undefined,
      duration: type === 'Duration' ? +duration : undefined,
      distance: type === 'Distance' ? +distance : undefined,
    };

    setExercises((prev) => [...prev, newExercise]);
    resetExerciseFields();
  };

  const handleSave = () => {
    if (!name.trim()) return;

    const updatedPlan: WorkoutPlan = {
      id: initialData?.id ?? Date.now(),
      name,
      exercises,
    };

    onSave(updatedPlan);
    setName('');
    setExercises([]);
    setStep(1);
    resetExerciseFields();
  };

  const handleDismiss = () => {
    onDismiss();
    setStep(1);
    setName('');
    setExercises([]);
    resetExerciseFields();
  };

  return (
    <Portal>
    <Modal visible={visible} onDismiss={handleDismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.modal, { backgroundColor: theme.colors.surface }]}
      >
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: hp('3%') }}
        >
        {step === 1 ? (
          <>
            <Text style={[styles.title, { color: theme.colors.primary }]}>Workout Plan</Text>
            <TextInput
              label="Plan Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => setStep(2)}
              disabled={!name.trim()}
              style={{ marginTop: hp('2%') }}
            >
              Next
            </Button>
          </>
        ) : (
          <>
            <Text style={[styles.title, { color: theme.colors.primary }]}>{name}</Text>

            <TextInput
              label="Exercise Name"
              value={exName}
              onChangeText={setExName}
              mode="outlined"
              style={styles.input}
            />

            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TextInput
                  label="Exercise Type"
                  value={type}
                  mode="outlined"
                  editable={false}
                  onPressIn={() => setMenuVisible(true)}
                  style={styles.input}
                />
              }
              contentStyle={{ backgroundColor: theme.colors.surface }}
            >
              <Menu.Item
                onPress={() => {
                  setType('Reps');
                  setMenuVisible(false);
                }}
                title="Reps & Sets"
              />
              <Menu.Item
                onPress={() => {
                  setType('Duration');
                  setMenuVisible(false);
                }}
                title="Duration (minutes)"
              />
              <Menu.Item
                onPress={() => {
                  setType('Distance');
                  setMenuVisible(false);
                }}
                title="Distance (KM)"
              />
            </Menu>

            {type === 'Reps' && (
              <View style={styles.row}>
                <TextInput
                  label="Reps"
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="numeric"
                  mode="outlined"
                  style={[styles.input, styles.half]}
                />
                <TextInput
                  label="Sets"
                  value={sets}
                  onChangeText={setSets}
                  keyboardType="numeric"
                  mode="outlined"
                  style={[styles.input, styles.half]}
                />
              </View>
            )}

            {type === 'Duration' && (
              <TextInput
                label="Duration (minutes)"
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
            )}

            {type === 'Distance' && (
              <TextInput
                label="Distance (KM)"
                value={distance}
                onChangeText={setDistance}
                keyboardType="numeric"
                mode="outlined"
                style={styles.input}
              />
            )}

            <Button
              onPress={handleAddExercise}
              mode="contained"
              style={{ marginBottom: hp('1.5%') }}
            >
              Add Exercise
            </Button>

            {exercises.map((e, i) => (
              <Text key={i} style={{ marginBottom: 2 }}>
                - {e.name} {e.type === 'Reps' && `${e.reps || ''} reps x ${e.sets || ''} sets`}
                {e.type === 'Duration' && `${e.duration} min`}
                {e.type === 'Distance' && `${e.distance} km`}
              </Text>
            ))}

            <View style={styles.row}>
              <Button mode="contained" onPress={handleSave} style={styles.btn}>
                Save
              </Button>
              <Button
                mode="outlined"
                onPress={handleDismiss}
                style={[styles.btn, { borderColor: theme.colors.primary }]}
              >
                Cancel
              </Button>
            </View>
          </>
        )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  </Portal>
);
}

const styles = StyleSheet.create({
  modal: { margin: hp('3%'), padding: hp('3%'), borderRadius: hp('1%') },
  title: { fontSize: hp('2%'), fontWeight: '600', marginBottom: hp('2%') },
  input: { marginBottom: hp('1%') },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: hp('1%'),
    marginTop: hp('1%'),
  },
  btn: { flex: 1, borderRadius: hp('2%') },
  half: { flex: 1 },
});
