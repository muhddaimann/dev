import React, { useRef, useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';
import { View, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CardItem from './cardItem';

const data = [
  { title: 'Free Trial Class', desc: 'Try any class free for 1 day!' },
  { title: 'New Equipment', desc: 'Check out our new leg press machine!' },
  { title: 'Refer & Earn', desc: 'Refer a friend and get a free session.' },
  { title: 'Test', desc: 'Testing.' },
];

export default function CardCarousel() {
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
            <CardItem title={item.title} desc={item.desc} />
          </View>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  pager: { height: hp('12%'), width: wp('100%') },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: wp('1%'),
  },
});
