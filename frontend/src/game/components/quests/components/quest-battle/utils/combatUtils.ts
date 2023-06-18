export const calcDamage = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}
