import { OnboardingButton } from '@/components/Button'
import Pagination from '@/components/Pagination'
import RenderItem from '@/components/RenderItem'
import dataOnboarding, { OnboardingData } from '@/data/onboarding'
import { Redirect, router, useFocusEffect } from 'expo-router'
import { useCallback } from 'react'
import { View, StyleSheet, FlatList, ViewToken, useWindowDimensions } from 'react-native'
import Animated, { 
  useAnimatedRef, 
  useAnimatedScrollHandler, 
  useSharedValue, 
  useAnimatedStyle,
  withTiming,
  runOnJS,
  interpolate
} from 'react-native-reanimated'

const VIEWABILITY_CONFIG = {
  minimumViewTime: 300,
  viewAreaCoveragePercentThreshold: 10,
};

const Index = () => {

  // return <Redirect href="/signup" />;

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0);
  const transitionValue = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      transitionValue.value = 0;
    }, [transitionValue])
  );

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0]?.index !== null && viewableItems[0]?.index !== undefined) {
      flatlistIndex.value = viewableItems[0].index;
    }
  }, [flatlistIndex]);

  const OnScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  });

  const navigateToLogin = useCallback(() => {
    router.push('/signup')
  }, []);

  const handleOnboardingFinish = useCallback(() => {
    transitionValue.value = withTiming(1, { duration: 600 }, (finished) => {
      if (finished) {
        runOnJS(navigateToLogin)();
      }
    });
  }, [transitionValue, navigateToLogin]);

  const transitionStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(transitionValue.value, [0, 1], [0, 40]) }],
      opacity: transitionValue.value > 0 ? 1 : 0, 
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList 
        ref={flatlistRef}
        onScroll={OnScroll}
        data={dataOnboarding} 
        renderItem={({item, index}) => (
          <RenderItem item={item} index={index} x={x}/>
        )}
        keyExtractor={item => String(item.id)}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={VIEWABILITY_CONFIG}
      />
      
      <View style={styles.bottomContainer}>
        <Pagination data={dataOnboarding} x={x}/>
        <OnboardingButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={dataOnboarding.length}
          x={x}
          onFinish={handleOnboardingFinish} 
        />
      </View>

      {/* ANIMAÇÃO DE TRANSIÇÃO */}
      <Animated.View
        pointerEvents="none"
        style={[
          {
            position: 'absolute',
            right: 70,  
            bottom: 50, 
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#3772FF', 
            zIndex: 999, 
          },
          transitionStyle
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    marginHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }
});

export default Index;