import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme, ProgressBar } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ProgressCard() {
  const theme = useTheme();

  const completed = 2;
  const total = 5;
  const progress = completed / total;

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface, shadowColor: theme.colors.shadow }]}>
      <Card.Content>
        <Title style={[styles.title, { color: theme.colors.onSurface }]}>Today's Progress</Title>
        <ProgressBar
          progress={progress}
          color={theme.colors.primary}
          style={styles.progress}
        />
        <Paragraph style={[styles.text, { color: theme.colors.onSurface }]}>
          {completed} of {total} completed
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
    fontSize: hp('2%'),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  progress: {
    height: hp('1%'),
    borderRadius: hp('1%'),
    marginBottom: hp('1%'),
  },
  text: {
    fontSize: hp('1.7%'),
    fontWeight: '400',
  },
});
