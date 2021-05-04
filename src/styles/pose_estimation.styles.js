import Styled from "styled-components"

export const PageWrapper = Styled.div`

    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    background-color: #FFD733;
    width:100%;
    height:100%;

    .camera-focus{
        border: none;
    }

`

export const CameraFeed = Styled.img`

    width: 600px;
    height: 600px;
`
