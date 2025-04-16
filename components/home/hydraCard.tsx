import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function HydraCard() {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Hydration</Text>
        </View>

        <TouchableOpacity style={styles.iconBlock}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.detailRow}>
        <Text style={[styles.metric, { color: theme.colors.primary }]}>1.8 L</Text>
        <Text style={[styles.label, { color: theme.colors.onSurfaceVariant }]}>Water Intake</Text>
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
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  textBlock: { flex: 1 },
  iconBlock: { justifyContent: 'center', alignItems: 'flex-end' },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('0.5%'),
  },
  detailBlock: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: hp('1.8%'),
    fontWeight: '400',
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
