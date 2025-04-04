import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Goodbye() {
  const theme = useTheme();
  const router = useRouter();

  const goToLogin = () => {
    router.replace('/');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Avatar.Icon size={hp('10%')} icon="logout" style={{ backgroundColor: theme.colors.error }} />
      <Text style={[styles.title, { color: theme.colors.error }]}>Goodbye</Text>
      <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>You've been logged out.</Text>
      <Button mode="contained" onPress={goToLogin} style={styles.button}>
        Back to Login
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: hp('3%'), marginTop: hp('2%') },
  subtitle: { fontSize: hp('2%'), marginVertical: hp('1.5%') },
  button: { marginTop: hp('2%'), borderRadius: hp('1%'), paddingHorizontal: 20 },
});
