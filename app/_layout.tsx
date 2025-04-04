import { StatusBar } from 'expo-status-bar';
import { Slot } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { PaperProvider } from 'react-native-paper';
import { ThemeProvider, useToggle } from '@/contexts/themeContext';
import { AuthProvider } from '@/contexts/authContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  );
}

function MainApp() {
  const { theme, isDarkMode } = useToggle();

  return (
    <PaperProvider theme={theme}>
      <Slot />
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </PaperProvider>
  );
}
