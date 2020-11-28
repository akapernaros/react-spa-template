import {TechnicalError} from "../core/errors";
import { v4 as uuidv4 } from 'uuid'
import React from "react";

const messageTopic = (severity) => {
    let topic = "MESSAGE-INTERNAL";
    if (severity) {
        topic = `${topic}/${severity}`;
    }
    return topic;
}

/**
 * EventListener defines a callback function that will be executed, when the topic listener is chosen to
 * be fired. The EventListener itself defines the logic to be fired. The default implementation (method 'match')
 * supports simple topics: firing event "test" will fire all listeners having the topic "test".
 * It is also possible to have a path of topics using dots as delimiters.
 * E.g. a listener with the topic "one.two.three" will be fired when event is "one", "one.two" or "one.two.three".
 * You can force a exact match on path topics be using the prefix "!" on the event: "!one.two" will only fire listeners
 * with the topic "one.two" not "one.two.three[...]".
 *
 */
export class EventListener {
    constructor(topic, callback) {
        if (!topic) {
            throw new TechnicalError("UNDEF", "Topic is mandatory.")
        }
        this.id = uuidv4();
        this.topic = topic;
        this.callback = callback;
        this.path = this.topic.split(".");
    }

    match(source) {
        if (source.startsWith("!")) {
            return this.topic === source.substr(1, source.length);
        }
        let sourcePath = source.split(".");
        return this.pathSearch(sourcePath);
    }

    pathSearch(sourcePath) {
        let i = 0;
        let result = true;
        while (i < sourcePath.length && i < this.path.length && result) {
            result = sourcePath[i] === this.path[i];
            i++;
        }
        return result;
    }
}

/**
 * A message handler behaves exactly as an EventListener, but it has a "hardcoded" topic "MESSAGE-INTERNAL". It also
 * adds an optional filter element to the topic: the severity.
 * If you specify a severity the handler is only fired if the sendMessage the handler is only fired when the payload
 * message contains exactly the severity of the handler.
 */
export class MessageHandler extends EventListener {
    constructor(callback, ...severities) {
        super(messageTopic(), callback);
        this.severity = [];
        if (severities) {
            this.severity = [
                ...severities
            ];
        }
    }
    match(source) {
        if (this.severity.length === 0) {
            return source.startsWith(messageTopic());
        }
        let result = false;
        this.severity.forEach((s) => {
           let target = messageTopic(s);
           if (source === target) {
               result = true;
           }
        });
        return result;
    }
}

export const EventBus = {

    listeners: [],
    messageHandlers: [],

    unregisterMessageHandler(messageHandler) {
        if (messageHandler === undefined) {
            throw new TechnicalError("UNDEF", "No MessageHandler defined");
        }
        let index = this.messageHandlers.findIndex((ml) => { return ml.id === messageHandler.id } );
        if (index > -1) {
            this.messageHandlers.slice(index, 1);
            console.log(`DeRegistered MessageHandler with id ${messageHandler.id} (on ${index})`);
        }
    },

    registerMessageHandler(messageHandler) {
        if (messageHandler === undefined) {
            throw new TechnicalError("UNDEF", "No MessageHandler defined");
        }
        this.messageHandlers.push(messageHandler);
        console.log(`Registered message handler for ${messageHandler.topic} (count: ${this.messageHandlers.length})`);
    },

    unsubscribe(eventListener) {
        if (eventListener === undefined) {
            throw new TechnicalError("UNDEF", "No EventListener defined");
        }
        let index = this.listeners.findIndex((el) => { return el.id === eventListener.id } );
        if (index > -1) {
            this.listeners.slice(index, 1);
            console.log(`DeRegistered listener with id ${eventListener.id} (on ${index})`);
        }
    },

    subscribe(eventListener) {
        if (eventListener === undefined) {
            throw new TechnicalError("UNDEF", "No EventListener defined");
        }
        if (eventListener instanceof MessageHandler) {
            throw new TechnicalError("UNDEF", "MessageHandlers not allowed.");
        }
        this.listeners.push(eventListener);

        console.log(`Registered listener with topic ${eventListener.topic} (id: ${eventListener.id})`);
    },

    async sendMessage(message) {
        if (message === undefined) {
            throw new TechnicalError("UNDEF", "Message is undefined.");
        }
        let event = messageTopic(message.severity);
        console.log(`Message fired for event ${event}`);
        this.messageHandlers.forEach((messageHandler) => {
             if (messageHandler.match(event)) {
                messageHandler.callback(message);
            }
        });
    },

    async fire(event, ...param) {
        if (event === undefined) {
            throw new TechnicalError("UNDEF", "Event is undefined.");
        }

        this.listeners.forEach((eventListener) => {
            if (eventListener.match(event)) {
                eventListener.callback(...param);
            }
        });
    },

    useEventBus() {
        return EventBus;
    },

    withEventBus(WrappedComponent) {

        return class extends React.Component {
            constructor(props) {
                super(props);
                this.service = EventBus;
            }

            render() {
                return <WrappedComponent eventBus={this.service} {...this.props} />
            }
        }
    }
}