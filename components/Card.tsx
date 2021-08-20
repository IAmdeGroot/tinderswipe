import * as React from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { IProfile } from "../screens/TabTwoScreen";

type Props = {
  profile: IProfile
  onDismiss?: (profile: IProfile, isLiked: boolean) => void;
};

export const Card = ({ profile, onDismiss }: Props) => {
  const screen = Dimensions.get("window");
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotateX = useSharedValue(0);
  const opacityLike = useSharedValue(0);
  const opacityNope = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      //Horizontal
      translateX.value = event.translationX;

      //Vertical
      translateY.value = (event.translationX * -1) / 3;

      //Rotation
      event.translationX < 35 && event.translationX > -35
        ? (rotateX.value = event.translationX / 2)
        : null;

      //Show like or nope
      event.translationX > 0 ? (opacityLike.value = event.translationX) : null;
      event.translationX < 0 ? (opacityNope.value = event.translationX * -1) : null;
    },
    onEnd: () => {
      const shouldBeDismissedLike = translateX.value > screen.width / 3;
      const shouldBeDismissedNope = translateX.value < (-1 * screen.width) /3;

      if (shouldBeDismissedLike) {
        translateX.value = withTiming(screen.width, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(profile, true);
          }
        })
      } else if (shouldBeDismissedNope) {
        translateX.value = withTiming(-1 * screen.width, undefined, (isFinished) => {
          if (isFinished && onDismiss) {
            runOnJS(onDismiss)(profile, false);
          }
        })
      } else {
        rotateX.value = 0;
        opacityLike.value = 0;
        opacityNope.value = 0;
        translateX.value = 0;
        translateY.value = 0;
      }
  
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
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
        style={[styles.container, rStyle]}
      >
        <Image style={styles.image} source={{uri: profile.img_url }} />
        <View style={styles.bottombar}>
          <Animated.View style={[styles.likeOrNope, rLikeStyle]}>
            <Text style={styles.likeText}>Like</Text>
          </Animated.View>
          <Text>
            {profile.name} {profile.age}
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
    borderRadius: 20,
  },
  bottombar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "pink",
    height: 60,
    width: "100%",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  likeOrNope: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  likeText: {
    fontSize: 18,
    color: "green",
    fontWeight: "700",
    marginLeft: 10,
    textAlign: "center"
  },
  nopeText: {
    fontSize: 18,
    color: "red",
    fontWeight: "700",
    marginRight: 10,
    textAlign: "center"
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%"
  }
});
