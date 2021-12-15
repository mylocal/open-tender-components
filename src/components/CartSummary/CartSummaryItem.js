import React from 'react'
import propTypes from 'prop-types'
import styled from '@emotion/styled'
import { formatDollars, makeModifierNames } from '@open-tender/js'
import { BgImage, CartItemCount } from '..'

const CartSummaryItemView = styled('div')`
  margin: 0 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartSummaryItemImage = styled(BgImage)`
  position: relative;
  width: 6rem;
  min-width: 6rem;
  height: 6rem;
  margin: 0 2rem 0 0;
  background-color: ${(props) => props.theme.bgColors.secondary};
  border-radius: ${(props) => props.theme.border.radiusSmall};
`

const CartSummaryItemContainer = styled('div')`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`

const CartSummaryItemContent = styled('div')`
  flex: 1 1 100%;
`

const CartSummaryItemName = styled('p')`
  font-size: ${(props) => props.theme.fonts.sizes.small};
  font-weight: ${(props) => props.theme.boldWeight};
  color: ${(props) => props.theme.colors.primary};
`

const CartSummaryItemMods = styled('p')`
  margin: 0.25rem 0 0;
  font-size: ${(props) => props.theme.fonts.sizes.xSmall};
  color: ${(props) => props.theme.colors.secondary};
`

const CartSummaryItemPrice = styled('div')`
  flex: 1 0 7rem;
  text-align: right;

  p {
    font-size: ${(props) => props.theme.fonts.sizes.small};
    font-weight: ${(props) => props.theme.boldWeight};
    color: ${(props) => props.theme.colors.primary};
  }
`

const CartSummaryItem = ({ item }) => {
  const bgStyle = item.imageUrl
    ? { backgroundImage: `url(${item.imageUrl}` }
    : null
  const price = formatDollars(item.totalPrice)
  const mods = makeModifierNames(item)

  return (
    <CartSummaryItemView>
      <CartSummaryItemImage style={bgStyle}>
        <CartItemCount count={item.quantity} />
      </CartSummaryItemImage>
      <CartSummaryItemContainer>
        <CartSummaryItemContent>
          <CartSummaryItemName>{item.name}</CartSummaryItemName>
          {mods && <CartSummaryItemMods>{mods}</CartSummaryItemMods>}
        </CartSummaryItemContent>
        <CartSummaryItemPrice>
          <p>{price}</p>
        </CartSummaryItemPrice>
      </CartSummaryItemContainer>
    </CartSummaryItemView>
  )
}

CartSummaryItem.displayName = 'CartSummaryItem'
CartSummaryItem.propTypes = {
  item: propTypes.object,
}

export default CartSummaryItem
