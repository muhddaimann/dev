import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function HydraCard() {
  const theme = useTheme();
  const [hasReminder, setHasReminder] = useState(true);

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Hydration</Text>
        <TouchableOpacity style={styles.icon}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.metricRow}>
        <View style={styles.metricBlock}>
          <Text style={[styles.metric, { color: theme.colors.primary }]}>2.0 L</Text>
          <Text style={[styles.label, { color: theme.colors.secondary }]}>per day</Text>
        </View>

        <TouchableOpacity
          onPress={() => setHasReminder(!hasReminder)}
          style={[
            styles.pillContainer,
            { backgroundColor: `${theme.colors.secondary}22` },
          ]}
        >
          <Text style={[styles.pillText, { color: theme.colors.onSurfaceVariant }]}>
            {hasReminder ? 'Every Hour' : 'Set Reminder'}
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2%'),
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('.5%'),
  },
  icon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: hp('1%'),
  },
  metricBlock: {
    flexDirection: 'column',
  },
  metric: {
    fontSize: hp('3%'),
    fontWeight: 'bold',
  },
  label: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    marginTop: hp('0.5%'),
  },
  pillContainer: {
    paddingHorizontal: hp('1%'),
    paddingVertical: hp('0.4%'),
    borderRadius: hp('2%'),
  },
  pillText: {
    fontSize: hp('1.4%'),
    fontWeight: '600',
  },
});
