// Import the core angular services.
import { filter } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { ErrorHandler, Injectable } from '@angular/core';

type CallbackFunction<T = any> = (event: T) => void;

// ----------------------------------------------------------------------------------- //
type NewableType<T> = new(...args: any[]) => T;

// I am the base-class for all of the events that this application pushes onto the
// MessageQueue. The only guarantee that this class makes is a read-only Type.
export abstract class Event {

  readonly type: string;

}

// I am the sub-class / base-class for all of the payload-heavy events that this
// application pushes onto the MessageQueue. This class guarantees a payload with a
// given interface.
export abstract class EventWithPayload<T> extends Event {

  readonly payload: T;

  constructor(payload: T) {
    super();
    this.payload = payload;
  }
}

// I am a convenience class that keeps track of subscriptions within the group and can
// mass-unsubscribe from them as needed. Because of this tracking, the methods on this
// class return a reference to THIS class, instead of a Subscription, allowing for a
// more fluent API.
export class MessageBusGroup {

  private eventBusService: EventBusService;
  private subscriptions: Subscription[];

  constructor(messageBus: EventBusService) {
    this.eventBusService = messageBus;
    this.subscriptions = [];
  }

  emit(event: any): MessageBusGroup {
    this.eventBusService.emit(event);
    return (this);
  }

  // I subscribe to the message bus, but only invoke the callback when the event is
  // of the given newable type (ie, it's a Class definition, not an instance).
  on<T>(
    typeFilter: NewableType<T>,
    callback: CallbackFunction<T>,
    callbackContext: any = null
  ): MessageBusGroup {
    this.subscriptions.push(
      this.eventBusService.on(typeFilter, callback, callbackContext)
    );
    return (this);
  }

  //  subscribe to all events on the message bus.
  subscribe(callback: CallbackFunction, callbackContext: any = null): MessageBusGroup {
    this.subscriptions.push(
      this.eventBusService.subscribe(callback, callbackContext)
    );
    return (this);
  }

  unsubscribe(): MessageBusGroup {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.subscriptions = [];
    return (this);
  }
}

// ----------------------------------------------------------------------------------- //

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  private errorHandler: ErrorHandler;
  private eventStream: Subject<any>;

  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.eventStream = new Subject();
  }

  // push the given event onto the message bus.
  emit(event: any): void {
    this.eventStream.next(event);
  }

  //  create and return a new grouping of subscriptions on the message bus. This is
  // a convenience class that makes it easier to subscribe and unsubscribe to events
  // within a single, cohesive context (such as a component).
  group(): MessageBusGroup {
    return (new MessageBusGroup(this));
  }

  //  subscribe to the message bus, but only invoke the callback when the event is
  // of the given newable type (ie, it's a Class definition, not an instance).
  // NOTE: The NewableType<T> will allow for Type inference.
  on<T>(
    typeFilter: NewableType<T>,
    callback: CallbackFunction<T>,
    callbackContext: any = null
  ): Subscription {
    const subscription = this.eventStream
      .pipe(
        filter(
          (event: any): boolean => {
            return (event instanceof typeFilter);
          }
        )
      )
      .subscribe(
        (event: T): void => {
          try {
            callback.call(callbackContext, event);
          } catch (error) {
            this.errorHandler.handleError(error);
          }
        }
      )
      ;
    return (subscription);
  }

  // subscribe to all events on the message bus.
  subscribe(callback: CallbackFunction, callbackContext: any = null): Subscription {
    const subscription = this.eventStream.subscribe(
      (event: any): void => {
        try {
          callback.call(callbackContext, event);
        } catch (error) {
          this.errorHandler.handleError(error);
        }
      }
    );
    return (subscription);
  }
}
