import {Mock} from "./Mock";
import {willReturn, willThrow} from "./builders";

function generateRandom(seed: number | void) {
    return 42;
}

const mockedGenerateRandom = Mock.newFunction<typeof generateRandom>();

// This will return 24 when no args are given.
// Do notice that you have to call the method after the given.
willReturn(24).given(mockedGenerateRandom)();
willReturn(27).given(mockedGenerateRandom)(27);

// console.log(mockedGenerateRandom()); // 24
// console.log(mockedGenerateRandom(27)); // 27;

interface RandomNumberGenerator {
    generateRandom(): number;
    generateRandomWithSeed(seed: number): number;
}

const rng = Mock.newObject<RandomNumberGenerator>();
// Or let Typescript infer the type
// const rng: RandomNumberGenerator = Mock.newObject();

willReturn(10).given(rng).generateRandom();

console.log(rng.generateRandom()); // 10

// We can also return a result depending on what the args are given
willReturn(27).given(rng).generateRandomWithSeed(32);

console.log(rng.generateRandomWithSeed(32)); // 27
console.log(rng.generateRandomWithSeed(54)); // undefined

