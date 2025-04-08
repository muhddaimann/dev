import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Text,
  Modal,
  Portal,
  TextInput,
  Button,
  useTheme,
  IconButton,
  Menu,
} from 'react-native-paper';
import { WorkoutExercise, WorkoutPlan } from '@/contexts/api/workout';
import { KeyboardAvoidingView, Platform } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type Props = {
  visible: boolean;
  onDismiss: () => void;
  onSave: (updated: WorkoutPlan) => void;
  onDelete: (id: number) => void;
  initialData: WorkoutPlan;
};

export default function PlanEdit({ visible, onDismiss, onSave, onDelete, initialData }: Props) {
  const theme = useTheme();
  const [name, setName] = useState(initialData.name);
  const [exercises, setExercises] = useState<WorkoutExercise[]>(initialData.exercises);
  const [showAddForm, setShowAddForm] = useState(false);
  const [exName, setExName] = useState('');
  const [type, setType] = useState<'Reps' | 'Duration' | 'Distance' | ''>('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('');
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const resetExerciseFields = () => {
    setExName('');
    setType('');
    setReps('');
    setSets('');
    setDuration('');
    setDistance('');
    setShowAddForm(false);
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

  const handleDeleteExercise = (id: number) => {
    setExercises((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) return;
    onSave({ ...initialData, name, exercises });
    onDismiss();
  };

  const handleDeletePlan = () => {
    Alert.alert('Delete Plan', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          onDelete(initialData.id);
          onDismiss();
        },
      },
    ]);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
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
            <Text style={[styles.title, { color: theme.colors.primary }]}>Edit Workout Plan</Text>

            <TextInput
              placeholder="Plan name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              dense
              style={styles.input}
            />

            <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
              Current Exercises
            </Text>

            {exercises.length === 0 ? (
              <Text style={{ color: theme.colors.onSurface, opacity: 0.6 }}>
                No exercises added.
              </Text>
            ) : (
              exercises.map((e) => (
                <View
                  key={e.id}
                  style={[styles.exerciseItem, { backgroundColor: theme.colors.primaryContainer }]}
                >
                  <Text style={[styles.exerciseText, { color: theme.colors.onPrimaryContainer }]}>
                    {e.name} {e.type === 'Reps' && `• ${e.reps} reps x ${e.sets} sets`}
                    {e.type === 'Duration' && `• ${e.duration} min`}
                    {e.type === 'Distance' && `• ${e.distance} km`}
                  </Text>
                  <IconButton
                    icon="trash-can"
                    size={18}
                    onPress={() => handleDeleteExercise(e.id)}
                    rippleColor="transparent"
                    iconColor={theme.colors.error}
                  />
                </View>
              ))
            )}

            {!showAddForm ? (
              <Button
                mode="text"
                onPress={() => setShowAddForm(true)}
                style={{ marginTop: hp('1%') }}
              >
                + Add Exercise
              </Button>
            ) : (
              <>
                <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                  New Exercise
                </Text>

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

                <View style={styles.row}>
                  <Button onPress={handleAddExercise} mode="contained" style={styles.btn}>
                    Add
                  </Button>
                  <Button
                    mode="outlined"
                    onPress={() => {
                      resetExerciseFields();
                      setShowAddForm(false);
                    }}
                    textColor={theme.colors.primary}
                    style={[styles.btn, { borderColor: theme.colors.primary }]}
                  >
                    Cancel
                  </Button>
                </View>
              </>
            )}

            <View style={styles.buttonRow}>
              <Button mode="contained" onPress={handleSave} style={styles.btn}>
                Save
              </Button>
              <Button
                mode="outlined"
                onPress={handleDeletePlan}
                textColor={theme.colors.error}
                style={[styles.btnn, { borderColor: theme.colors.error }]}
              >
                Delete
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: hp('3%'),
    padding: hp('2.5%'),
    borderRadius: hp('1%'),
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  input: {
    marginBottom: hp('1.2%'),
  },
  sectionTitle: {
    fontSize: hp('1.7%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.7%'),
    paddingLeft: hp('1.5%'),
    paddingRight: hp('0.5%'),
    borderRadius: hp('1%'),
    marginBottom: hp('1%'),
  },
  exerciseText: {
    flex: 1,
    fontSize: hp('1.65%'),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1'),
    gap: hp('1%'),
  },
  half: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2'),
    gap: hp('1%'),
  },
  btn: {
    flex: 2,
    borderRadius: hp('2%'),
  },
  btnn: {
    flex: 1,
    borderRadius: hp('2%'),
  },
});
