export default function Logger(namespace:string) {
  return function(...args:any[]) {
    console.log(`${namespace} >> `, ...args);
  };
}
