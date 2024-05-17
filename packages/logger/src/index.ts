export const log = (...args: unknown[]): void => {
  // eslint-disable-next-line no-console -- logger
  console.log("LOGGER: ", ...args);
};

export interface DemoMessage {
  message: string
}

export const createDemoMessage = (message: string): DemoMessage => {
  return {
    message
  }
}
export const createDemoMessage2 = (message: string): DemoMessage => {
  return {
    message:  message + "2"
  }
}
export const createDemoMessage3x = (message: string): DemoMessage => {
  return {
    message:  message + "3"
  }
}