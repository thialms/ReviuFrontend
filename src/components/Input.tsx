import { TextInput, StyleSheet, View, Text, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = TextInputProps & {
  iconName: React.ComponentProps<typeof Feather>['name'];
  label: string;
};

export const Input = ({ iconName, label, ...rest }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Feather name={iconName} size={20} color="#888888" style={styles.icon} />
        <TextInput 
          style={styles.input} 
          placeholderTextColor="#A0A0A0" 
          {...rest} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24, 
    width: '100%',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E8E6', 
    borderRadius: 16, 
    paddingHorizontal: 16,
    height: 56,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#333333',
    fontSize: 16,
  }
});