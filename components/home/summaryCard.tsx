import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const tabs = ['Sleep', 'Steps', 'Hydration', 'Calories', 'Activity'];

export default function SummaryCard() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('Sleep');

  const renderContent = () => {
    switch (activeTab) {
      case 'Sleep':
        return 'You slept 6h 45m';
      case 'Steps':
        return 'Steps: 8,200';
      case 'Hydration':
        return 'Water: 1.8L';
      case 'Calories':
        return 'Cal: 1,650 kcal';
      case 'Activity':
        return 'Workout: 32 min';
      default:
        return '';
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <View style={styles.tabRow}>
        {tabs.map(tab => {
          const isActive = tab === activeTab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, isActive && { borderBottomColor: theme.colors.secondary }]}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: isActive ? theme.colors.primary : theme.colors.onSurfaceVariant,
                    fontWeight: isActive ? '700' : '500',
                  },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.contentContainer}>
        <Text style={[styles.contentText, { color: theme.colors.onSurface }]}>
          {renderContent()}
        </Text>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    paddingVertical: hp('1.5%'),
    borderRadius: hp('1%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  tabRow: {
    paddingHorizontal: hp('1%'),
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('1%'),
  },
  tab: {
    paddingVertical: hp('1%'),
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: hp('1.7%'),
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('20%'),
  },
  contentText: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
});
