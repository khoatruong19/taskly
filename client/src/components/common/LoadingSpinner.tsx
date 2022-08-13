import React from 'react'
import styled from 'styled-components'
import { TailSpin } from  'react-loader-spinner'
import { yellowColor } from '../../constants'

const Container = styled.div`
    height: 100vh;
    width:100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

const LoadingSpinner = () => {
  return (
    <Container>
        <TailSpin
            height = "80"
            width = "80"
            radius = "9"
            color = {yellowColor}
            ariaLabel = 'three-dots-loading'     
        />;
    </Container>
  )
}

export default LoadingSpinner