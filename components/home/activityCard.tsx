import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ActivityCard() {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Activity</Text>
        <TouchableOpacity>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={[styles.metric, { color: theme.colors.secondary }]}>5</Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Goals</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.metric, { color: theme.colors.secondary }]}>42 min</Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Workout</Text>
        </View>
        <View style={styles.column}>
          <Text style={[styles.metric, { color: theme.colors.secondary }]}>8,200</Text>
          <Text style={[styles.label, { color: theme.colors.onSurface }]}>Steps</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2%'),
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    gap: hp('1.2%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('1%'),
  },
  column: {
    alignItems: 'center',
  },
  metric: {
    fontSize: hp('2.8%'),
    fontWeight: '700',
  },
  label: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    marginTop: hp('0.3%'),
  },
});
