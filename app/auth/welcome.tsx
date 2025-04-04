import { View, StyleSheet } from 'react-native';
import { Avatar, Text, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Welcome() {
  const theme = useTheme();
  const router = useRouter();

  const goToHome = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Avatar.Icon size={hp('10%')} icon="account" style={{ backgroundColor: theme.colors.primary }} />
      <Text style={[styles.title, { color: theme.colors.primary }]}>Welcome Back, Aiman</Text>
      <Text style={[styles.subtitle, { color: theme.colors.onBackground }]}>You're successfully logged in!</Text>
      <Button mode="contained" onPress={goToHome} style={styles.button}>
        Continue to Home
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
