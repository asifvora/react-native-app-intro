import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Platform
} from 'react-native';

export const SkipButton = ({
    styles, onSkipBtnClick, isSkipBtnShow,
    leftTextColor,
    skipBtnLabel,
    skipFadeOpacity,
}) => {
    return (
        <View>
            {Platform.OS === 'ios' ?
                <View style={[styles.btnContainer, {
                    paddingBottom: 5,
                    opacity: isSkipBtnShow ? 1 : 0,
                }]}>
                    <TouchableOpacity
                        style={styles.full}
                        onPress={isSkipBtnShow ? () => onSkipBtnClick() : null}>
                        <Text style={[styles.controllText, { color: leftTextColor }]}>
                            {skipBtnLabel}
                        </Text>
                    </TouchableOpacity>
                </View>
                :
                <Animated.View style={[styles.btnContainer, {
                    opacity: skipFadeOpacity,
                    transform: [{
                        translateX: skipFadeOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 15],
                        }),
                    }],
                }]}
                >
                    <TouchableOpacity
                        style={styles.full}
                        onPress={isSkipBtnShow ? () => onSkipBtnClick() : null}>
                        <Text style={[styles.controllText, { color: leftTextColor }]}>
                            {skipBtnLabel}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            }
        </View>
    )
}

export default SkipButton