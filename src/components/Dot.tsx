import { StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, interpolateColor, SharedValue, useAnimatedStyle } from 'react-native-reanimated'

type Props = {
    index: number,
    x: SharedValue<number>
}

const Dot = ({index, x}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const animatedDotStyle = useAnimatedStyle(() => {
    const widthAnimation = interpolate(
        x.value,
        [
            (index -1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
        ],
        [10,20,10],
        'clamp',
    );
    const opacityAnimation = interpolate(
        x.value,
        [
            (index -1) * SCREEN_WIDTH,
            index * SCREEN_WIDTH,
            (index + 1) * SCREEN_WIDTH
        ],
        [0.5,1,0.5],
        'clamp',
    )
    return {
        width: widthAnimation,
        opacity: opacityAnimation,
    }
  })

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
        x.value,
        [0, SCREEN_WIDTH, 2 * SCREEN_WIDTH],
        ['#FDCA40', '#090a09', '#f8424e']
    )
    return {
        backgroundColor: backgroundColor,
    }
  })

  return (
    <Animated.View style={[styles.dot, animatedDotStyle, animatedColor]}>
    </Animated.View>
  )
}

export default Dot

const styles = StyleSheet.create({
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 10,
    }
})