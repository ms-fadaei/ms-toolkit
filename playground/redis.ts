import { SafeRedisController } from '../src/index';

const redis = new SafeRedisController();
redis.onError(console.error);

(async () => {
  await redis.connect();

  // simple value
  await redis.set('key1', 'value');
  const value = await redis.get('key1');
  console.log('key1', value);

  // object value
  await redis.set('key2', { a: 1, b: 2 });
  const objectValue = await redis.get('key2');
  console.log('key2', objectValue);

  // number value
  await redis.set('key3', 1);
  const numberValue = await redis.get('key3');
  console.log('key3', numberValue);

  // promise value
  await redis.set('key4', Promise.resolve('value'));
  const promiseValue = await redis.get('key4');
  console.log('key4', promiseValue);

  // rejected promise value
  const rejectPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('error'));
    }, 1000);
  });
  await redis.set('key5', rejectPromise);
  const rejectedPromiseValue = await redis.get('key5').catch(() => 'error');
  console.log('key5', rejectedPromiseValue);

  await redis.disconnect();
})();
