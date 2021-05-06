import React from "react"
import * as S from "./CarouselItem.style"
import { PageProps } from "gatsby"

const CarouselItem = ({image, text, key} : {image:any; text:String; key: number} ) => {
  return (
    <S.Slide key={key} image={image}>
      <S.SlideText>{text}</S.SlideText>
    </S.Slide>
  )
}

export default CarouselItem
