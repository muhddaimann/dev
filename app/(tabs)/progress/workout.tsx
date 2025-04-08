import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import PlanCard from '@/components/progress/planCard';
import { WorkoutPlan } from '@/contexts/api/workout';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type WorkoutProps = {
  plans: WorkoutPlan[];
  onEdit: (plan: WorkoutPlan) => void;
  onDelete: (id: number) => void;
};

export default function Workout({ plans, onEdit, onDelete }: WorkoutProps) {
  const theme = useTheme();

  return (
    <View style={[styles.page, { backgroundColor: theme.colors.background }]}>
      {plans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Workout Plans</Text>
          <Text style={[styles.subText, { color: theme.colors.onBackground }]}>
            Create your cardio and exercise routines here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id.toString()}
          bounces={false}
          contentContainerStyle={{ paddingTop: hp('2%'), paddingHorizontal: wp('4%') }}
          renderItem={({ item }) => (
            <PlanCard plan={item} onEdit={onEdit} onDelete={() => onDelete(item.id)} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, marginTop: hp('1%'), paddingBottom: hp('3%') },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: '700',
    marginBottom: hp('1%'),
    textAlign: 'center',
  },
  subText: {
    fontSize: hp('1.8%'),
    fontWeight: '400',
    textAlign: 'center',
  },
});
