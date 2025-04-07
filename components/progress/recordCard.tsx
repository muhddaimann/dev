import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { WorkoutRecord } from '@/contexts/api/record';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

type RecordCardProps = {
  record: WorkoutRecord;
  onPress: () => void;
};

export default function RecordCard({ record, onPress }: RecordCardProps) {
  const theme = useTheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <Card
        style={[
          styles.card,
          { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
        ]}
      >
        <Card.Title title={record.name} titleStyle={{ fontSize: hp('2%') }} />
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: hp('1.5%'),
    borderRadius: hp('1%'),
    elevation: 2,
  },
});
