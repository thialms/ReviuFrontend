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
import { router } from 'expo-router'; // Importado para voltar para o signup

export default function Login() {
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
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>
          </Animated.View>

          {/* Como o login tem menos campos, adicionei um pouco de marginTop para centralizar melhor */}
          <View style={styles.formContainer}>
            <Animated.View entering={FadeInDown.delay(200).duration(500).springify()}>
              <Input 
                label="E-mail"
                iconName="mail"
                placeholder="Ex: joao@email.com" 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animated.View>
            
            <Animated.View entering={FadeInDown.delay(300).duration(500).springify()}>
              <Input 
                label="Senha"
                iconName="lock"
                placeholder="••••••••" 
                secureTextEntry={true} 
              />
            </Animated.View>

            {/* Esqueci a senha animado */}
            <Animated.View entering={FadeInDown.delay(400).duration(500).springify()}>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(500).duration(500).springify()}>
              <TouchableOpacity style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>ENTRAR</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View 
              entering={FadeInUp.delay(600).duration(500).springify()} 
              style={styles.loginRedirect}
            >
              <Text style={styles.redirectText}>Não tem uma conta? </Text>
              {/* O router.push('/signup') manda o usuário de volta para a tela de registro */}
              <TouchableOpacity onPress={() => router.push('/signup')}>
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
    // Aumentamos o padding do topo para descer mais o conteúdo, já que há menos campos
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