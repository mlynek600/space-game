import {
  GameDataType,
  GameType,
  StarshipType,
  CharacterType,
} from './../types'

export const getRandomCard = (
  gameData: GameDataType,
  gameType: GameType
): CharacterType | StarshipType => {
  const randomNumber = Math.floor(Math.random() * 10)

  const gameItems = gameData[gameType]

  return gameItems[randomNumber]
}
