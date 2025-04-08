import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, useTheme, Text, Modal, Portal, Button } from 'react-native-paper';
import { WorkoutPlan } from '@/contexts/api/workout';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type PlanCardProps = {
  plan: WorkoutPlan;
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (planId: number) => void;
};

export default function PlanCard({ plan, onEdit, onDelete }: PlanCardProps) {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);
  const openModal = () => setVisible(true);
  const closeModal = () => setVisible(false);

  const renderExerciseLine = (ex: any) => {
    switch (ex.type) {
      case 'Reps':
        return `${ex.name}: ${ex.reps || '-'} reps x ${ex.sets || '-'} sets`;
      case 'Duration':
        return `${ex.name}: ${ex.duration || '-'} min`;
      case 'Distance':
        return `${ex.name}: ${ex.distance || '-'} km`;
      default:
        return `${ex.name}`;
    }
  };

  return (
    <>
      <TouchableOpacity onPress={openModal}>
        <Card
          style={[
            styles.card,
            { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
          ]}
        >
          <Card.Title title={plan.name} titleStyle={{ fontSize: hp('2%') }} />
          <Card.Content style={{ paddingTop: 0 }}>
            {plan.exercises.map((ex, idx) => (
              <Text key={idx} style={{ fontSize: hp('1.6%'), color: theme.colors.onSurface }}>
                {renderExerciseLine(ex)}
              </Text>
            ))}
          </Card.Content>
        </Card>
      </TouchableOpacity>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={closeModal}
          contentContainerStyle={[styles.modal, { backgroundColor: theme.colors.surface }]}
        >
          <Text style={[styles.modalTitle, { color: theme.colors.primary }]}>{plan.name}</Text>
          {plan.exercises.map((ex, idx) => (
            <Text key={idx} style={{ marginBottom: hp('1%'), color: theme.colors.onSurface }}>
              {renderExerciseLine(ex)}
            </Text>
          ))}

          <View style={styles.buttonRow}>
            <Button
              mode="contained"
              buttonColor={theme.colors.primary}
              onPress={() => {
                closeModal();
                onEdit(plan);
              }}
              style={styles.btn}
            >
              Edit
            </Button>
            <Button
              mode="contained"
              buttonColor={theme.colors.secondary}
              onPress={() => {
                closeModal();
              }}
              style={styles.btn}
            >
              Start
            </Button>
          </View>
        </Modal>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: hp('1%'),
    marginBottom: hp('1.5%'),
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  modal: {
    margin: hp('4%'),
    padding: hp('3%'),
    borderRadius: hp('1.5%'),
  },
  modalTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
    marginBottom: hp('2%'),
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: hp('1%'),
    marginTop: hp('2%'),
  },
  btn: {
    flex: 1,
    borderRadius: hp('2%'),
  },
});
