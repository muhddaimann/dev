import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, useTheme, FAB } from 'react-native-paper';
import Workout from './workout';
import Records from './records';
import PlanAdd from '@/components/progress/planAdd';
import PlanEdit from '@/components/progress/planEdit';
import RecordAdd from '@/components/progress/recordAdd';
import { WorkoutPlan } from '@/contexts/api/workout';
import { WorkoutRecord } from '@/contexts/api/record';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Progress() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'workout' | 'records'>('workout');
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [records, setRecords] = useState<WorkoutRecord[]>([]);
  const [visible, setVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);

  const showModal = () => {
    setSelectedPlan(null);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
    setSelectedPlan(null);
  };

  const showEditModal = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setEditVisible(true);
  };

  const hideEditModal = () => {
    setEditVisible(false);
    setSelectedPlan(null);
  };

  const handleAddPlan = (newPlan: WorkoutPlan) => {
    setPlans((prev) => [...prev, newPlan]);
    hideModal();
  };

  const handleSaveEdit = (updated: WorkoutPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    hideEditModal();
  };

  const handleDeletePlan = (id: number) => {
    setPlans((prev) => prev.filter((p) => p.id !== id));
    hideEditModal();
  };

  const handleAddRecord = (newRecord: WorkoutRecord) => {
    setRecords((prev) => [...prev, newRecord]);
    hideModal();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.tabContainer,
          { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
        ]}
      >
        {['workout', 'records'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab as 'workout' | 'records')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.colors.primary : theme.colors.outline },
              ]}
            >
              {tab === 'workout' ? 'Workout' : 'Records'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'workout' ? (
        <Workout
          plans={plans}
          onEdit={showEditModal}
          onDelete={handleDeletePlan}
        />
      ) : (
        <Records records={records} />
      )}

      {activeTab === 'workout' && (
        <>
          <PlanAdd
            visible={visible}
            onDismiss={hideModal}
            onSave={handleAddPlan}
            initialData={null}
          />
          {selectedPlan && (
            <PlanEdit
              visible={editVisible}
              onDismiss={hideEditModal}
              onSave={handleSaveEdit}
              onDelete={handleDeletePlan}
              initialData={selectedPlan}
            />
          )}
        </>
      )}

      {activeTab === 'records' && (
        <RecordAdd visible={visible} onDismiss={hideModal} onSave={handleAddRecord} />
      )}

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={showModal}
        color={theme.colors.onPrimary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: hp('3%'),
    paddingBottom: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tab: { paddingVertical: hp('0.8%') },
  tabText: { fontSize: hp('2.2%'), fontWeight: 'bold' },
  fab: {
    position: 'absolute',
    right: hp('2%'),
    bottom: hp('2%'),
  },
});
