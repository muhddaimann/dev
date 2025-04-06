import { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity } from 'react-native';
import Workout from './workout';
import Records from './records';
import { Text, useTheme } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Progress() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState<'workout' | 'records'>('workout');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.tabContainer, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
        {['workout', 'records'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && {
                borderBottomColor: theme.colors.primary,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => setActiveTab(tab as 'workout' | 'records')}
          >
            <Text
              style={[
                styles.tabText,
                { color: activeTab === tab ? theme.colors.primary : theme.colors.outline },
              ]}
            >
              {tab === 'workout' ? 'Workout' : 'Records'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {activeTab === 'workout' ? <Workout /> : <Records />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollBody: {
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1.5%'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: hp('3%'),
    paddingBottom: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tab: {
    paddingVertical: hp('0.8%'),
  },
  tabText: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
  },
});
