import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import type { LucideIcon } from 'lucide-react-native';

type CardItemProps = {
  title: string;
  desc: string;
  Icon: LucideIcon;
};

export default function CardItem({ title, desc, Icon }: CardItemProps) {
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
        <View style={styles.row}>
          <View style={[styles.iconWrapper, { backgroundColor: `${theme.colors.secondary}55` }]}>
            <Icon size={hp('3%')} color={theme.colors.primary} />
          </View>
          <View style={styles.textWrapper}>
            <Title style={[styles.title, { color: theme.colors.onSurface }]}>{title}</Title>
            <Paragraph style={[styles.text, { color: theme.colors.onSurfaceVariant }]}>
              {desc}
            </Paragraph>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    width: wp('88%'),
    borderRadius: hp('2%'),
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: hp('5%'),
    height: hp('5%'),
    borderRadius: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('3%'),
  },
  textWrapper: {
    flex: 1,
  },
  title: {
    fontSize: hp('2%'),
    fontWeight: '600',
  },
  text: {
    fontSize: hp('1.6%'),
    fontWeight: '400',
  },
});
