import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { Flame } from 'lucide-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function StreakCard() {
  const theme = useTheme();
  const [streakCount, setStreakCount] = useState(1);

  const incrementStreak = () => {
    setStreakCount(prev => prev + 1);
  };

  return (
    <View style={[styles.card, { backgroundColor: theme.colors.secondaryContainer, shadowColor: theme.colors.shadow }]}>
      <TouchableWithoutFeedback onPress={incrementStreak}>
        <View style={styles.inner}>
          <View style={styles.topRow}>
            <Text style={[styles.label, { color: theme.colors.onSecondaryContainer }]}>Streak</Text>
          </View>

          <View style={styles.bottomRow}>
            <Text style={[styles.count, { color: theme.colors.onSecondaryContainer }]}>{streakCount}</Text>
            <Flame size={hp('5%')} color={theme.colors.error} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  inner: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: hp('2%'),
    justifyContent: 'space-between',
  },
  topRow: {
    alignItems: 'flex-start',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  count: {
    fontSize: hp('5%'),
    fontWeight: 'bold',
  },
});
