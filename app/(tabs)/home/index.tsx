import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme, FAB } from 'react-native-paper';
import QuoteCard from '@/components/home/quoteCard';
import StreakCard from '@/components/home/streakCard';
import ProgressCard from '@/components/home/progressCard';
import CardCarousel from '@/components/cardCarousel';
import LineCard from '@/components/lineCard';
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
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <View>
          <Text style={[styles.greetingText, { color: theme.colors.onSurface }]}>Welcome back,</Text>
          <Text style={[styles.userName, { color: theme.colors.primary }]}>Muhd Aiman</Text>
        </View>
        <Avatar.Text
          size={hp('6%')}
          label="MA"
          style={{ backgroundColor: theme.colors.primary }}
          labelStyle={{ color: 'white' }}
        />
      </View>
  
      <ScrollView
        contentContainerStyle={styles.body}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.row}><CardCarousel /></View>
        <View style={styles.row}><QuoteCard /></View>
        <View style={styles.rows}>
          <View style={styles.columnA}><StreakCard /></View>
          <View style={styles.columnB}><ProgressCard /></View>
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
    paddingHorizontal: hp('1%'),
    paddingBottom: hp('3%'),
  },  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    elevation: 3,
  },
  greetingText: { fontSize: hp('2%'), fontWeight: '400', marginBottom: hp('0.5%') },
  userName: { fontSize: hp('2.2%'), fontWeight: '700' },
  row: { flexDirection: 'column', marginTop: hp('1%') },
  rows: { flexDirection: 'row', gap: hp('1%'), marginTop: hp('1%') },
  columnA: { flex: 4, borderRadius: hp('1%'), minHeight: hp('10%') },
  columnB: { flex: 5, borderRadius: hp('1%') },
  card: { padding: wp('2%'), borderRadius: hp('1%') },
  cardTitle: { fontSize: hp('2.2%'), fontWeight: '600' },
  cardText: { fontSize: hp('1.8%'), fontWeight: '400', marginTop: hp('0.5%') },
  fab: { position: 'absolute', right: hp('2%'), bottom: hp('2%') },
});
