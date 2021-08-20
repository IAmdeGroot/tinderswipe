import * as React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

type Props = {
  backgroundColor: string;
  name: string;
  age: number;
};

export const Card = ({ backgroundColor, name, age }: Props) => {
  const screen = Dimensions.get("window");
  const translateX = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const opacityLike = useSharedValue(0);
  const opacityNope = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      //Horizontal
      translateX.value = event.translationX;

      //Rotation
      event.translationX < 35 && event.translationX > -35
        ? (rotateX.value = event.translationX / 2)
        : null;

      //Show like or nope
      event.translationX > 0 ? (opacityLike.value = event.translationX) : null;
      event.translationX < 0 ? (opacityNope.value = event.translationX * -1) : null;
    },
    onEnd: () => {
      translateX.value > screen.width / 1.5
        ? (translateX.value = screen.width)
        : translateX.value < (-1 * screen.width) / 1.5
        ? (translateX.value = -1 * screen.width)
        : (translateX.value = 0);
      rotateX.value = 0;
      opacityLike.value = 0;
      opacityNope.value = 0;
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { rotateZ: rotateX.value + "deg" },
    ],
    position: "absolute",
  }));

  const rLikeStyle = useAnimatedStyle(() => ({
    opacity: opacityLike.value,
    fontSize: opacityLike.value,
  }));

  const rNopeStyle = useAnimatedStyle(() => ({
    opacity: opacityNope.value,
  }));

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <Animated.View
        style={[styles.container, rStyle, { backgroundColor: backgroundColor }]}
      >
        <View style={styles.bottombar}>
          <Animated.View style={[styles.likeOrNope, rLikeStyle]}>
            <Text style={styles.likeText}>Like</Text>
          </Animated.View>
          <Text>
            {name} {age}
          </Text>
          <Animated.View style={[styles.likeOrNope, rNopeStyle]}>
            <Text style={styles.nopeText}>Nope</Text>
          </Animated.View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    height: "100%",
    justifyContent: "flex-end",
  },
  bottombar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    height: 40,
    width: "100%",
  },
  likeOrNope: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  likeText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
  },
  nopeText: {
    fontSize: 18,
    color: "red",
    fontWeight: "700",
  },
});
