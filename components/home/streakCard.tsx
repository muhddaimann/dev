import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function StreakCard() {
  const theme = useTheme();
  const [streakCount, setStreakCount] = useState(1);

  const incrementStreak = () => {
    setStreakCount(prev => prev + 1);
  };

  return (
    <View style={[styles.card, {
      backgroundColor: theme.colors.secondaryContainer,
      shadowColor: theme.colors.shadow,
      elevation: 3,
    }]}>
      <TouchableWithoutFeedback onPress={incrementStreak}>
        <View style={styles.inner}>
          <Text style={[styles.streakText, { color: theme.colors.onSecondaryContainer }]}>
            🔥 {streakCount}-Day Streak
          </Text>
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
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  inner: {
    flex: 1,
    minHeight: hp('10%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakText: {
    fontSize: hp('2%'),
    fontWeight: '500',
    textAlign: 'center',
  },
});