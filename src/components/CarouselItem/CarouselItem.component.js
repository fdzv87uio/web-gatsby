import React from "react";
import * as S from "./CarouselItem.style";

export default function CarouselItem({ item }) {
  return (
    <S.Slide image={item.image}>
      <S.SlideText>{item.text}</S.SlideText>
    </S.Slide>
  );
}
