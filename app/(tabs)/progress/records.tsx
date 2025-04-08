import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';
import RecordCard from '@/components/progress/recordCard';
import { WorkoutRecord } from '@/contexts/api/record';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

type RecordsProps = {
  records: WorkoutRecord[];
};

export default function Records({ records }: RecordsProps) {
  const theme = useTheme();

  return (
    <View style={[styles.page, { backgroundColor: theme.colors.background }]}>
      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.title, { color: theme.colors.primary }]}>Workout Records</Text>
          <Text style={[styles.subText, { color: theme.colors.onBackground }]}>
            Track your sets, reps, and weights completed.
          </Text>
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id.toString()}
          bounces={false}
          contentContainerStyle={{ paddingTop: hp('2%'), paddingHorizontal: wp('4%') }}
          renderItem={({ item }) => (
            <RecordCard record={item} onPress={item.onPress || (() => {})} />
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
