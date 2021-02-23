import React from "react";

import { Container } from "./styles";
import Sweet from "../Sweet";
export default function SweetList(props) {
  console.log(props);

  return (
    <Container>
      <ul>
        {props.sweet.map((sweet, index) => (
          <Sweet
          key={sweet._id}
          sweetid={sweet._id}
          owner={sweet.owner}
          content={sweet.content}
          likes={sweet.likes}
          onLike={props.onLike}
        />
        ))}
      </ul>
    </Container>
  );
}