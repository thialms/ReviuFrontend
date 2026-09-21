import Header from '@/components/Header'
import { DrawerSceneWrapper } from '@/components/drawer-scene-wrapper'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Friends = () => {
	return (
		<DrawerSceneWrapper>
			<View style={styles.container}>
				<Header />

				<View style={styles.content}>
					<Text style={styles.title}>Friends</Text>
				</View>
			</View>
		</DrawerSceneWrapper>
	)
}

export default Friends

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E6E8E6',
	},
	content: {
		flex: 1,
		paddingHorizontal: 20,
		paddingTop: 2,
	},
	title: {
		color: '#111111',
		fontSize: 24,
		lineHeight: 30,
		fontWeight: '700',
	},
})
