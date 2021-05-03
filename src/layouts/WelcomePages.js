import React, { useEffect } from "react"
import { Helmet } from "react-helmet"

function WelcomePages({ children }) {
  return (
    <>
      <Helmet>
        <title>UI-Stack for StyleCard</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap"
          rel="stylesheet"
        ></link>
      </Helmet>
      {children}
    </>
  )
}

export default WelcomePages
