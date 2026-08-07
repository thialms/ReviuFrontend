import { Stack } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  });

  if (!loaded) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}