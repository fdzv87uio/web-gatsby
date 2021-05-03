import React, { useEffect } from "react"
import * as S from "../styles/index.styles"
import WelcomePages from "../layouts/WelcomePages"
// import CarouselItem from "../components/CarouselItem/CarouselItem.component"
import { Link } from "gatsby"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { observer } from "mobx-react"
import UserStore from "../stores/UserStore"
import doodle1 from "../images/doodle1.png"
import doodle2 from "../images/doodle2.png"
import doodle3 from "../images/doodle3.png"

const Items = [
  {
    text: "It's a simple three step process",
    image: doodle1,
  },
  {
    text: "We capture two photos",
    image: doodle2,
  },
  {
    text: "And your fit preferences...",
    image: doodle3,
  },
]

function Index() {
  useEffect(() => {
    console.log(UserStore.terms)
    console.log(UserStore.age)
  }, [])
  return (
    <WelcomePages>
      <S.PageWrapper>
        <S.CarouselWrapper>
          {/* <S.CustomCarousel
            indicatorIconButtonProps={{
              style: {
                color: "#1958BC",
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                color: "#FFD733",
              },
            }}
            indicatorContainerProps={{
              style: {
                position: "relative",
                bottom: 20,
              },
            }}
          >
            {Items.map((item, key) => (
              <CarouselItem key={key} item={item} />
            ))}
          </S.CustomCarousel> */}
        </S.CarouselWrapper>
        <S.ButtonWrapper>
          <Link to="/terms-and-conditions">
            <span>
              Get Started&nbsp;
              <ArrowForwardIcon />
            </span>
          </Link>
        </S.ButtonWrapper>
      </S.PageWrapper>
    </WelcomePages>
  )
}

export default observer(Index)
