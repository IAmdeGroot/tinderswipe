import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import Animated, { Easing, EasingNode, Transition, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Card } from "../components/Card";
import { View } from "../components/Themed";

export interface IProfile {
  id: string;
  age: number;
  name: string;
  img_url: string;
  isLiked: boolean;
}

export default function TabTwoScreen() {
  const profile_one: IProfile = {
    id: "1",
    age: 26,
    name: "Ms Doe",
    img_url: "https://images.pexels.com/photos/5688725/pexels-photo-5688725.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const profile_two: IProfile = {
    id: "2",
    age: 30,
    name: "Ms Baba",
    img_url: "https://images.pexels.com/photos/5368679/pexels-photo-5368679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const [profiles, setProfiles] = useState([profile_one, profile_two]);

  const heartWidth = useSharedValue(0);
  const heartHeight = useSharedValue(0);
  const heartOpacity = useSharedValue(0);

  const springConfig : Animated.WithSpringConfig = {
    velocity: 1000,
  };

  const rHeartStyle = useAnimatedStyle(() => ({
    opacity: withTiming(heartOpacity.value),
    width: withSpring(heartWidth.value, springConfig),
    height: withSpring(heartHeight.value, springConfig),
  }));


  const onDismiss = useCallback(
    (profile: IProfile, isLiked: boolean) => {
      if (isLiked) {
        heartHeight.value = 120;
        heartWidth.value = 120;
        heartOpacity.value = 1;
      }
      setProfiles((profiles) => profiles.filter((item) => item.id !== profile.id));
      setTimeout(() => {
        heartOpacity.value = 0;
        heartWidth.value = 0;
        heartHeight.value = 0;
      }, 500);
    },[]);


  useEffect(() => {
    if (profiles.length == 1) {
      console.log("ONLY 1 LEFT FETCH MORE PROFILES")
    }
  }, [profiles])

  return (
    <View style={styles.container}>
      <Animated.Image style={[styles.heart, rHeartStyle]} source={{uri: "https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-512.png"}}/>
      {profiles.map((profile, i) => (
        <Card key={i} profile={profile} onDismiss={onDismiss} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  heart: {
    position: "absolute",
    zIndex: 100,
  }
});
