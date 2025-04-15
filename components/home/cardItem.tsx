import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

type CardItemProps = {
  title: string;
  desc: string;
};

export default function CardItem({ title, desc }: CardItemProps) {
  const theme = useTheme();

  return (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          shadowColor: theme.colors.shadow,
        },
      ]}
    >
      <Card.Content>
        <Title style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Title>
        <Paragraph style={[styles.text, { color: theme.colors.onSurface }]}>{desc}</Paragraph>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp('88%'),
    borderRadius: hp('2%'),
    paddingVertical: wp('1%'),
    paddingHorizontal: hp('2%'),
    minHeight: hp('10%'),
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  title: {
    fontSize: hp('2.0%'),
    fontWeight: '600',
  },
  text: {
    fontSize: hp('1.7%'),
    fontWeight: '400',
    marginTop: wp('1%'),
  },
});
