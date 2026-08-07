import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type ButtonProps = TouchableOpacityProps & {
  label: string
}

export const Button = ({ label, ...rest }: ButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 56, 
    backgroundColor: "#3772FF",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#E6E8E6",
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  }
})