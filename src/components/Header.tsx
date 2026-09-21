import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

type HeaderProps = {
  backgroundColor?: string;
  iconColor?: string;
}

const Header = ({ backgroundColor = '#E6E8E6', iconColor = '#3772FF' }: HeaderProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.header}>
        <View style={styles.spacer} />

        <View style={styles.actions}>
          <Feather name="bell" size={22} color={iconColor} />
          <Image source={{ uri: 'https://github.com/thialms.png' }} style={styles.img} />
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: '#E6E8E6',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  spacer: {
    width: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  img: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
})