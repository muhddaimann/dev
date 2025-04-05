import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function WelcomeCard() {
  const theme = useTheme();

  return (
    <View style={styles.wrapper}>
      <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>Welcome Offer</Title>
          <Paragraph style={[styles.text, { color: theme.colors.onPrimaryContainer }]}>
            Get 1-week free personal training!
          </Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'column' },
  card: { padding: wp('2%'), borderRadius: hp('1%') },
  title: { fontSize: hp('2.2%'), fontWeight: '600' },
  text: { fontSize: hp('1.8%'), fontWeight: '400', marginTop: hp('0.5%') },
});
