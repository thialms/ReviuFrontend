import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableOpacity 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Input } from '@/components/Input';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { router } from 'expo-router';

export default function Signup() {
  const insets = useSafeAreaInsets();

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
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
              <Input 
                label="Nome de Usuário"
                iconName="at-sign"
                placeholder="Ex: joao.silva" 
                autoCapitalize="none"
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
              <Input 
                label="E-mail"
                iconName="mail"
                placeholder="Ex: joao@email.com" 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
              <Input 
                label="Senha"
                iconName="lock"
                placeholder="••••••••" 
                secureTextEntry={true} 
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(600).duration(500).springify()}>
              <Input 
                label="Confirmar Senha"
                iconName="check-circle"
                placeholder="••••••••" 
                secureTextEntry={true} 
              />
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(700).duration(500).springify()}>
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>CADASTRAR</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(800).duration(500).springify()} 
              style={styles.loginRedirect}
            >
              <Text style={styles.redirectText}>Já tem uma conta? </Text>
              <TouchableOpacity onPress={() => router.push('/login')}>
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
    marginBottom: 40,
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