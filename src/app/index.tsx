import { OnboardingButton } from '@/components/Button'
import Pagination from '@/components/Pagination'
import RenderItem from '@/components/RenderItem'
import dataOnboarding, { OnboardingData } from '@/data/onboarding'
import { View, StyleSheet, FlatList, ViewToken } from 'react-native'
import Animated, {useAnimatedRef, useAnimatedScrollHandler, useSharedValue} from 'react-native-reanimated'


const Index = () => {
  const flatlistRef = useAnimatedRef<FlatList<OnboardingData>>();
  const x = useSharedValue(0);
  const flatlistIndex = useSharedValue(0)

  const onViewableItemsChanged = ({viewableItems} : {viewableItems: ViewToken[]}) => {
    if(viewableItems[0].index !== null) {
      flatlistIndex.value = viewableItems[0].index;
    }
  }

  const OnScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    }
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList 
      ref={flatlistRef}
      onScroll={OnScroll}
      data={dataOnboarding} 
      renderItem={({item, index}) => {
        return <RenderItem item={item} index={index} x={x}/>;
      }}
      keyExtractor={item => String(item.id)} // Define a key para cada item da lista (melhora a performance!)
      scrollEventThrottle={16}       // Controla a frequência de disparos do evento de scroll 
      horizontal={true}              // Alinha os itens na horizontal em vez da vertical
      bounces={false}                // Desativa o efeito de mola/rebatedor ao atingir os limites do scroll
      pagingEnabled={true}           // Trava o deslize em páginas/telas inteiras a cada scroll
      showsHorizontalScrollIndicator={false} // Oculta a barra visual de rolagem horizontal
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        minimumViewTime: 300,
        viewAreaCoveragePercentThreshold: 10,
      }}
      />
      <View style={styles.bottomContainer}>
        <Pagination data={dataOnboarding} x={x}/>
        <OnboardingButton
          flatlistRef={flatlistRef}
          flatlistIndex={flatlistIndex}
          dataLength={dataOnboarding.length}
          x={x}
        />
      </View>
    </View>
  )
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
})


export default Index
