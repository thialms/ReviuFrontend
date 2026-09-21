import { Input } from '@/components/Input';
import { API_URL, getApiErrorMessage } from '@/services/api';
import { router } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Signup() {
  const insets = useSafeAreaInsets();
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSignup = async () => {
    const normalizedName = name.trim();
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    setErrorMessage('');

    if (!normalizedName || !normalizedUsername || !normalizedEmail || !password || !confirmPassword) {
      setErrorMessage('Preencha todos os campos.');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setErrorMessage('Digite um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      setErrorMessage('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: normalizedName,
          username: normalizedUsername,
          email: normalizedEmail,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(await getApiErrorMessage(response));
      }

      Alert.alert(
        'Conta criada',
        'Verifique seu e-mail para ativar a conta.',
        [{ text: 'OK', onPress: () => router.replace('/auth/login') }],
      );
    } catch (error) {
      setErrorMessage(
        error instanceof TypeError
          ? 'Não foi possível conectar ao servidor.'
          : error instanceof Error
            ? error.message
            : 'Não foi possível criar sua conta.',
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
            <Text style={styles.title}>Criar Conta</Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
          </Animated.View>

          <View style={styles.formContainer}>
            <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
              <Input 
                label="Nome Completo"
                iconName="user"
                placeholder="Ex: João da Silva" 
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
                editable={!isSubmitting}
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
              <Input 
                label="Nome de Usuário"
                iconName="at-sign"
                placeholder="Ex: joao.silva" 
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                editable={!isSubmitting}
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
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
            
            <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
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
            
            <Animated.View entering={FadeInDown.delay(600).duration(500).springify()}>
              <Input 
                label="Confirmar Senha"
                iconName="check-circle"
                placeholder="••••••••" 
                secureTextEntry={true} 
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!isSubmitting}
              />
            </Animated.View>

            {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

            <Animated.View entering={FadeInDown.delay(700).duration(500).springify()}>
              <TouchableOpacity
                style={[styles.button, isSubmitting && styles.buttonDisabled]}
                activeOpacity={0.8}
                onPress={handleSignup}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator color="#333333" />
                ) : (
                  <Text style={styles.buttonText}>CADASTRAR</Text>
                )}
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(800).duration(500).springify()} 
              style={styles.loginRedirect}
            >
              <Text style={styles.redirectText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={styles.redirectLink}>Faça Login</Text>
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
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: -20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#E6E8E6',
    opacity: 0.9,
  },
  formContainer: {
    flex: 1,
  },
  button: {
    width: '100%',
    height: 56,
    backgroundColor: '#FDCA40', 
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
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