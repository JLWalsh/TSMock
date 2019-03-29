## TSMock
An (**experimental**) library that allows for mocking classes & functions like 
BDD Mockito.

By default, all mocks will return undefined. This library was made to mock
class methods or functions directly, so it will be impossible to mock properties.

### I want to mock a...

### Class
```typescript
interface RandomNumberGenerator {
    generateRandom(): number;
    generateRandomWithSeed(seed: number): number;
}

const rng = Mock.newObject<RandomNumberGenerator>();
// Or let Typescript infer the type
const rng: RandomNumberGenerator = Mock.newObject();

willReturn(10).given(rng).generateRandom();

console.log(rng.generateRandom()); // 10

// We can also return a result depending on what the args are given 
willReturn(27).given(rng).generateRandomWithSeed(32);

console.log(rng.generateRandomWithSeed(32)); // 27
console.log(rng.generateRandomWithSeed(54)); // undefined
``` 


### Function
Due to their different nature, functions have to be mocked using `Mock.newFunction`
```typescript
function generateRandom(seed: number | void) {
    if(seed){ return seed + 42; }
    return 42;
}

const mockedGenerateRandom = Mock.newFunction<typeof generateRandom>();

// This will return 24 when no args are given.
// Do notice that you have to call the method after the given.
willReturn(24).given(mockedGenerateRandom)();
willReturn(27).given(mockedGenerateRandom)(27);

console.log(mockedGenerateRandom()); // 24
console.log(mockedGenerateRandom(27)); // 27;
```
