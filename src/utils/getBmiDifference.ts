export const getBmiDifference = (mass: string, height: string): number => {
  const perfectBMI = 21.75

  const heightValue = Number(height) / 100

  const BMI = Number(mass) / (heightValue * heightValue)

  return Math.abs(BMI - perfectBMI)
}
