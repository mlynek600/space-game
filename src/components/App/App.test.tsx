import React from 'react'

import { render, screen } from '@testing-library/react'

import App from './App'

import { getCharacterBmiDifference, getStarshipResult } from '../../utils'

it('should have app title', () => {
  render(<App />)

  const title = screen.getByText(/Let's play the Star Wars game!/i)

  expect(title).toBeInTheDocument()
})

it('should return correct BMI difference', () => {
  const character = {
    name: 'Test',
    mass: '80',
    height: '180',
  }

  const result = Math.round(getCharacterBmiDifference(character))

  expect(result).toEqual(3)
})

it('should return correct starship result', () => {
  const starship = {
    name: 'Test',
    length: '1,500',
    hyperdrive_rating: '2',
  }

  expect(getStarshipResult(starship)).toEqual(3000)
})

it('should have select game type tab', () => {
  render(<App />)

  expect(screen.getByTestId('charactersTab')).toBeInTheDocument()
})
