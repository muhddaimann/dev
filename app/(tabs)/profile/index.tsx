import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Avatar, List, Switch, useTheme, FAB } from 'react-native-paper';
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
      <ScrollView
        contentContainerStyle={styles.scrollBody}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
          <Avatar.Text
            size={hp('8%')}
            label="AR"
            style={{ backgroundColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.onPrimary }}
          />
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: theme.colors.onSurface }]}>Rahman</Text>
            <Text style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
              Profile Overview
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.gridContainer}>
            <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.infoTitle, { color: theme.colors.primary }]}>2000 kcal</Text>
              <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Target</Text>
            </View>
            <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.infoTitle, { color: theme.colors.primary }]}>70 kg</Text>
              <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Weight</Text>
            </View>
            <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.infoTitle, { color: theme.colors.primary }]}>175 cm</Text>
              <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Height</Text>
            </View>
            <View style={[styles.infoBox, { backgroundColor: `${theme.colors.primary}15` }]}>
              <Text style={[styles.infoTitle, { color: theme.colors.primary }]}>Male</Text>
              <Text style={[styles.infoLabel, { color: theme.colors.onSurfaceVariant }]}>Gender</Text>
            </View>
          </View>

          <List.Section>
            <List.Subheader style={[styles.subheader, { color: theme.colors.primary }]}>
              Preferences
            </List.Subheader>
            <List.Item
              title="Dark Mode"
              left={() => <List.Icon icon="theme-light-dark" />}
              right={() => (
                <Switch
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                  color={theme.colors.primary}
                />
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
        </View>
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
    flexGrow: 1,
    paddingBottom: hp('4%'),
  },
  body: {
    paddingTop: hp('1.5%'),
    paddingHorizontal: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: hp('2%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  headerText: {
    flexDirection: 'column',
  },
  name: {
    fontSize: hp('2.4%'),
    fontWeight: '600',
  },
  subtitle: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: hp('1%'),
  },
  infoBox: {
    width: '49%',
    paddingVertical: hp('2%'),
    paddingHorizontal: hp('2%'),
    borderRadius: hp('1.5%'),
  },
  infoTitle: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  infoLabel: {
    fontSize: hp('1.5%'),
    fontWeight: '400',
    marginTop: hp('0.5%'),
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
