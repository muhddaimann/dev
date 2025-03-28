import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import TotalUser from '@/components/totalUser';
import ActiveSession from '@/components/activeSession';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Home() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
<View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
  <View>
    <Text style={[styles.greetingText, { color: theme.colors.onSurface }]}>Welcome back,</Text>
    <Text style={[styles.userName, { color: theme.colors.primary }]}>Vivian</Text>
  </View>
  <Avatar.Text
    size={hp('6%')}
    label="V"
    style={{ backgroundColor: theme.colors.primary }}
    labelStyle={{ color: 'white' }}
  />
</View>

      <View style={styles.row}>
        <View style={styles.columnA}><TotalUser /></View>
        <View style={styles.columnB}><ActiveSession /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: hp('3%') },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('4%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    elevation: 3,
  },
  greetingText: {
    fontSize: hp('2%'),
    fontWeight: '400',
    marginBottom: hp('0.5%'),
  },
  userName: {
    fontSize: hp('2.2%'),
    fontWeight: '700',
  },
  
  row: { flexDirection: 'row', gap: hp('1%'), margin: hp('1%') },
  columnA: { flex: 2, borderRadius: hp('1%') },
  columnB: { flex: 3, borderRadius: hp('1%') },
});
