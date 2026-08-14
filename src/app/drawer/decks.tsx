import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { DrawerSceneWrapper } from '@/components/drawer-scene-wrapper'

type Props = {}

const decks = (props: Props) => {
  return (
    <DrawerSceneWrapper>
      <View style={styles.container}>
        <Header />
      </View>
    </DrawerSceneWrapper>
  )
}

export default decks

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E8E6',
    flex: 1,
  }
})