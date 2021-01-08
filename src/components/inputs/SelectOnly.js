import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'

const SelectOnlyView = styled('span')`
  position: relative;
  display: block;
  flex-grow: 1;
`

const SelectArrow = styled('span')`
  position: absolute;
  display: block;
  content: ' ';
  z-index: 2;
  bottom: 1.8rem;
  right: 1.5rem;
  width: 1.1rem;
  height: 1.1rem;
  border-bottom-width: 0.2rem;
  border-bottom-style: solid;
  border-right-width: 0.2rem;
  border-right-style: solid;
  border-color: ${(props) => props.theme.colors.primary};
  transform: scale(1) rotate(45deg);
`

const SelectOnly = ({ label, name, value, onChange, disabled, options }) => (
  <SelectOnlyView>
    <select
      aria-label={label}
      id={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options ? (
        options.map((option, index) => (
          <option key={`${option.value}-${index}`} value={option.value}>
            {option.name}
          </option>
        ))
      ) : (
        <option>loading...</option>
      )}
    </select>
    <SelectArrow />
  </SelectOnlyView>
)

SelectOnly.displayName = 'SelectOnly'
SelectOnly.propTypes = {
  label: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  disabled: propTypes.bool,
  options: propTypes.array,
}

export default SelectOnly
