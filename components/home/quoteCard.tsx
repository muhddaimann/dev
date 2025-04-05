import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function QuoteCard() {
  const theme = useTheme();

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <Card.Content>
        <Title style={[styles.title, { color: theme.colors.onSurface }]}>Quote of the Day</Title>
        <Paragraph style={[styles.text, { color: theme.colors.onSurface }]}>
          "It never gets easier, you just get stronger."
        </Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: wp('2%'),
    borderRadius: hp('1%'),
  },
  title: {
    fontSize: hp('2.2%'),
    fontWeight: '600',
  },
  text: {
    fontSize: hp('1.8%'),
    fontWeight: '400',
    marginTop: hp('0.5%'),
  },
});
