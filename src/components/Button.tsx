import { OnboardingData } from '@/data/onboarding';
import { Route, Router } from 'expo-router';
import { StyleSheet, TouchableOpacityProps, TouchableWithoutFeedback, FlatList, useWindowDimensions } from 'react-native'
import Animated, { AnimatedRef, interpolateColor, SharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

type ButtonProps = TouchableOpacityProps & {
  label: string
}

type Props = {
  dataLength: number;
  flatlistIndex: SharedValue<number>;
  flatlistRef: AnimatedRef<FlatList<OnboardingData>>;
  x: SharedValue<number>;
  onFinish: () => void; 
}

export const OnboardingButton = ({ dataLength, flatlistIndex, flatlistRef, x, onFinish }: Props) => { // <-- 2. Receba a prop
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const buttonAnimationStyle = useAnimatedStyle(() => {
    return {
      width:
        flatlistIndex.value === dataLength - 1
          ? withSpring(140, {
          stiffness: 500, 
          damping: 20,   
        })
          : withSpring(60, {
          stiffness: 500,
          damping: 20,
        }),
      height: 60,
    };
  });

  const arrowAnimationStyle = useAnimatedStyle(() => {
    return{
      width: 30,
      height: 30,
      opacity: flatlistIndex.value === dataLength -1 
        ? withTiming(0) 
        : withTiming(1),
      transform: [
        {
          translateX:flatlistIndex.value === dataLength - 1 
            ? withTiming(100) 
            : withTiming(0)
        }
      ]
    }
  })

    const textAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity: flatlistIndex.value === dataLength - 1 
        ? withTiming(1) 
        : withTiming(0),
      transform: [{
        translateX: flatlistIndex.value === dataLength - 1 
          ? withTiming(0) 
          : withTiming(-100)
      }]
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
      };
    });

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if(flatlistIndex.value < dataLength -1){
          flatlistRef.current?.scrollToIndex({index: flatlistIndex.value + 1})
        } else {
          onFinish(); 
        }
      }}
    >
      <Animated.View 
      style={[styles.arrowContainer, animatedColor, buttonAnimationStyle]}
      >
        <Animated.Text style={[styles.textButtonOnboarding, textAnimationStyle]}>Começar</Animated.Text>
        <Animated.Image 
        source={require('../assets/RightArrow.png')}
        style={[styles.arrow, arrowAnimationStyle]}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  arrowContainer:{
    padding: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 60,
    height: 60,
  },
  arrow: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  textButtonOnboarding: {
    color: 'white',
    fontSize: 18,
    position: 'absolute'
  }
})