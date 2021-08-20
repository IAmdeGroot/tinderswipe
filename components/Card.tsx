import { transform } from "@babel/core";
import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import Animated, { Easing, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type Props = {
    backgroundColor: string
}

export const Card = ({backgroundColor}: Props) => {

  const screen = Dimensions.get("window");

  const translateX = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const opacityX = useSharedValue(1.0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
        //Horizontal
        translateX.value = event.translationX;
        //Rotation
        event.translationX < 35 && event.translationX > -35 ? rotateX.value = event.translationX/2 : null;
        //Opacity
        //event.translationX < 35 && event.translationX > -35 ? event.translationX > 0 ? opacityX.value = 1.0 - event.translationX/100 : opacityX.value = 1.0 + event.translationX/100 : null;
    },
    onEnd: () =>{
        translateX.value > screen.width /1.5 ? translateX.value = screen.width : translateX.value < -1 * screen.width/1.5 ? translateX.value = -1 * screen.width : translateX.value = 0;
        rotateX.value = 0;
        console.log(-1 * 30);
    }
  });

  const config : Animated.WithTimingConfig = {
    duration: 1,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const rStyle = useAnimatedStyle(() => ({
      //      transform: [{translateX: withTiming(translateX.value, config)}]
      //transform: [{translateX: translateX.value}]
      transform: [{translateX: translateX.value},{rotateZ: rotateX.value + "deg"}],
      opacity: opacityX.value,
      position: 'absolute'
  }))

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View style={[styles.container, rStyle, {backgroundColor: backgroundColor}]}>
        <Text>Hi</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screen.width,
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
});
