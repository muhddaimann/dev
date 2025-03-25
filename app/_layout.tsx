import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useToggle } from '@/contexts/themeContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, isDarkMode } = useToggle();

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
