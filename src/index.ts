import {DefaultAction, Mock} from "./Mock";
import {willResolve, willReturn} from "./builders";

function generateRandom(seed: number | void) {
    return 42;
}

const mockedGenerateRandom = Mock.createNew<typeof generateRandom>();

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

const rng = Mock.createNew<RandomNumberGenerator>();
// Or let Typescript infer the type
// const rng: RandomNumberGenerator = Mock.createNew();

willReturn(10).given(rng).generateRandom();

console.log(rng.generateRandom()); // 10

// We can also return a result depending on what the args are given
willReturn(27).given(rng).generateRandomWithSeed(32);

console.log(rng.generateRandomWithSeed(32)); // 27
console.log(rng.generateRandomWithSeed(54)); // undefined

// Let's add a default behaviour.
// In this case, we want to throw an error when we attempt to access a function that hasn't been mocked

const defaultMockRng = Mock.createNew<RandomNumberGenerator>({ defaultAction: DefaultAction.THROW_ERROR });
try {
    defaultMockRng.generateRandom();
} catch (error) {
    console.error(error); // Error: Not mocked.
}

// But in this case, we want to return the promise that resolve to the number 42 anytime we access an unmocked function
willResolve(42).givenUnrecognizedBehaviour(defaultMockRng);

console.log(defaultMockRng.generateRandom()); // Promise { 42 }

