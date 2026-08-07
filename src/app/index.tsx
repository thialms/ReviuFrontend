import { View, Text, StyleSheet } from 'react-native'

import { Button } from "@/components/Button"
import DeckoComCartas from '@/assets/DeckoComCartas.svg'

const Index = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Review your decks at your own pace</Text>

        <DeckoComCartas width="100%" height={250} />
        <View style={styles.buttonGroup}>
            <Button label="Get Started"/>
            <Button label="I Already Have an Account"/>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E6E8E6",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "space-between", 
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    color: "#080708",
    fontFamily: 'Inter_600SemiBold',
  },
  buttonGroup: {
    width: "100%",
    gap: 12, 
  }
})


export default Index
