export type EventBusEvent = (...args: unknown[]) => void;

export class EventBus {
  #events: Map<string, EventBusEvent[]>;
  #preEmitQueue: Map<string, unknown[][]>;

  constructor() {
    this.#events = new Map();
    this.#preEmitQueue = new Map();
  }

  on(event: string, callback: EventBusEvent): void {
    let isNew = false;

    if (!this.#events.has(event)) {
      isNew = true;
      this.#events.set(event, []);
    }

    const events = this.#events.get(event) as EventBusEvent[];
    events.push(callback);

    if (isNew && this.#preEmitQueue.has(event)) {
      const preEmitQueue = this.#preEmitQueue.get(event) as unknown[][];
      preEmitQueue.forEach((args: unknown[]) => {
        // eslint-disable-next-line node/no-callback-literal
        callback(...args);
      });

      this.#preEmitQueue.delete(event);
    }
  }

  off(event: string, callback: EventBusEvent): void {
    if (!this.#events.has(event)) {
      return;
    }

    const events = this.#events.get(event) as EventBusEvent[];
    const index = events.indexOf(callback);

    if (index !== -1) {
      events.splice(index, 1);
    }
  }

  emit(event: string, ...args: unknown[]): void {
    if (this.#events.has(event)) {
      const events = this.#events.get(event) as EventBusEvent[];
      events.forEach((callback: EventBusEvent) => {
        // eslint-disable-next-line node/no-callback-literal
        callback(...args);
      });
    } else {
      if (!this.#preEmitQueue.has(event)) {
        this.#preEmitQueue.set(event, []);
      }

      const preEmitQueue = this.#preEmitQueue.get(event) as unknown[][];
      preEmitQueue.push(args);
    }
  }

  once(event: string, callback: EventBusEvent): void {
    const onceCallback = (...args: unknown[]) => {
      // eslint-disable-next-line node/no-callback-literal
      callback(...args);
      this.off(event, onceCallback);
    };

    this.on(event, onceCallback);
  }

  clear(): void {
    this.#events.clear();
    this.#preEmitQueue.clear();
  }

  removeEvent(event: string): void {
    this.#events.delete(event);
    this.#preEmitQueue.delete(event);
  }
}
