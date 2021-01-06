import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { Preface } from '..'

const LabelRequired = styled('span')`
  color: ${(props) => props.theme.colors.warning};
`

const Label = ({ text, required }) => (
  <>
    <Preface size="xSmall">{text}</Preface>
    {required ? <LabelRequired> *</LabelRequired> : null}
  </>
)

Label.displayName = 'Label'
Label.propTypes = {
  text: propTypes.string,
  required: propTypes.bool,
}

export default Label
