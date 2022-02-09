import { createClient, RedisClientOptions } from 'redis';

type SupportedValues = string | number | boolean | object;
type _onErrorCb = (err: Error) => void;

const defaultOptions = {
  socket: {
    reconnectStrategy: (retries: number) => {
      if (retries <= 25) {
        return Math.min(retries * 50, 10000);
      }

      return new Error('Redis connection failed');
    },
  },
};

class SafeRedisController {
  public client;
  public isConnected;
  public error: Error | undefined;
  private _onErrorCb: _onErrorCb | undefined;

  constructor(options: RedisClientOptions = {}) {
    options = Object.assign({}, defaultOptions, options);

    // init properties
    this.client = createClient(options);
    this.isConnected = false;
    this.error = undefined;
    this._onErrorCb = undefined;

    // error handler
    this.client.on('error', (err: Error) => {
      this._handleError(err);
    });
  }

  public onError(cb: _onErrorCb) {
    this._onErrorCb = cb;
  }

  public hasError() {
    return !!this.error;
  }

  public connect(): Promise<void> {
    return this.client
      .connect()
      .then(() => {
        this.isConnected = true;
      })
      .catch((error: Error) => {
        this._handleError(error);
        throw error;
      });
  }

  public set(key: string, value: SupportedValues, option = {}): Promise<void> {
    if (!this.isConnected) return Promise.resolve();

    return this.client
      .set(key, this._convertToString(value), option)
      .then(() => undefined)
      .catch(() => undefined);
  }

  public get(key: string): Promise<SupportedValues | void> {
    if (!this.isConnected) return Promise.resolve();

    return this.client
      .get(key)
      .then((res) => (res ? this._convertFromString(res) : undefined))
      .catch(() => undefined);
  }

  public del(key: string): Promise<boolean> {
    if (!this.isConnected) return Promise.resolve(false);

    return this.client
      .del(key)
      .then(() => true)
      .catch(() => false);
  }

  public has(key: string): Promise<boolean> {
    if (!this.isConnected) return Promise.resolve(false);

    return this.client
      .exists(key)
      .then(Boolean)
      .catch(() => false);
  }

  public disconnect(): Promise<void> {
    if (!this.isConnected) return Promise.resolve();

    return this.client.disconnect().catch();
  }

  private _handleError(err: Error) {
    if (typeof this === 'undefined') return;

    this.isConnected = false;
    this.error = err;

    this._onErrorCb?.(err);
  }

  private _convertToString(value: SupportedValues) {
    let dataObject: object;

    if (['string', 'boolean', 'number'].includes(typeof value)) {
      dataObject = {
        $$v: value,
        $$t: typeof value,
      };
    } else {
      dataObject = value as object;
    }

    return this._serialize(dataObject);
  }

  private _convertFromString(value: string): SupportedValues {
    const object = this._deserialize(value);
    if (object.$$t) {
      if (object.$$t === 'number') {
        return Number(object.$$v);
      } else if (object.$$t === 'boolean') {
        return Boolean(object.$$v);
      } else {
        return String(object.$$v);
      }
    } else {
      return object;
    }
  }

  private _serialize(result: object) {
    return JSON.stringify(result, (key, value) => {
      if (typeof value === 'object' && value instanceof Set) {
        return { $$t: 'set', $$v: [...value] };
      }

      if (typeof value === 'function') {
        return { $$t: 'func', $$v: value.toString() };
      }

      return value;
    });
  }

  private _deserialize(jsonString: string) {
    return JSON.parse(jsonString, (key, value) => {
      if (value && value.$$v) {
        if (value.$$t === 'set') {
          return new Set(value._v);
        }

        if (value.$$t === 'func') {
          // eslint-disable-next-line no-new-func
          return new Function(`return ${value.$$v}`);
        }
      }

      return value;
    });
  }
}

export default SafeRedisController;
