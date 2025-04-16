import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme, ProgressBar } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function CaloCard() {
  const theme = useTheme();
  const intake = 1840;
  const target = 2000;
  const ratio = Math.min(intake / target, 1);

  return (
    <Card
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow },
      ]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>Calorie Intake</Text>
        <TouchableOpacity style={styles.icon}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.progressBlock}>
        <View style={styles.progressBarWrapper}>
          <ProgressBar
            progress={ratio}
            color={`${theme.colors.secondary}22` }
            style={styles.progressBar}
          />
        </View>
        <Text style={styles.progressLabel}>
          <Text style={{ color: theme.colors.secondary }}>{intake}</Text>
          <Text style={{ color: theme.colors.onSurface }}> / {target} kcal</Text>
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: '100%',
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
    marginBottom: hp('1.5%'),
  },
  icon: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: hp('1.8%'),
    fontWeight: '600',
  },
  progressBlock: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: hp('1%'),
  },
  progressBarWrapper: {
    width: '100%',
  },
  progressBar: {
    height: hp('1.4%'),
    borderRadius: hp('1%'),
  },
  progressLabel: {
    fontSize: hp('1.5%'),
    fontWeight: '500',
  },
});
