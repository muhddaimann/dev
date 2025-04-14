import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { ChevronRight } from 'lucide-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function DailyCard() {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.title, { color: theme.colors.onBackground }]}>Mon, Apr 14</Text>
        </View>

        <TouchableOpacity style={styles.iconBlock}>
          <ChevronRight size={hp('3%')} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.textBlock}>
          <Text style={[styles.ti, { color: theme.colors.primary }]}>Habit Streak</Text>
          <Text style={[styles.sub, { color: theme.colors.primary }]}>Consistency matters</Text>
        </View>

        <View style={styles.visualBlock}>
          <Text style={[styles.visual, { color: theme.colors.secondary }]}>1/7</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: { paddingHorizontal: hp('2%'), paddingVertical: hp('1%'), borderRadius: hp('1%'), shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 1, elevation: 2, width: '100%' },
  row: { flexDirection: 'row', marginVertical: hp('0.5%') },
  textBlock: { flex: 1, justifyContent: 'center' },
  iconBlock: { justifyContent: 'center', alignItems: 'flex-end' },
  visualBlock: { justifyContent: 'center', alignItems: 'flex-end', paddingRight: wp('2%') },
  title: { fontSize: hp('2%'), fontWeight: '600' },
  subtitle: { fontSize: hp('1.6%'), fontWeight: '600' },
  ti: { fontSize: hp('1.6%'), fontWeight: '400' },
  sub: { fontSize: hp('1.4%'), fontWeight: '600' },
  visual: { fontSize: hp('2.5%'), fontWeight: '700' },
});

