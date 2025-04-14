import { Tabs } from 'expo-router';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Home, BarChart3, Compass, User } from 'lucide-react-native';
import {
  Animated,
  Text,
  View,
  Easing,
  StyleSheet,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function TabLayout() {
  const theme = useTheme();

  const renderAnimatedTab = (IconComponent: any, label: string) => ({
    tabBarIcon: ({ color, focused }: { color: string; focused: boolean }) => {
      const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0.9)).current;
      const labelAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

      useEffect(() => {
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: focused ? 0.9 : 1,
            duration: 300,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(labelAnim, {
            toValue: focused ? 1 : 0,
            duration: 250,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start();
      }, [focused]);

      return (
        <View style={styles.iconContainer}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <IconComponent size={hp('3%')} color={color} />
          </Animated.View>
          <Animated.View
            style={{
              opacity: labelAnim,
              transform: [
                {
                  translateY: labelAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
              marginTop: 2,
            }}
          >
            <Text
              style={[styles.label, { color }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {label}
            </Text>
          </Animated.View>
        </View>
      );
    },
    tabBarLabel: () => null,
  });

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.surface }}
      edges={['top', 'left', 'right']}
    >
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.outline,
          tabBarStyle: {
            backgroundColor: theme.colors.surface,
            elevation: 8,
            borderTopWidth: 0,
            height: hp('11%'),
            paddingBottom: hp('1%'),
            paddingTop: hp('1.5%'),
          },
        }}
      >
        <Tabs.Screen name="home" options={renderAnimatedTab(Home, 'Home')} />
        <Tabs.Screen name="progress" options={renderAnimatedTab(BarChart3, 'Progress')} />
        <Tabs.Screen name="explore" options={renderAnimatedTab(Compass, 'Explore')} />
        <Tabs.Screen name="profile" options={renderAnimatedTab(User, 'Profile')} />
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('18%'),
  },
  label: {
    fontSize: hp('1.5%'),
    fontWeight: '500',
    textAlign: 'center',
    includeFontPadding: false,
  },
});
