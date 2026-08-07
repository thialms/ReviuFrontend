import {TextInput, StyleSheet} from 'react-native'

const Input = () => {
  return (
    <TextInput style={styles.input}/>
  )
}

const styles = StyleSheet.create({
    input: {
        width:"100%",
        height: 48,
    }
})

