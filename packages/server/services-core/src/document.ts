/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { IProposal, IProtocolState } from "@prague/container-definitions";
import { ICommit, ICommitDetails } from "@prague/gitresources";
import { IGitCache } from "@prague/services-client";
import { IRangeTrackerSnapshot } from "@prague/utils";

export interface IDocumentDetails {
    existing: boolean;
    value: IDocument;
}

export interface IDocumentStorage {
    getDocument(tenantId: string, documentId: string): Promise<any>;

    getOrCreateDocument(tenantId: string, documentId: string): Promise<IDocumentDetails>;

    getLatestVersion(tenantId: string, documentId: string): Promise<ICommit>;

    getVersions(tenantId: string, documentId: string, count: number): Promise<ICommitDetails[]>;

    getVersion(tenantId: string, documentId: string, sha: string): Promise<ICommit>;

    getFullTree(tenantId: string, documentId: string): Promise<{ cache: IGitCache, code: string }>;

    getForks(tenantId: string, documentId: string): Promise<string[]>;

    createFork(tenantId: string, id: string): Promise<string>;
}

export interface IFork {
    // The id of the fork
    documentId: string;

    // Tenant for the fork
    tenantId: string;

    // The sequence number where the fork originated
    sequenceNumber: number;

    // The last forwarded sequence number
    lastForwardedSequenceNumber: number;
}

export interface ITrackedProposal {
    sequenceNumber: number;

    proposal: IProposal;

    rejections: number;
}

export interface IScribe {
    // Kafka checkpoint that maps to the below stored data
    logOffset: number;

    // min sequence number at logOffset
    minimumSequenceNumber: number;

    // sequence number at logOffset
    sequenceNumber: number;

    // Stored protocol state within the window. This is either the state at the MSN or the state at the
    // sequence number of the head summary.
    protocolState: IProtocolState;
}

export interface IDocument {
    createTime: number;

    documentId: string;

    tenantId: string;

    forks: IFork[];

    /**
     * Parent references the point from which the document was branched
     */
    parent: {
        documentId: string,

        sequenceNumber: number,

        tenantId: string;

        minimumSequenceNumber: number;
    };

    // TODO package up the below under some kind of deli object
    // Deli specific information - we might want to consolidate this into a field to separate it
    clients: [{
        // Whether deli is allowed to evict the client from the MSN queue (i.e. due to timeouts, etc...)
        canEvict: boolean,

        clientId: string,

        clientSequenceNumber: number,

        referenceSequenceNumber: number,

        lastUpdate: number,

        nack: boolean,
    }];

    branchMap: IRangeTrackerSnapshot;

    sequenceNumber: number;

    logOffset: number;

    // Scribe tracked summary context
    scribe: IScribe;
}
