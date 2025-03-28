import { StyleSheet, View } from 'react-native';
import { Avatar, Text, useTheme, FAB, Card, Paragraph, Title } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useToggle } from '@/contexts/themeContext';

export default function Home() {
  const theme = useTheme();
  const { toggleTheme, isDarkMode } = useToggle();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <View>
          <Text style={[styles.greetingText, { color: theme.colors.onSurface }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: theme.colors.primary }]}>Vivian</Text>
        </View>
        <Avatar.Text
          size={hp('6%')}
          label="V"
          style={{ backgroundColor: theme.colors.primary }}
          labelStyle={{ color: 'white' }}
        />
      </View>
      <View style={styles.body}>
      <View style={styles.row}>
          <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
          <Card.Content>
            <Title style={[styles.cardTitle, { color: theme.colors.onPrimaryContainer }]}>
              Welcome Offer
            </Title>
            <Paragraph style={[styles.cardText, { color: theme.colors.onPrimaryContainer }]}>
              Get 1-week free personal training!
            </Paragraph>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.rows}>
        <View style={styles.columnA}>
          <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
            <Card.Content>
              <Title style={[styles.cardTitle, { color: theme.colors.onPrimaryContainer }]}>
                Members
              </Title>
              <Paragraph style={[styles.cardText, { color: theme.colors.onPrimaryContainer }]}>
                245 Active
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
        <View style={styles.columnB}>
        <Card style={[styles.card, { backgroundColor: theme.colors.primaryContainer, shadowColor: theme.colors.shadow }]}>
        <Card.Content>
              <Title style={[styles.cardTitle, { color: theme.colors.onPrimaryContainer }]}>
                Sessions Today
              </Title>
              <Paragraph style={[styles.cardText, { color: theme.colors.onPrimaryContainer }]}>
                3 Ongoing
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </View>
      </View>

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon={isDarkMode ? 'weather-sunny' : 'weather-night'}
        color={theme.colors.onPrimary}
        onPress={toggleTheme}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, paddingBottom: hp('3%') },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: hp('2%'), paddingHorizontal: wp('6%'), borderBottomLeftRadius: hp('2%'), borderBottomRightRadius: hp('2%'), elevation: 3 },
  body: { flex: 1, justifyContent: 'flex-start', paddingHorizontal: hp('1%'), paddingTop: hp('1%'), paddingBottom: hp('3%') },
  greetingText: { fontSize: hp('2%'), fontWeight: '400', marginBottom: hp('0.5%') },
  userName: { fontSize: hp('2.2%'), fontWeight: '700' },
  row: { flexDirection: 'column'},
  rows: { flexDirection: 'row', gap: hp('1%'), marginTop: hp('1%') },
  columnA: { flex: 2, borderRadius: hp('1%') },
  columnB: { flex: 3, borderRadius: hp('1%') },
  card: { padding: wp('2%'), borderRadius: hp('1%') },
  cardTitle: { fontSize: hp('2.2%'), fontWeight: '600' },
  cardText: { fontSize: hp('1.8%'), fontWeight: '400', marginTop: hp('0.5%') },
  fab: { position: 'absolute', right: wp('5%'), bottom: hp('4%') },
});
