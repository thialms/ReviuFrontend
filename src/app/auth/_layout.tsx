import { Stack } from 'expo-router';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';

export default function RootLayout() {
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#3772FF', 
    },
  };

  return (
    <ThemeProvider value={MyTheme}>
      <Stack 
        screenOptions={{ 
          headerShown: false,
          animation: 'none', 
          contentStyle: { backgroundColor: '#3772FF' } 
        }} 
      />
    </ThemeProvider>
  );
}