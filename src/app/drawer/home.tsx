import Elefante from '@/assets/elefante.svg'
import Header from '@/components/Header'
import { DrawerSceneWrapper } from '@/components/drawer-scene-wrapper'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'

const deckStats = [
  { title: 'English', value: '12', subtitle: 'Cards to review' },
  { title: 'Math', value: '08', subtitle: 'Cards to review' },
  { title: 'Geography', value: '11', subtitle: 'Cards to review' },
]

const Home = () => {
  const router = useRouter()
  const { width: screenWidth } = useWindowDimensions()
  const cardSlotWidth = (screenWidth - 40 - 24) / 3

  return (
    <DrawerSceneWrapper enableSwipe={false}>
      <View style={styles.container}>
        <Header />

        <View style={styles.content}>
          <Text style={styles.greeting}>Hi, Thiago</Text>
          <Text style={styles.subtitle}>You have 3 pending decks to review</Text>

          <View style={styles.pointsCard}>
            <View style={styles.pointsTextWrap}>
              <Text style={styles.pointsLabel}>You have</Text>
              <Text style={styles.pointsValue}>200</Text>
              <Text style={styles.pointsLabel}>points</Text>
            </View>

            <View style={styles.emojiWrap}>
              <View style={styles.emojiWrap}>
          <Elefante width={180} height={150} />
</View>
            </View>
          </View>

          <View style={styles.pendingRow}>
            <Text style={styles.pendingText}>3 Pending decks</Text>
            <Text style={styles.pendingIcon}>!</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.grid}
            contentContainerStyle={styles.gridContent}
          >
            {deckStats.map((item) => (
              <View key={item.title} style={[styles.cardSlot, { width: cardSlotWidth }]}>
                <View style={styles.card}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardValue}>{item.value}</Text>
                  <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <Pressable
            onPress={() => router.push('/drawer/decks')}
            accessibilityRole="button"
            accessibilityLabel="View all decks"
          >
            <Text style={styles.seeAll}>View all decks</Text>
          </Pressable>
        </View>
      </View>
    </DrawerSceneWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E8E6',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#495057',
    marginBottom: 18,
  },
 pointsCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#3772FF',
  borderRadius: 22,
  paddingHorizontal: 20,
  paddingVertical: 18,
  marginBottom: 18,
  minHeight: 120,
  overflow: 'hidden',
},
elefanteWrap: {
  width: 180,
  height: 150,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: -12,
  marginBottom: -8,
},
  pointsTextWrap: {
    justifyContent: 'center',
  },
  pointsLabel: {
    color: '#E6E8E6',
    fontSize: 18,
    fontWeight: '700',
  },
  pointsValue: {
    color: '#E6E8E6',
    fontSize: 52,
    fontWeight: '800',
    lineHeight: 56,
  },
  emojiWrap: {
    width: 120,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 72,
  },
  pendingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  pendingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  pendingIcon: {
    marginLeft: 8,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#ec0909',
    color: '#fff',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontWeight: '700',
    fontSize: 14,
  },
  grid: {
    flexGrow: 0,
  },
  gridContent: {
    gap: 12,
  },
  cardSlot: {
    height: 150,
  },
  card: {
    flex: 1,
    backgroundColor: '#F2C94C',
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 12,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  cardValue: {
    fontSize: 44,
    fontWeight: '800',
    color: '#1A1A1A',
    lineHeight: 48,
    marginBottom: 6,
    fontFamily: 'Inter',
  },
  cardSubtitle: {
    fontSize: 11,
    color: '#3D3D3D',
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  seeAll: {
    marginTop: 18,
    textAlign: 'center',
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
})