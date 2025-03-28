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
            <Card style={[styles.card, { backgroundColor: theme.colors.secondaryContainer, shadowColor: theme.colors.shadow }]}>
              <Card.Content>
                <Title style={[styles.title, { color: theme.colors.onSecondaryContainer }]}>{item.title}</Title>
                <Paragraph style={[styles.text, { color: theme.colors.onSecondaryContainer }]}>{item.desc}</Paragraph>
              </Card.Content>
            </Card>
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { overflow: 'visible' },
  pager: { height: hp('15%'), width: wp('100%'), overflow: 'visible' },
  page: { alignItems: 'center', justifyContent: 'center' },
  card: { width: wp('80%'), borderRadius: hp('2%'), padding: wp('3%') },
  title: { fontSize: hp('2.2%'), fontWeight: '600' },
  text: { fontSize: hp('1.8%'), fontWeight: '400', marginTop: hp('0.5%') },
});
