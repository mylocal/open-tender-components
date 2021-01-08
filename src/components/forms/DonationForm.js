import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import { CreditCardForm } from '.'
import { ButtonStyled, Input, Text } from '../index'
import {
  FormError,
  FormFieldset,
  FormInputs,
  FormLegend,
  FormSubmit,
  Select,
} from '../inputs'

const handleAmountError = (error) => {
  if (!error) return null
  return error.includes('money') ? 'Amount must be a positive number' : error
}

const DonationForm = ({
  purchase,
  reset,
  setAlert,
  loading,
  error,
  success,
  donation,
  customer = {},
  creditCards = [],
}) => {
  const [amount, setAmount] = useState('')
  const [email, setEmail] = useState(customer ? customer.email : '')
  const [isNewCard, setIsNewCard] = useState(true)
  const [creditCard, setCreditCard] = useState(null)
  const [creditCardOptions, setCreditCardOptions] = useState([])
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const newCardError = error
    ? Object.entries(error)
        .filter(([key]) => key !== 'form')
        .reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {})
    : null
  const errMsg =
    errors.form && errors.form.includes('parameters')
      ? 'There are one or more errors below'
      : errors.form || null

  useEffect(() => {
    if (loading === 'idle') {
      setSubmitting(false)
      setAlert({ type: 'close' })
    }
    if (error) setErrors(error)
  }, [loading, error, setAlert])

  useEffect(() => {
    if (creditCards.length) {
      const options = creditCards.map((i) => ({
        name: `${i.card_type_name} ending in ${i.last4}`,
        value: i.customer_card_id,
      }))
      setCreditCardOptions(options)
      const defaultCard = creditCards.length
        ? { customer_card_id: creditCards[0].customer_card_id }
        : {}
      setCreditCard(defaultCard)
      setIsNewCard(false)
    }
  }, [creditCards])

  const handleAmount = (evt) => {
    setAmount(evt.target.value)
  }

  const handleEmail = (evt) => {
    setEmail(evt.target.value)
  }

  const handleCreditCard = (evt) => {
    const customerCardId = parseInt(evt.target.value)
    setCreditCard({ customer_card_id: customerCardId })
  }

  const handleSubmitNewCard = (card) => {
    setErrors({})
    setSubmitting(true)
    const alert = {
      type: 'working',
      args: { text: 'Submitting your contribution...' },
    }
    setAlert(alert)
    purchase({ amount, email, credit_card: card })
  }

  const handleSubmit = () => {
    const { email } = customer || {}
    if (!amount || !email) {
      setErrors({ form: 'Both amount and email are required' })
    } else {
      setSubmitting(true)
      const alert = {
        type: 'working',
        args: { text: 'Submitting your contribution...' },
      }
      setAlert(alert)
      purchase({ amount, email, credit_card: creditCard })
    }
  }

  const handleReset = () => {
    setErrors({})
    reset()
  }

  return success ? (
    <FormFieldset>
      <FormLegend
        as="div"
        title="Success! Please check your email for your receipt."
        subtitle={`Thanks for your contribution of $${donation.amount}. We really
            appreciate it.`}
      />
      <FormSubmit>
        <ButtonStyled onClick={handleReset}>
          Make Another Contribution
        </ButtonStyled>
      </FormSubmit>
    </FormFieldset>
  ) : (
    <>
      <form id="donation-form" noValidate>
        <FormError errMsg={errMsg} style={{ margin: '0 0 2rem' }} />
        <FormFieldset>
          <FormLegend
            as="div"
            title="Enter an amount and an email address"
            subtitle="We'll send a receipt to the email address you enter below."
          />
          <FormInputs>
            <Input
              label="Contribution Amount"
              name="amount"
              type="number"
              value={amount}
              onChange={handleAmount}
              error={handleAmountError(errors.amount)}
              required={true}
            />
            <Input
              label="Your Email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmail}
              error={errors.email}
              required={true}
              disabled={customer ? true : false}
            />
          </FormInputs>
        </FormFieldset>
        {!isNewCard && creditCards.length && (
          <FormFieldset>
            <FormLegend
              as="div"
              title="Add your payment information"
              subtitle="Choose an existing credit card or add new one from your
                  account page."
            />
            <FormInputs>
              <Select
                label="Choose Card"
                name="credit_card"
                value={creditCard.customer_card_id}
                onChange={handleCreditCard}
                error={errors.credit_card}
                required={true}
                options={creditCardOptions}
              />
            </FormInputs>
            <FormSubmit style={{ margin: '3rem 0 0' }}>
              <ButtonStyled
                onClick={handleSubmit}
                disabled={submitting}
                size="big"
              >
                {submitting ? 'Submitting...' : 'Submit Contribution'}
              </ButtonStyled>
            </FormSubmit>
          </FormFieldset>
        )}
      </form>
      {isNewCard && (
        <FormFieldset>
          <FormLegend
            as="div"
            title="Add your payment information"
            subtitle="Please enter your payment info below."
          />
          {amount && email ? (
            <CreditCardForm
              loading={loading}
              error={newCardError}
              addCard={handleSubmitNewCard}
              submitText="Submit Contribution"
              submittingText="Submitting..."
            />
          ) : (
            <FormInputs>
              <Text as="p" color="error">
                Please enter your name & email before adding your payment
                information.
              </Text>
            </FormInputs>
          )}
        </FormFieldset>
      )}
    </>
  )
}

DonationForm.displayName = 'DonationForm'
DonationForm.propTypes = {
  purchase: propTypes.func,
  reset: propTypes.func,
  setAlert: propTypes.func,
  loading: propTypes.string,
  error: propTypes.object,
  success: propTypes.bool,
  donation: propTypes.object,
  customer: propTypes.object,
  creditCards: propTypes.array,
}

export default DonationForm
