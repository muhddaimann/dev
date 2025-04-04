import { StyleSheet, View, ScrollView } from 'react-native';
import { List, Switch, useTheme, FAB } from 'react-native-paper';
import { useState } from 'react';
import { useAuth } from '@/contexts/authContext';
import { useToggle } from '@/contexts/themeContext';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Profile() {
  const theme = useTheme();
  const { handleLogout } = useAuth();
  const { isDarkMode, toggleTheme } = useToggle();
  const [isSwitchOn, setIsSwitchOn] = useState(isDarkMode);

  const onToggleSwitch = () => {
    toggleTheme();
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollBody} showsVerticalScrollIndicator={false} bounces={false}>
        <List.Section>
        <List.Subheader style={[styles.subheader, { color: theme.colors.primary }]}>
        Preferences
        </List.Subheader>
          <List.Item
            title="Dark Mode"
            left={() => <List.Icon icon="theme-light-dark" />}
            right={() => (
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} color={theme.colors.primary} />
            )}
          />
        <List.Subheader style={[styles.subheader, { color: theme.colors.primary }]}>
        About
        </List.Subheader>
          <List.Item
            title="App Version"
            description="0.0.0"
            left={() => <List.Icon icon="information-outline" />}
          />
        </List.Section>
      </ScrollView>

      <FAB
        icon="logout"
        style={[styles.fab, { backgroundColor: theme.colors.error }]}
        color={theme.colors.onError}
        onPress={handleLogout}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollBody: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('10%'),
    paddingTop: hp('2%'),
  },
  subheader: {
    paddingLeft: 0,
    fontWeight: 'bold',
  },  
  fab: {
    position: 'absolute',
    right: hp('2%'),
    bottom: hp('2%'),
  },
});
