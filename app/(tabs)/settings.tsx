import { StyleSheet, View } from 'react-native';
import { List, Switch, useTheme } from 'react-native-paper';
import { useState } from 'react';
import { useToggle } from '@/contexts/themeContext';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Settings() {
  const theme = useTheme();
  const { isDarkMode, toggleTheme } = useToggle();
  const [notifications, setNotifications] = useState(false);
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.colors.primary }]}>Preferences</List.Subheader>
        <List.Item
          title="Dark Mode"
          titleStyle={{ color: theme.colors.onSurface }}
          right={() => (
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          )}
        />
        <List.Item
          title="Notifications"
          titleStyle={{ color: theme.colors.onSurface }}
          right={() => (
            <Switch value={notifications} onValueChange={setNotifications} />
          )}
        />
      </List.Section>

      <List.Section style={styles.section}>
        <List.Subheader style={[styles.subheader, { color: theme.colors.primary }]}>About</List.Subheader>
        <List.Item
          title="Version"
          description="1.0.0"
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurface }}
        />
        <List.Item
          title="Build"
          description="2025.1.1"
          titleStyle={{ color: theme.colors.onSurface }}
          descriptionStyle={{ color: theme.colors.onSurface }}
        />
      </List.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: hp('2%'), paddingHorizontal: wp('5%') },
  section: { marginBottom: hp('2.5%') },
  subheader: { fontSize: hp('2.2%'), fontWeight: '600' },
});
