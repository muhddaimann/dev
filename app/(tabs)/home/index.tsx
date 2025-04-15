import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme, FAB } from 'react-native-paper';
import DailyCard from '@/components/home/dailyCard';
import WeeklyCard from '@/components/home/weeklyCard';
import StreakCard from '@/components/home/streakCard';
import CardCarousel from '@/components/home/cardCarousel';
import LineCard from '@/components/home/lineCard';
import { useToggle } from '@/contexts/themeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Home() {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useToggle();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.colors.surface,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        <View>
          <Text style={[styles.greetingText, { color: theme.colors.primary }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>Rahman</Text>
        </View>
        <Avatar.Text
          size={hp('6%')}
          label="AR"
          style={{ backgroundColor: theme.colors.primary }}
          labelStyle={{ color: theme.colors.onPrimary }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.body}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ro}><CardCarousel /></View>
        <View style={styles.ro}><WeeklyCard /></View>
        <View style={styles.rows}>
          <View style={[styles.columnA, { backgroundColor: theme.colors.surfaceVariant }]}>
            <DailyCard />
          </View>
          <View style={[styles.columnB, { backgroundColor: theme.colors.surfaceVariant }]}>
            <StreakCard />
          </View>
        </View>
        <View style={styles.row}><LineCard /></View>
      </ScrollView>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
        color={theme.colors.onPrimary}
        onPress={toggleTheme}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  body: {
    paddingHorizontal: hp('2%'),
    paddingBottom: hp('3%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('1.5%'),
    paddingHorizontal: hp('3%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  greetingText: {
    fontSize: hp('2%'),
    fontWeight: '400',
    marginBottom: hp('0.5%'),
  },
  userName: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  ro: { flexDirection: 'column', marginTop: hp('1%') },
  row: { flexDirection: 'column', marginTop: hp('1.5%') },
  rows: { flexDirection: 'row', gap: hp('1.5%'), marginTop: hp('1.5%') },
  columnA: { flex: 2, borderRadius: hp('1%'), minHeight: hp('10%') },
  columnB: { flex: 1, borderRadius: hp('1%') },
  card: { padding: wp('2%'), borderRadius: hp('1%') },
  cardTitle: { fontSize: hp('2.2%'), fontWeight: '600' },
  cardText: { fontSize: hp('1.8%'), fontWeight: '400', marginTop: hp('0.5%') },
  fab: { position: 'absolute', right: hp('2%'), bottom: hp('2%') },
});
