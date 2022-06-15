## API Report File for "@fluid-experimental/tree"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { EventEmitterWithErrorHandling } from '@fluidframework/telemetry-utils';
import { IChannelAttributes } from '@fluidframework/datastore-definitions';
import { IChannelFactory } from '@fluidframework/datastore-definitions';
import { IChannelServices } from '@fluidframework/datastore-definitions';
import { IChannelStorageService } from '@fluidframework/datastore-definitions';
import { IDisposable } from '@fluidframework/common-definitions';
import { IErrorEvent } from '@fluidframework/common-definitions';
import { IFluidDataStoreRuntime } from '@fluidframework/datastore-definitions';
import { IFluidSerializer } from '@fluidframework/shared-object-base';
import { ISequencedDocumentMessage } from '@fluidframework/protocol-definitions';
import { ISharedObject } from '@fluidframework/shared-object-base';
import { ISharedObjectEvents } from '@fluidframework/shared-object-base';
import { ISummaryTreeWithStats } from '@fluidframework/runtime-definitions';
import { ITelemetryBaseEvent } from '@fluidframework/common-definitions';
import { ITelemetryLogger } from '@fluidframework/common-definitions';
import { Serializable } from '@fluidframework/datastore-definitions';
import { SharedObject } from '@fluidframework/shared-object-base';

// @public @sealed
export class BasicCheckout<TChange> extends Checkout<TChange> {
    constructor(tree: GenericSharedTree<TChange>);
    // (undocumented)
    protected get latestCommittedView(): Snapshot;
    // (undocumented)
    waitForPendingUpdates(): Promise<void>;
}

// @public
export interface Build {
    // (undocumented)
    readonly destination: DetachedSequenceId;
    // (undocumented)
    readonly source: TreeNodeSequence<BuildNode>;
    // (undocumented)
    readonly type: typeof ChangeType.Build;
}

// @public
export type BuildNode = TreeNode<BuildNode> | DetachedSequenceId;

// @public
export type Change = Insert | Detach | Build | SetValue | Constraint;

// @public (undocumented)
export const Change: {
    build: (source: TreeNodeSequence<BuildNode>, destination: DetachedSequenceId) => Build;
    insert: (source: DetachedSequenceId, destination: StablePlace) => Insert;
    detach: (source: StableRange, destination?: DetachedSequenceId | undefined) => Detach;
    setPayload: (nodeToModify: NodeId, payload: Payload) => SetValue;
    clearPayload: (nodeToModify: NodeId) => SetValue;
    constraint: (toConstrain: StableRange, effect: ConstraintEffect, identityHash?: UuidString | undefined, length?: number | undefined, contentHash?: UuidString | undefined, parentNode?: NodeId | undefined, label?: TraitLabel | undefined) => Constraint;
};

// @public
export type ChangeNode = TreeNode<ChangeNode>;

// @public
export enum ChangeType {
    // (undocumented)
    Build = 2,
    // (undocumented)
    Constraint = 4,
    // (undocumented)
    Detach = 1,
    // (undocumented)
    Insert = 0,
    // (undocumented)
    SetValue = 3
}

// @public
export abstract class Checkout<TChange> extends EventEmitterWithErrorHandling<ICheckoutEvents> implements IDisposable {
    protected constructor(tree: GenericSharedTree<TChange>, currentView: Snapshot, onEditCommitted: EditCommittedHandler<GenericSharedTree<TChange>>);
    abortEdit(): void;
    applyChanges(...changes: TChange[]): void;
    applyEdit(...changes: TChange[]): EditId;
    closeEdit(): EditId;
    // (undocumented)
    get currentView(): Snapshot;
    dispose(error?: Error): void;
    // (undocumented)
    disposed: boolean;
    protected emitChange(): void;
    // (undocumented)
    getChangesAndSnapshotBeforeInSession(id: EditId): {
        changes: readonly TChange[];
        before: Snapshot;
    };
    // (undocumented)
    getEditStatus(): EditStatus;
    protected handleNewEdit(id: EditId, result: ValidEditingResult<TChange>): void;
    // @internal (undocumented)
    hasOpenEdit(): boolean;
    protected hintKnownEditingResult(edit: Edit<TChange>, result: ValidEditingResult<TChange>): void;
    protected abstract get latestCommittedView(): Snapshot;
    openEdit(): void;
    rebaseCurrentEdit(): EditValidationResult.Valid | EditValidationResult.Invalid;
    readonly tree: GenericSharedTree<TChange>;
    // (undocumented)
    abstract waitForPendingUpdates(): Promise<void>;
}

// @public
export enum CheckoutEvent {
    ViewChange = "viewChange"
}

// @public (undocumented)
export function comparePayloads(a: Payload, b: Payload): boolean;

// @public
export interface Constraint {
    readonly contentHash?: UuidString;
    readonly effect: ConstraintEffect;
    readonly identityHash?: UuidString;
    readonly label?: TraitLabel;
    readonly length?: number;
    readonly parentNode?: NodeId;
    readonly toConstrain: StableRange;
    readonly type: typeof ChangeType.Constraint;
}

// @public
export enum ConstraintEffect {
    InvalidAndDiscard = 0,
    InvalidRetry = 1,
    ValidRetry = 2
}

// @public
export type Definition = UuidString & {
    readonly Definition: 'c0ef9488-2a78-482d-aeed-37fba996354c';
};

// @public
export const Delete: {
    create: (stableRange: StableRange) => Change;
};

// @public
export interface Delta<NodeId> {
    readonly added: readonly NodeId[];
    readonly changed: readonly NodeId[];
    readonly removed: readonly NodeId[];
}

// @public
export interface Detach {
    // (undocumented)
    readonly destination?: DetachedSequenceId;
    // (undocumented)
    readonly source: StableRange;
    // (undocumented)
    readonly type: typeof ChangeType.Detach;
}

// @public
export type DetachedSequenceId = number & {
    readonly DetachedSequenceId: 'f7d7903a-194e-45e7-8e82-c9ef4333577d';
};

// @public
export interface Edit<TChange> extends EditBase<TChange> {
    readonly id: EditId;
}

// @public
export interface EditBase<TChange> {
    readonly changes: readonly TChange[];
}

// Warning: (ae-internal-missing-underscore) The name "EditChunkOrHandle" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type EditChunkOrHandle<TChange> = EditHandle | readonly EditWithoutId<TChange>[];

// @public
export interface EditCommittedEventArguments<TSharedTree> {
    editId: EditId;
    local: boolean;
    tree: TSharedTree;
}

// @public
export type EditCommittedHandler<TSharedTree> = (args: EditCommittedEventArguments<TSharedTree>) => void;

// Warning: (ae-internal-missing-underscore) The name "EditHandle" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface EditHandle {
    // (undocumented)
    readonly get: () => Promise<ArrayBufferLike>;
}

// @public
export type EditId = UuidString & {
    readonly EditId: '56897beb-53e4-4e66-85da-4bf5cd5d0d49';
};

// @public
export type EditingResult<TChange> = {
    readonly status: EditStatus.Invalid | EditStatus.Malformed;
    readonly changes: readonly TChange[];
    readonly steps?: undefined;
    readonly before: Snapshot;
} | ValidEditingResult<TChange>;

// Warning: (ae-internal-missing-underscore) The name "EditLogSummary" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export interface EditLogSummary<TChange> {
    readonly editChunks: readonly {
        readonly startRevision: number;
        readonly chunk: EditChunkOrHandle<TChange>;
    }[];
    readonly editIds: readonly EditId[];
}

// @public
export enum EditStatus {
    Applied = 2,
    Invalid = 1,
    Malformed = 0
}

// @public
export enum EditValidationResult {
    Invalid = 1,
    Malformed = 0,
    Valid = 2
}

// @public
export interface EditWithoutId<TChange> extends EditBase<TChange> {
    readonly id?: never;
}

// @public
export abstract class GenericSharedTree<TChange> extends SharedObject<ISharedTreeEvents<TChange>> {
    constructor(runtime: IFluidDataStoreRuntime, id: string, transactionFactory: (snapshot: Snapshot) => GenericTransaction<TChange>, attributes: IChannelAttributes, expensiveValidation?: boolean, summarizeHistory?: boolean);
    // @internal
    applyEdit(...changes: TChange[]): EditId;
    // (undocumented)
    protected applyStashedOp(): void;
    // (undocumented)
    get currentView(): Snapshot;
    // (undocumented)
    get edits(): OrderedEditSet<TChange>;
    equals<TOtherChangeTypes>(sharedTree: GenericSharedTree<TOtherChangeTypes>): boolean;
    protected abstract generateSummary(editLog: OrderedEditSet<TChange>): SharedTreeSummaryBase;
    // (undocumented)
    getRuntime(): IFluidDataStoreRuntime;
    // (undocumented)
    protected loadCore(storage: IChannelStorageService): Promise<void>;
    // @internal
    loadSummary(summary: SharedTreeSummaryBase): void;
    // (undocumented)
    protected readonly logger: ITelemetryLogger;
    get logViewer(): LogViewer;
    // (undocumented)
    protected onDisconnect(): void;
    // (undocumented)
    protected processCore(message: ISequencedDocumentMessage, local: boolean): void;
    // @internal
    processLocalEdit(edit: Edit<TChange>): void;
    // (undocumented)
    protected registerCore(): void;
    // @internal
    saveSerializedSummary(options?: {
        serializer?: IFluidSerializer;
        summarizer?: SharedTreeSummarizer<TChange>;
    }): string;
    // @internal
    saveSummary(): SharedTreeSummaryBase;
    // (undocumented)
    summarizeCore(serializer: IFluidSerializer, fullTree: boolean): ISummaryTreeWithStats;
    // (undocumented)
    protected readonly summarizeHistory: boolean;
    // (undocumented)
    readonly transactionFactory: (snapshot: Snapshot) => GenericTransaction<TChange>;
    }

// @public
export abstract class GenericTransaction<TChange> {
    constructor(view: Snapshot);
    applyChange(change: TChange, path?: ReconciliationPath<TChange>): this;
    applyChanges(changes: Iterable<TChange>, path?: ReconciliationPath<TChange>): this;
    // (undocumented)
    protected readonly before: Snapshot;
    // (undocumented)
    protected readonly changes: TChange[];
    // (undocumented)
    close(): EditingResult<TChange>;
    // (undocumented)
    protected abstract dispatchChange(change: TChange): EditStatus;
    // (undocumented)
    protected isOpen: boolean;
    get status(): EditStatus;
    // (undocumented)
    protected _status: EditStatus;
    // (undocumented)
    protected readonly steps: ReconciliationChange<TChange>[];
    // (undocumented)
    protected tryResolveChange(change: TChange, path: ReconciliationPath<TChange>): TChange | undefined;
    protected abstract validateOnClose(): EditStatus;
    get view(): Snapshot;
    // (undocumented)
    protected _view: Snapshot;
}

// @public
export interface ICheckoutEvents extends IErrorEvent {
    // (undocumented)
    (event: 'viewChange', listener: (before: Snapshot, after: Snapshot) => void): any;
}

// @public
export const initialTree: ChangeNode;

// @public
export interface Insert {
    // (undocumented)
    readonly destination: StablePlace;
    // (undocumented)
    readonly source: DetachedSequenceId;
    // (undocumented)
    readonly type: typeof ChangeType.Insert;
}

// @public
export const Insert: {
    create: (nodes: TreeNodeSequence<BuildNode>, destination: StablePlace) => Change[];
};

// Warning: (ae-internal-missing-underscore) The name "isDetachedSequenceId" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export function isDetachedSequenceId(node: BuildNode): node is DetachedSequenceId;

// @public
export interface ISharedTreeEvents<TSharedTree> extends ISharedObjectEvents {
    // (undocumented)
    (event: 'committedEdit', listener: EditCommittedHandler<TSharedTree>): any;
}

// @public
export function isSharedTreeEvent(event: ITelemetryBaseEvent): boolean;

// @public
export interface LogViewer {
    getSnapshot(revision: Revision): Promise<Snapshot>;
    getSnapshotInSession(revision: Revision): Snapshot;
}

// @public
export const Move: {
    create: (source: StableRange, destination: StablePlace) => Change[];
};

// @public
export function newEdit<TEdit>(changes: readonly TEdit[]): Edit<TEdit>;

// @public
export interface NodeData {
    readonly definition: Definition;
    readonly identifier: NodeId;
    // (undocumented)
    readonly payload?: Payload;
}

// @public
export type NodeId = UuidString & {
    readonly NodeId: 'e53e7d6b-c8b9-431a-8805-4843fc639342';
};

// @public
export interface NodeInTrait {
    // (undocumented)
    readonly index: TraitNodeIndex;
    // (undocumented)
    readonly trait: TraitLocation;
}

// @public @sealed
export interface OrderedEditSet<TChange> {
    readonly editIds: readonly EditId[];
    // (undocumented)
    getEditAtIndex(index: number): Promise<Edit<TChange>>;
    // (undocumented)
    getEditInSessionAtIndex(index: number): Edit<TChange>;
    // @internal (undocumented)
    getEditLogSummary(useHandles?: boolean): EditLogSummary<TChange>;
    // (undocumented)
    getIdAtIndex(index: number): EditId;
    // (undocumented)
    getIndexOfId(editId: EditId): number;
    readonly length: number;
    // (undocumented)
    tryGetEdit(editId: EditId): Promise<Edit<TChange> | undefined>;
    // (undocumented)
    tryGetIndexOfId(editId: EditId): number | undefined;
}

// @public
export type Payload = Serializable;

// @public
export function placeFromStablePlace(snapshot: Snapshot, stablePlace: StablePlace): SnapshotPlace;

// @public
export type PlaceIndex = number & {
    readonly PlaceIndex: unique symbol;
};

// @public
export function rangeFromStableRange(snapshot: Snapshot, range: StableRange): SnapshotRange;

// @public
export interface ReconciliationChange<TChange> {
    readonly after: Snapshot;
    readonly resolvedChange: TChange;
}

// @public
export interface ReconciliationEdit<TChange> {
    readonly [index: number]: ReconciliationChange<TChange>;
    readonly after: Snapshot;
    readonly before: Snapshot;
    readonly length: number;
}

// @public
export interface ReconciliationPath<TChange> {
    readonly [index: number]: ReconciliationEdit<TChange>;
    readonly length: number;
}

// @public
export function revert(changes: readonly Change[], before: Snapshot): Change[];

// @public
export type Revision = number;

// @public
export function setTrait(trait: TraitLocation, nodes: TreeNodeSequence<BuildNode>): readonly Change[];

// @public
export interface SetValue {
    // (undocumented)
    readonly nodeToModify: NodeId;
    readonly payload: Payload | null;
    // (undocumented)
    readonly type: typeof ChangeType.SetValue;
}

// @public @sealed
export class SharedTree extends GenericSharedTree<Change> {
    constructor(runtime: IFluidDataStoreRuntime, id: string, expensiveValidation?: boolean, summarizeHistory?: boolean);
    static create(runtime: IFluidDataStoreRuntime, id?: string): SharedTree;
    get editor(): SharedTreeEditor;
    protected generateSummary(editLog: OrderedEditSet<Change>): SharedTreeSummaryBase;
    static getFactory(summarizeHistory?: boolean): SharedTreeFactory;
}

// @public
export const sharedTreeAssertionErrorType = "SharedTreeAssertion";

// @public
export enum SharedTreeDiagnosticEvent {
    AppliedEdit = "appliedEdit",
    CatchUpBlobUploaded = "uploadedCatchUpBlob",
    DroppedInvalidEdit = "droppedInvalidEdit",
    DroppedMalformedEdit = "droppedMalformedEdit"
}

// @public
export class SharedTreeEditor {
    constructor(tree: SharedTree);
    delete(target: NodeData): EditId;
    delete(target: NodeId): EditId;
    delete(target: StableRange): EditId;
    insert(node: BuildNode, destination: StablePlace): EditId;
    insert(nodes: BuildNode[], destination: StablePlace): EditId;
    move(source: NodeData, destination: StablePlace): EditId;
    move(source: NodeId, destination: StablePlace): EditId;
    move(source: StableRange, destination: StablePlace): EditId;
    revert(edit: Edit<Change>, view: Snapshot): EditId;
    }

// @public
export enum SharedTreeEvent {
    EditCommitted = "committedEdit"
}

// @public
export class SharedTreeFactory implements IChannelFactory {
    // (undocumented)
    static Attributes: IChannelAttributes;
    // (undocumented)
    get attributes(): IChannelAttributes;
    create(runtime: IFluidDataStoreRuntime, id: string, expensiveValidation?: boolean): SharedTree;
    protected includeHistoryInSummary(): boolean;
    // (undocumented)
    load(runtime: IFluidDataStoreRuntime, id: string, services: IChannelServices, _channelAttributes: Readonly<IChannelAttributes>): Promise<ISharedObject>;
    // (undocumented)
    static Type: string;
    // (undocumented)
    get type(): string;
}

// Warning: (ae-internal-missing-underscore) The name "SharedTreeSummarizer" should be prefixed with an underscore because the declaration is marked as @internal
//
// @internal
export type SharedTreeSummarizer<TChange> = (editLog: OrderedEditSet<TChange>, currentView: Snapshot) => SharedTreeSummaryBase;

// @public
export interface SharedTreeSummary<TChange> extends SharedTreeSummaryBase {
    // (undocumented)
    readonly currentTree: ChangeNode;
    // Warning: (ae-incompatible-release-tags) The symbol "editHistory" is marked as @public, but its signature references "EditLogSummary" which is marked as @internal
    readonly editHistory?: EditLogSummary<TChange>;
}

// @public
export interface SharedTreeSummaryBase {
    readonly version: string;
}

// @public
export enum Side {
    // (undocumented)
    After = 1,
    // (undocumented)
    Before = 0
}

// @public
export class Snapshot {
    // (undocumented)
    [Symbol.iterator](): IterableIterator<SnapshotNode>;
    addNodes(sequence: Iterable<SnapshotNode>): Snapshot;
    assertConsistent(): void;
    attachRange(nodesToAttach: readonly NodeId[], place: SnapshotPlace): Snapshot;
    deleteNodes(nodes: Iterable<NodeId>): Snapshot;
    delta(snapshot: Snapshot): Delta<NodeId>;
    detachRange(rangeToDetach: SnapshotRange): {
        snapshot: Snapshot;
        detached: readonly NodeId[];
    };
    equals(snapshot: Snapshot): boolean;
    // (undocumented)
    findIndexWithinTrait(place: SnapshotPlace): PlaceIndex;
    static fromTree(root: ChangeNode, expensiveValidation?: boolean): Snapshot;
    // (undocumented)
    getChangeNode(id: NodeId): ChangeNode;
    // (undocumented)
    getChangeNodes(nodeIds: readonly NodeId[]): ChangeNode[];
    getChangeNodeTree(): ChangeNode;
    // (undocumented)
    getIndexInTrait(node: NodeId): TraitNodeIndex;
    getParentSnapshotNode(id: NodeId): SnapshotNode | undefined;
    getSnapshotNode(id: NodeId): SnapshotNode;
    getTrait(traitLocation: TraitLocation): readonly NodeId[];
    getTraitLabel(id: NodeId): TraitLabel | undefined;
    // (undocumented)
    getTraitLocation(node: NodeId): TraitLocation;
    // (undocumented)
    hasNode(id: NodeId): boolean;
    // (undocumented)
    readonly root: NodeId;
    setNodeValue(nodeId: NodeId, value: Payload): Snapshot;
    get size(): number;
    }

// @public
export interface SnapshotNode extends NodeData {
    // (undocumented)
    readonly traits: ReadonlyMap<TraitLabel, readonly NodeId[]>;
}

// @public
export interface SnapshotPlace {
    // (undocumented)
    readonly sibling?: NodeId;
    // (undocumented)
    readonly side: Side;
    // (undocumented)
    readonly trait: TraitLocation;
}

// @public
export interface SnapshotRange {
    // (undocumented)
    readonly end: SnapshotPlace;
    // (undocumented)
    readonly start: SnapshotPlace;
}

// @public
export interface StablePlace {
    readonly referenceSibling?: NodeId;
    readonly referenceTrait?: TraitLocation;
    readonly side: Side;
}

// @public (undocumented)
export const StablePlace: {
    before: (node: NodeData | NodeId) => StablePlace;
    after: (node: NodeData | NodeId) => StablePlace;
    atStartOf: (trait: TraitLocation) => StablePlace;
    atEndOf: (trait: TraitLocation) => StablePlace;
};

// @public
export interface StableRange {
    // (undocumented)
    readonly end: StablePlace;
    // (undocumented)
    readonly start: StablePlace;
}

// @public (undocumented)
export const StableRange: {
    from: (start: StablePlace) => {
        to: (end: StablePlace) => StableRange;
    };
    only: (node: NodeData | NodeId) => StableRange;
    all: (trait: TraitLocation) => StableRange;
};

// @public
export type TraitLabel = UuidString & {
    readonly TraitLabel: '613826ed-49cc-4df3-b2b8-bfc6866af8e3';
};

// @public
export interface TraitLocation {
    // (undocumented)
    readonly label: TraitLabel;
    // (undocumented)
    readonly parent: NodeId;
}

// @public
export interface TraitMap<TChild> {
    // (undocumented)
    readonly [key: string]: TreeNodeSequence<TChild>;
}

// @public
export type TraitNodeIndex = number & {
    readonly TraitNodeIndex: unique symbol;
};

// @public
export class Transaction extends GenericTransaction<Change> {
    protected createSnapshotNodesForTree(sequence: Iterable<BuildNode>, onCreateNode: (id: NodeId, node: SnapshotNode) => boolean, onInvalidDetachedId: () => void): NodeId[] | undefined;
    // (undocumented)
    protected readonly detached: Map<DetachedSequenceId, readonly NodeId[]>;
    // (undocumented)
    protected dispatchChange(change: Change): EditStatus;
    // (undocumented)
    static factory(snapshot: Snapshot): Transaction;
    // (undocumented)
    protected validateOnClose(): EditStatus;
}

// @public
export interface TreeNode<TChild> extends NodeData {
    // (undocumented)
    readonly traits: TraitMap<TChild>;
}

// @public
export class TreeNodeHandle implements TreeNode<TreeNodeHandle> {
    constructor(snapshot: Snapshot, nodeId: NodeId);
    // (undocumented)
    get definition(): Definition;
    demandTree(): ChangeNode;
    // (undocumented)
    get identifier(): NodeId;
    get node(): ChangeNode;
    // (undocumented)
    get payload(): Payload | undefined;
    // (undocumented)
    toString(): string;
    // (undocumented)
    get traits(): TraitMap<TreeNodeHandle>;
}

// @public
export type TreeNodeSequence<TChild> = readonly TChild[];

// @public
export type UuidString = string & {
    readonly UuidString: '9d40d0ae-90d9-44b1-9482-9f55d59d5465';
};

// @public
export function validateStablePlace(snapshot: Snapshot, place: StablePlace): EditValidationResult;

// @public
export function validateStableRange(snapshot: Snapshot, range: StableRange): EditValidationResult;

// @public
export interface ValidEditingResult<TChange> {
    // (undocumented)
    readonly after: Snapshot;
    // (undocumented)
    readonly before: Snapshot;
    // (undocumented)
    readonly changes: readonly TChange[];
    // (undocumented)
    readonly status: EditStatus.Applied;
    // (undocumented)
    readonly steps: readonly {
        resolvedChange: TChange;
        after: Snapshot;
    }[];
}


```