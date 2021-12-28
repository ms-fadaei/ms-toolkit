import { expect } from 'chai';
import { fake } from 'sinon';
import { EventBus } from '../dist/index.mjs';

describe('Helpers', () => {
  it('emit one event', () => {
    const eventBus = new EventBus();

    // add event
    const callback = fake();
    eventBus.on('event', callback);

    // emit event
    eventBus.emit('event');

    expect(callback.calledOnce).to.be.equal(true);
  });

  it('emit no event', () => {
    const eventBus = new EventBus();

    // add event
    const callback = fake();
    eventBus.on('event', callback);

    expect(callback.calledOnce).to.be.equal(false);
  });

  it('emit multiple events', () => {
    const eventBus = new EventBus();

    // add event1
    const callback1 = fake();
    eventBus.on('event1', callback1);

    // add event1
    const callback2 = fake();
    eventBus.on('event2', callback2);
    // add event1

    const callback3 = fake();
    eventBus.on('event3', callback3);

    // emit event
    eventBus.emit('event1');
    eventBus.emit('event2');

    expect(callback1.calledOnce).to.be.equal(true);
    expect(callback2.calledOnce).to.be.equal(true);
    expect(callback3.calledOnce).to.be.equal(false);
  });

  it('emit one event with multiple handlers', () => {
    const eventBus = new EventBus();

    // add event1
    const callback1 = fake();
    eventBus.on('event', callback1);

    // add event1
    const callback2 = fake();
    eventBus.on('event', callback2);

    // emit event
    eventBus.emit('event');

    expect(callback1.calledOnce).to.be.equal(true);
    expect(callback2.calledOnce).to.be.equal(true);
  });

  it('emitted event before add called after adding', () => {
    const eventBus = new EventBus();

    // emit event
    eventBus.emit('event');

    // add event1
    const callback1 = fake();
    eventBus.on('event', callback1);

    // add event2
    const callback2 = fake();
    eventBus.on('event', callback1);

    expect(callback1.calledOnce).to.be.equal(true);
    expect(callback2.calledOnce).to.be.equal(false);
  });

  it('use once for one-time event', () => {
    const eventBus = new EventBus();

    // add event1
    const callback = fake();
    eventBus.once('event', callback);

    // emit event
    eventBus.emit('event');
    eventBus.emit('event');

    expect(callback.calledOnce).to.be.equal(true);
  });

  it('clear event-bus', () => {
    const eventBus = new EventBus();

    // add event1
    const callback1 = fake();
    eventBus.on('event1', callback1);

    // add event1
    const callback2 = fake();
    eventBus.on('event2', callback2);

    eventBus.clear();

    // emit event
    eventBus.emit('event1');
    eventBus.emit('event2');

    expect(callback1.calledOnce).to.be.equal(false);
    expect(callback2.calledOnce).to.be.equal(false);
  });

  it('remove specific event', () => {
    const eventBus = new EventBus();

    // add event1
    const callback1 = fake();
    eventBus.on('event1', callback1);

    // add event1
    const callback2 = fake();
    eventBus.on('event2', callback2);

    eventBus.removeEvent('event1');

    // emit event
    eventBus.emit('event1');
    eventBus.emit('event2');

    expect(callback1.calledOnce).to.be.equal(false);
    expect(callback2.calledOnce).to.be.equal(true);
  });

  it('clear preEmitQueue for specific event', () => {
    const eventBus = new EventBus();

    // emit event
    eventBus.emit('event1');
    eventBus.emit('event2');

    // remove first event
    eventBus.removeEvent('event1');

    // add event1
    const callback1 = fake();
    eventBus.on('event1', callback1);

    // add event1
    const callback2 = fake();
    eventBus.on('event2', callback2);

    expect(callback1.calledOnce).to.be.equal(false);
    expect(callback2.calledOnce).to.be.equal(true);
  });
});
