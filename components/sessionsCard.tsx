import { Card, Title, Paragraph, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SessionsCard() {
  const theme = useTheme();
  return (
    <View style={styles.wrapper}>
      <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
        <Card.Content>
          <Title style={[styles.title, { color: theme.colors.onPrimaryContainer }]}>Sessions Today</Title>
          <Paragraph style={[styles.text, { color: theme.colors.onPrimaryContainer }]}>3 Ongoing</Paragraph>
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
