import React, { useRef, useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const data = [
  { title: 'Free Trial Class', desc: 'Try any class free for 1 day!' },
  { title: 'New Equipment', desc: 'Check out our new leg press machine!' },
  { title: 'Refer & Earn', desc: 'Refer a friend and get a free session.' },
  { title: 'Test', desc: 'Testing.' },
];

export default function CardCarousel() {
  const theme = useTheme();
  const pagerRef = useRef<PagerView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      pagerRef.current?.setPage(nextIndex);
      setCurrentIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pager}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={e => setCurrentIndex(e.nativeEvent.position)}
      >
        {data.map((item, index) => (
          <View key={index} style={styles.page}>
            <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
              <Card.Content>
                <Title style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>{item.title}</Title>
                <Paragraph style={[styles.text, { color: theme.colors.onPrimaryContainer }]}>{item.desc}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  pager: { height: hp('13%'), width: wp('100%') },
  page: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: wp('2%') },
  card: { width: wp('88%'), borderRadius: hp('2%'), padding: wp('3%'), minHeight: hp('10%'), justifyContent: 'center', shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 1,
  elevation: 2 },
  title: { fontSize: hp('2.0%'), fontWeight: '600' },
  text: { fontSize: hp('1.7%'), fontWeight: '400', marginTop: wp('1%') },
});

