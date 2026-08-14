import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerToggleButton } from '@react-navigation/drawer'

type Props = {}

const Header = (props: Props) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <DrawerToggleButton />

            <Image source={{ uri: "https://github.com/thialms.png"}} style={styles.img}/>
        </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 30,
        paddingTop: 80,
        backgroundColor: '#E6E8E6'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 30
    }
})