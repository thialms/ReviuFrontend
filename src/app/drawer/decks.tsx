import Header from '@/components/Header'
import { DrawerSceneWrapper } from '@/components/drawer-scene-wrapper'
import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, TextInput, View, type DimensionValue } from 'react-native'

const deckItems = [
  { title: 'English', count: '12 cards to review', color: '#C12F82', width: '88%' as DimensionValue },
  { title: 'Math', count: '08 cards to review', color: '#F8664F', width: '80%' as DimensionValue },
  { title: 'Geograph', count: '08 cards to review', color: '#D09D5D', width: '73%' as DimensionValue },
]

const Decks = () => {
  return (
    <DrawerSceneWrapper>
      <View style={styles.container}>
        <Header backgroundColor="#3772FF" iconColor="#FFFFFF" />

        <View style={styles.content}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder=""
              placeholderTextColor="#3F3F3F"
              accessibilityLabel="Search decks"
            />
            <Feather name="search" size={24} color="#3772FF" />
          </View>

          <View style={styles.deckList}>
            {deckItems.map((deck) => (
              <View
                key={deck.title}
                style={[styles.deckCard, { backgroundColor: deck.color, width: deck.width }]}
              >
                <Text style={styles.deckTitle}>{deck.title}</Text>
                <Text style={styles.deckCount}>{deck.count}</Text>
              </View>
            ))}
          </View>

          <Pressable
            style={styles.addButton}
            accessibilityRole="button"
            accessibilityLabel="Add deck"
            onPress={() => Alert.alert('Adicionar deck', 'Botão de adicionar funcionando.')}
          >
            <Feather name="plus" size={36} color="#1A1A1A" />
          </Pressable>
        </View>
      </View>
    </DrawerSceneWrapper>
  )
}

export default Decks

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3772FF',
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 110,
  },
  searchBar: {
    alignSelf: 'center',
    width: '88%',
    height: 40,
    borderRadius: 22,
    backgroundColor: '#E6E8E6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: '#1A1A1A',
    fontSize: 16,
  },
  deckList: {
    marginTop: 22,
    gap: -1,
  },
  deckCard: {
    height: 140,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 10,
    paddingTop: 10,
    marginBottom: -12,
    shadowColor: '#173B99',
    shadowOffset: { width: 7, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 2,
    elevation: 7,
  },
  deckTitle: {
    color: '#000000',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '500',
  },
  deckCount: {
    marginTop: 'auto',
    marginBottom: 18,
    paddingRight: 10,
    textAlign: 'right',
    color: '#000000',
    fontSize: 17,
    fontWeight: '600',
  },
  addButton: {
    alignSelf: 'flex-end',
    width: 46,
    height: 46,
    marginTop: 30,
    marginRight: 28,
    borderRadius: 23,
    backgroundColor: '#E6E8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
})