import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Person = (props) => (
  <Svg
    width={62}
    height={62}
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    transform={[{ scale: 0.6 }]}
    {...props}
  >
    <Path
      d="M31 7.362a8.136 8.136 0 0 1 8.138 8.138A8.136 8.136 0 0 1 31 23.637a8.136 8.136 0 0 1-8.137-8.137A8.136 8.136 0 0 1 31 7.363Zm0 34.876c11.509 0 23.638 5.657 23.638 8.137v4.263H7.361v-4.263c0-2.48 12.13-8.138 23.638-8.138ZM31 0c-8.564 0-15.5 6.936-15.5 15.5S22.436 31 31 31s15.5-6.936 15.5-15.5S39.564 0 31 0Zm0 34.875c-10.346 0-31 5.193-31 15.5v7.75A3.886 3.886 0 0 0 3.875 62h54.25A3.886 3.886 0 0 0 62 58.125v-7.75c0-10.307-20.654-15.5-31-15.5Z"
      fill="#fff"
    />
  </Svg>
);

export default Person;
