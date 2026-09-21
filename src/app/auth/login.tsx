import { Input } from '@/components/Input';
import { API_URL, getApiErrorMessage, saveAuthToken } from '@/services/api';
import { router } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Login() {
  const insets = useSafeAreaInsets();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    setErrorMessage('');

    if (!normalizedEmail || !password) {
      setErrorMessage('Preencha seu e-mail e sua senha.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response));
      }

      const body = await response.json() as { token?: string };

      if (!body.token) {
        throw new Error('O servidor não retornou um token de acesso.');
      }

      await saveAuthToken(body.token);
      router.replace('/drawer/home');
    } catch (error) {
      setErrorMessage(
        error instanceof TypeError
          ? 'Não foi possível conectar ao servidor.'
          : error instanceof Error
            ? error.message
            : 'Não foi possível entrar na sua conta.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          
          <Animated.View 
            entering={FadeInDown.delay(100).duration(500).springify()} 
            style={styles.header}
          >
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </Animated.View>

          <View style={styles.formContainer}>
            <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
              <Input 
                label="E-mail"
                iconName="mail"
                placeholder="Ex: joao@email.com" 
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isSubmitting}
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
              <Input 
                label="Senha"
                iconName="lock"
                placeholder="••••••••" 
                secureTextEntry={true} 
                value={password}
                onChangeText={setPassword}
                editable={!isSubmitting}
              />
            </Animated.View>

            {/* Esqueci a senha animado */}
            <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
              <TouchableOpacity style={styles.forgotPassword} disabled={isSubmitting}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </Animated.View>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                activeOpacity={0.8}
                onPress={handleLogin}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#333333" />
                ) : (
                  <Text style={styles.buttonText}>ENTRAR</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(600).duration(500).springify()} 
              style={styles.loginRedirect}
            >
              <Text style={styles.redirectText}>Não tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={styles.redirectLink}>Cadastre-se</Text>
              </TouchableOpacity>
            </Animated.View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3772FF', 
  },
  container: {
    flex: 1,
    backgroundColor: '#3772FF', 
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 80, 
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E8E6',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#E6E8E6',
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#FDCA40', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#333333', 
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  errorMessage: {
    color: '#FFE1E1',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  loginRedirect: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redirectText: {
    color: '#E6E8E6',
    fontSize: 15,
  },
  redirectLink: {
    color: '#FDCA40', 
    fontSize: 15,
    fontWeight: 'bold',
  }
});