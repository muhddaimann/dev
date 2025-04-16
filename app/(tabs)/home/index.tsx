import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, View, Text as RNText, TouchableOpacity } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import DailyCard from '@/components/home/dailyCard';
import WeeklyCard from '@/components/home/weeklyCard';
import StreakCard from '@/components/home/streakCard';
import CardCarousel from '@/components/home/cardCarousel';
import SleepCard from '@/components/home/sleepCard';
import StepCard from '@/components/home/stepCard';
import HydraCard from '@/components/home/hydraCard';
import CaloCard from '@/components/home/caloCard';
import ActivityCard from '@/components/home/activityCard';
import LineCard from '@/components/home/lineCard';

export default function Home() {
  const theme = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    setShowBackToTop(scrollY > hp('14%'));
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.colors.background }]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View
          style={[
            styles.header,
            {
              backgroundColor: theme.colors.surface,
              shadowColor: theme.colors.shadow,
            },
          ]}
        >
          <View>
            <Text style={[styles.greetingText, { color: theme.colors.primary }]}>Welcome back,</Text>
            <Text style={[styles.userName, { color: theme.colors.onSurface }]}>Rahman</Text>
          </View>
          <Avatar.Text
            size={hp('6%')}
            label="AR"
            style={{ backgroundColor: theme.colors.primary }}
            labelStyle={{ color: theme.colors.onPrimary }}
          />
        </View>

        <View style={styles.body}>
          <View style={styles.ro}>
            <CardCarousel />
          </View>
          <View style={styles.ro}>
            <WeeklyCard />
          </View>
          <View style={styles.rows}>
            <View style={styles.columnA}>
              <DailyCard />
            </View>
            <View style={styles.columnB}>
              <StreakCard />
            </View>
          </View>
          <View style={styles.row}>
            <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Goals</Text>
          </View>
          <View style={styles.row}>
            <SleepCard />
          </View>
          <View style={styles.row}>
            <StepCard />
          </View>
          <View style={styles.rows}>
            <View style={styles.columnB}>
              <HydraCard />
            </View>
            <View style={styles.columnB}>
              <CaloCard />
            </View>
          </View>
          <View style={styles.row}>
            <ActivityCard />
          </View>
          <View style={styles.row}>
            <LineCard />
          </View>
        </View>
      </ScrollView>

      {showBackToTop && (
        <TouchableOpacity style={[styles.backToTop, { backgroundColor: `${theme.colors.primary}99` }]} onPress={scrollToTop}>
          <RNText style={[styles.backToTopText, { color: theme.colors.onPrimary }]}>Back to Top</RNText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp('4%'),
  },
  body: {
    paddingHorizontal: hp('2%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('1.5%'),
    paddingHorizontal: hp('3%'),
    borderBottomLeftRadius: hp('2%'),
    borderBottomRightRadius: hp('2%'),
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  greetingText: {
    fontSize: hp('2%'),
    fontWeight: '400',
    marginBottom: hp('0.5%'),
  },
  userName: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: hp('2%'),
    fontWeight: '600',
    paddingHorizontal: wp('1%'),
  },
  ro: { flexDirection: 'column', marginTop: hp('1%') },
  row: { flexDirection: 'column', marginTop: hp('1.5%') },
  rows: { flexDirection: 'row', gap: hp('1.5%'), marginTop: hp('1.5%') },
  columnA: { flex: 2, borderRadius: hp('1%'), minHeight: hp('10%') },
  columnB: { flex: 1, borderRadius: hp('1%') },

  backToTop: {
    position: 'absolute',
    bottom: hp('1%'),
    alignSelf: 'center',
    paddingHorizontal: hp('2%'),
    paddingVertical: hp('1%'),
    borderRadius: hp('2%'),
  },
  backToTopText: {
    fontSize: hp('1.6%'),
    fontWeight: '600',
  },
});
