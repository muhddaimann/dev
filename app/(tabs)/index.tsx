import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import TotalUser from '@/components/totalUser';
import ActiveSession from '@/components/activeSession';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Home() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <Avatar.Text
        size={hp('6%')}
        label="JD"
        style={{ backgroundColor: theme.colors.background }}
        labelStyle={{ color: theme.colors.onSurface }}
      />        
      <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: theme.colors.onSurface }]}>Rahman</Text>
          <Text style={[styles.userEmail, { color: theme.colors.onSurface }]}>rahman@daythree.co</Text>
        </View>
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
  header: { flexDirection: 'row', alignItems: 'center', gap: hp('1%'), padding: hp('2%'), borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%') },
  userInfo: { justifyContent: 'center', marginLeft: wp('1%'), gap: wp('1%')},
  userName: { fontSize: hp('2.2%'), fontWeight: '600' },
  userEmail: { fontSize: hp('1.7%') },
  row: { flexDirection: 'row', gap: hp('1%'), margin: hp('1%') },
  columnA: { flex: 2, borderRadius: hp('1%') },
  columnB: { flex: 3, borderRadius: hp('1%') },
});
