import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import Animated, {useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Text, View } from '../components/Themed';

export default function TabThreeScreen() {
  const randomWidth = useSharedValue(10);

  const config : Animated.WithSpringConfig = {
    velocity: 500,
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(randomWidth.value, config),
      backgroundColor: randomWidth.value > 200 ? 'blue' : 'red'
    };
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      <Animated.View
        style={[{ width: 100, height: 80, margin: 30 }, animatedStyle]}
      />
      <Text>{randomWidth.value}</Text>
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
