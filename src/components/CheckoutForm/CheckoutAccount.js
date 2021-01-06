import React, { useState, useCallback, useContext } from 'react'
import debounce from 'lodash/debounce'
import { Button, ButtonLink, ButtonStyled, FormRow, Input, Preface } from '..'
import { FormContext } from './CheckoutForm'
import { CheckoutLineItem } from '.'
import { Label } from '../inputs'

const makeAccountConfig = (required, displayed) => {
  return {
    phone: { label: 'Phone', included: true, required: true },
    company: {
      label: 'Company',
      included: displayed.includes('company') || required.includes('company'),
      required: required.includes('company'),
    },
  }
}

const fields = [
  { name: 'first_name', type: 'text' },
  { name: 'last_name', type: 'text' },
  { name: 'email', type: 'email' },
  { name: 'phone', type: 'tel' },
  { name: 'company', type: 'text' },
]

const CheckoutAccount = () => {
  const formContext = useContext(FormContext)
  const {
    iconMap = {},
    config,
    check,
    form,
    errors,
    updateForm,
    logout,
    goToAccount,
  } = formContext
  const [customer, setCustomer] = useState(form.customer)
  const required = check.config.required.customer
  const displayed = check.config.displayed
    ? check.config.displayed.customer || []
    : []
  const accountConfig = makeAccountConfig(required, displayed)
  const formErrors = errors.customer || {}

  const debouncedUpdate = useCallback(
    debounce((newCustomer) => updateForm({ customer: newCustomer }), 500),
    []
  )

  const handleChange = (evt) => {
    const { id, value } = evt.target
    const field = id.replace('customer-', '')
    const newCustomer = { ...customer, [field]: value }
    setCustomer(newCustomer)
    debouncedUpdate(newCustomer)
  }

  return (
    <fieldset className="form__fieldset">
      <div className="form__legend">
        <p className="form__legend__title ot-heading ot-font-size-h3">
          {config.account.title}
        </p>
        <p className="form__legend__subtitle ot-line-height">
          <ButtonLink onClick={logout}>Click here to logout</ButtonLink> if you
          want to switch accounts or check out as a guest.
        </p>
      </div>
      <div className="form__inputs">
        <FormRow
          type="div"
          label={<Label text="Account" />}
          input={
            <ButtonStyled
              label="Go to account to update name or email"
              icon={iconMap.account || null}
              onClick={goToAccount}
              size="header"
              color="header"
            >
              {customer.first_name} {customer.last_name}
            </ButtonStyled>
          }
        />
        {fields.map((field) => {
          const input = accountConfig[field.name]
          return (
            input &&
            input.included && (
              <Input
                key={field.name}
                label={input.label}
                name={`customer-${field.name}`}
                type={field.type}
                value={customer[field.name]}
                onChange={handleChange}
                error={formErrors[field.name]}
                required={input.required}
              />
            )
          )
        })}
      </div>
    </fieldset>
  )
}

CheckoutAccount.displayName = 'CheckoutAccount'

export default CheckoutAccount
