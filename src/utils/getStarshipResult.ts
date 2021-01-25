import { CardDataType, StarshipType } from './../types'

export const getStarshipResult = (
  myCardData?: CardDataType,
  opponentCardData?: CardDataType
): number => {
  const dataSource = myCardData ? myCardData : opponentCardData

  const { length, hyperdrive_rating } = dataSource as StarshipType

  const result =
    Number(length.replace(',', '')) * Number(hyperdrive_rating)

  return result
}
