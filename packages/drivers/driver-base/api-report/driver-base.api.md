## API Report File for "@fluidframework/driver-base"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { ConnectionMode } from '@fluidframework/protocol-definitions';
import { EventEmitterWithErrorHandling } from '@fluidframework/telemetry-utils';
import { IAnyDriverError } from '@fluidframework/driver-definitions';
import { IClientConfiguration } from '@fluidframework/protocol-definitions';
import { IConnect } from '@fluidframework/protocol-definitions';
import { IConnected } from '@fluidframework/protocol-definitions';
import { IDisposable } from '@fluidframework/core-interfaces';
import { IDocumentDeltaConnection } from '@fluidframework/driver-definitions';
import { IDocumentDeltaConnectionEvents } from '@fluidframework/driver-definitions';
import { IDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISignalClient } from '@fluidframework/protocol-definitions';
import { ISignalMessage } from '@fluidframework/protocol-definitions';
import { ITelemetryLoggerExt } from '@fluidframework/telemetry-utils';
import { ITokenClaims } from '@fluidframework/protocol-definitions';
import type { Socket } from 'socket.io-client';

// @public
export class DocumentDeltaConnection extends EventEmitterWithErrorHandling<IDocumentDeltaConnectionEvents> implements IDocumentDeltaConnection, IDisposable {
    protected constructor(socket: Socket, documentId: string, logger: ITelemetryLoggerExt, enableLongPollingDowngrades?: boolean, connectionId?: string | undefined);
    // (undocumented)
    protected addTrackedListener(event: string, listener: (...args: any[]) => void): void;
    checkpointSequenceNumber: number | undefined;
    get claims(): ITokenClaims;
    get clientId(): string;
    // (undocumented)
    protected closeSocketCore(error: IAnyDriverError): void;
    // (undocumented)
    protected readonly connectionId?: string | undefined;
    protected createErrorObject(handler: string, error?: any, canRetry?: boolean): IAnyDriverError;
    // (undocumented)
    get details(): IConnected;
    // (undocumented)
    protected disconnect(err: IAnyDriverError): void;
    protected disconnectCore(): void;
    dispose(): void;
    // (undocumented)
    get disposed(): boolean;
    protected _disposed: boolean;
    // (undocumented)
    documentId: string;
    // (undocumented)
    protected earlyOpHandler: (documentId: string, msgs: ISequencedDocumentMessage[]) => void;
    // (undocumented)
    protected earlySignalHandler: (msg: ISignalMessage | ISignalMessage[]) => void;
    // (undocumented)
    protected emitMessages(type: string, messages: IDocumentMessage[][]): void;
    // (undocumented)
    static readonly eventsAlwaysForwarded: string[];
    // (undocumented)
    static readonly eventsToForward: string[];
    get existing(): boolean;
    // (undocumented)
    protected getConnectionDetailsProps(): {
        disposed: boolean;
        socketConnected: boolean;
        clientId: string | undefined;
        connectionId: string | undefined;
    };
    // (undocumented)
    protected get hasDetails(): boolean;
    get initialClients(): ISignalClient[];
    // (undocumented)
    protected initialize(connectMessage: IConnect, timeout: number): Promise<void>;
    get initialMessages(): ISequencedDocumentMessage[];
    get initialSignals(): ISignalMessage[];
    // @deprecated (undocumented)
    protected get logger(): ITelemetryLoggerExt;
    get maxMessageSize(): number;
    get mode(): ConnectionMode;
    // (undocumented)
    protected readonly queuedMessages: ISequencedDocumentMessage[];
    // (undocumented)
    protected readonly queuedSignals: ISignalMessage[];
    get serviceConfiguration(): IClientConfiguration;
    // (undocumented)
    protected readonly socket: Socket;
    submit(messages: IDocumentMessage[]): void;
    submitSignal(content: IDocumentMessage, targetClientId?: string): void;
    get version(): string;
}

// @public
export function getW3CData(url: string, initiatorType: string): {
    dnsLookupTime: number | undefined;
    w3cStartTime: number | undefined;
    redirectTime: number | undefined;
    tcpHandshakeTime: number | undefined;
    secureConnectionTime: number | undefined;
    responseNetworkTime: number | undefined;
    fetchStartToResponseEndTime: number | undefined;
    reqStartToResponseEndTime: number | undefined;
};

// @public
export function promiseRaceWithWinner<T>(promises: Promise<T>[]): Promise<{
    index: number;
    value: T;
}>;

// @public (undocumented)
export function validateMessages(reason: string, messages: ISequencedDocumentMessage[], from: number, logger: ITelemetryLoggerExt, strict?: boolean): void;

// (No @packageDocumentation comment for this package)

```
