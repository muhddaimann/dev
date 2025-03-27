import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function TotalUser() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <Text style={[styles.title, { color: theme.colors.onSurface }]}>Total Users: 1,245</Text>
      <Text style={[styles.subtitle, { color: theme.colors.onSurface }]}>New this week: 128</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: hp('2%'), borderRadius: hp('1%') },
  title: { fontSize: hp('2.2%'), fontWeight: '600' },
  subtitle: { marginTop: hp('1%'), fontSize: hp('1.8%') },
});
