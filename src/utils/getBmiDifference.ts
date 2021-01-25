import { CardDataType, CharacterType } from '../types'

export const getCharacterBmiDifference = (
  myCardData?: CardDataType,
  opponentCardData?: CardDataType
): number => {
  const dataSource = myCardData ? myCardData : opponentCardData

  const { mass, height } = dataSource as CharacterType

  const perfectBMI = 21.75

  const heightValue = Number(height) / 100

  const BMI = Number(mass) / (heightValue * heightValue)

  return Math.abs(BMI - perfectBMI)
}
