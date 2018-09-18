'use strict';

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
  Animated
} from 'react-native';

export const DoneButton = ({
  styles, onDoneBtnClick, rightTextColor, isDoneBtnShow,
  doneBtnLabel,
}) => {
  return (
    <View>
      {isDoneBtnShow ? Platform.OS === 'ios' ?
        <View style={styles.btnContainer}>
          <Animated.View style={[styles.full, { height: 0 }]}
          >
            <TouchableOpacity style={styles.full}
              onPress={onDoneBtnClick}>
              <Text style={[styles.nextButtonText, { color: rightTextColor }]}>
                {doneBtnLabel}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        :
        <View style={[styles.btnContainer, { height: 0, paddingBottom: 5 }]}>
          <TouchableOpacity style={styles.full}
            onPress={onDoneBtnClick}
          >
            <Text style={[styles.nextButtonText, { color: rightTextColor }]}>
              {doneBtnLabel}
            </Text>
          </TouchableOpacity>
        </View>
        : <View style={styles.btnContainer} ><View style={styles.full}></View></View>}
    </View>
  )
}

export default DoneButton