import { ReactNode } from "react";
import { useDrawerProgress } from "@react-navigation/drawer";

import Animated, { useAnimatedStyle, interpolate, Extrapolation, useDerivedValue, withSpring } from "react-native-reanimated";

export function DrawerSceneWrapper({ children }: {children: ReactNode}){
    const progress = useDrawerProgress();

    const springProgress = useDerivedValue(() => {
        return withSpring(
            progress.value,
            {
                damping: 12,
                stiffness: 100,
            }
        )
    })

    const animatedStyled = useAnimatedStyle(() => ({
        transform: [
            { perspective: 1000 },
            {
            scale: interpolate(
                progress.value,
                 [0, 1], 
                 [1, 0.8], 
                 Extrapolation.CLAMP
                ),
            },
            {
                translateX: interpolate(
                    progress.value,
                    [0, 1],
                    [0, 250],
                    Extrapolation.CLAMP
                ),
            },
            {
                rotateY: interpolate(
                    progress.value,
                    [0, 1],
                    [0, -25],
                    Extrapolation.CLAMP
                ) + "deg",
            },
        ],
        borderRadius: 20,
        overflow: 'hidden',
    }))

    return (
        <Animated.View style={[{flex: 1, backgroundColor: '#E6E8E6'}, animatedStyled]}>
            {children}
        </Animated.View>
    )  
}