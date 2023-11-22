export type HelloResponse = {
  message: string;
}

export const helloHelper = (): HelloResponse => {
  return {
    message: 'Hello from Helper x'
  }
}

export const helloHelper2 = (): HelloResponse => {
  return {
    message: 'Hello from Helper 2'
  }
}

export const monkeyMagic = (): HelloResponse => {
  return {
    message: 'Hello from monkey magic'
  }
}
