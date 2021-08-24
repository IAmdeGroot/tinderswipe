import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
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
    img_url: "https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const profile_two: IProfile = {
    id: "2",
    age: 30,
    name: "Ms Granger",
    img_url: "https://images.pexels.com/photos/5368679/pexels-photo-5368679.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

   const profile_three: IProfile = {
    id: "3",
    age: 26,
    name: "Ms Smith",
    img_url: "https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const profile_four: IProfile = {
    id: "4",
    age: 33,
    name: "Ms Stone",
    img_url: "https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const profile_five: IProfile = {
    id: "5",
    age: 22,
    name: "Ms Doe",
    img_url: "https://images.pexels.com/photos/1161203/pexels-photo-1161203.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    isLiked: false
  };

  const dummyProfiles = [profile_one, profile_two, profile_three, profile_four, profile_five]
  const [profiles, setProfiles] = useState(dummyProfiles);

  const screen = Dimensions.get("window");
  const heartWidth = useSharedValue(0);
  const heartHeight = useSharedValue(0);
  const heartOpacity = useSharedValue(0);
  const heartTranslateX = useSharedValue(screen.width);

  const springConfig : Animated.WithSpringConfig = {
    velocity: 1000,
  };

  const timingConfig : Animated.WithTimingConfig = {
    duration: 500,
  };

  const rHeartStyle = useAnimatedStyle(() => ({
    opacity: withTiming(heartOpacity.value),
    width: withSpring(heartWidth.value, springConfig),
    height: withSpring(heartHeight.value, springConfig),
    transform: [{translateX: withTiming(heartTranslateX.value,timingConfig)}]
  }));

  const onDismiss = useCallback(
    (profile: IProfile, isLiked: boolean) => {
      if (isLiked) {
        heartHeight.value = 80;
        heartWidth.value = 80;
        heartOpacity.value = 1;
        heartTranslateX.value = -1;
      }
      setProfiles((profiles) => profiles.filter((item) => item.id !== profile.id));
      setTimeout(() => {
        heartOpacity.value = 0;
        heartWidth.value = 0;
        heartHeight.value = 0;
        heartTranslateX.value = screen.width;
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