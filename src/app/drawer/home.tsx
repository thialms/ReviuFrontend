import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '@/components/Header'
import { DrawerSceneWrapper } from '@/components/drawer-scene-wrapper'

type Props = {}

const home = (props: Props) => {
  return (
    <DrawerSceneWrapper>
      <View style={styles.container}>
        <Header />
      </View>
    </DrawerSceneWrapper>
  )
}

export default home

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E6E8E6',
    flex: 1,
  }
})