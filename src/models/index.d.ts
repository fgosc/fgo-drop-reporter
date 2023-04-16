import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerDropStackNum = {
  readonly num: number;
  readonly stack?: number | null;
}

type LazyDropStackNum = {
  readonly num: number;
  readonly stack?: number | null;
}

export declare type DropStackNum = LazyLoading extends LazyLoadingDisabled ? EagerDropStackNum : LazyDropStackNum

export declare const DropStackNum: (new (init: ModelInit<DropStackNum>) => DropStackNum)

type EagerDropObject = {
  readonly objectName: string;
  readonly drop: DropStackNum[];
  readonly bonus?: number | null;
  readonly drupUpRate?: number | null;
}

type LazyDropObject = {
  readonly objectName: string;
  readonly drop: DropStackNum[];
  readonly bonus?: number | null;
  readonly drupUpRate?: number | null;
}

export declare type DropObject = LazyLoading extends LazyLoadingDisabled ? EagerDropObject : LazyDropObject

export declare const DropObject: (new (init: ModelInit<DropObject>) => DropObject)

type EagerReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly warName?: string | null;
  readonly questName: string;
  readonly timestamp: number;
  readonly runs: number;
  readonly url?: string | null;
  readonly memo?: string | null;
  readonly dropObjects: DropObject[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyReport = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Report, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly type: string;
  readonly warName?: string | null;
  readonly questName: string;
  readonly timestamp: number;
  readonly runs: number;
  readonly url?: string | null;
  readonly memo?: string | null;
  readonly dropObjects: DropObject[];
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Report = LazyLoading extends LazyLoadingDisabled ? EagerReport : LazyReport

export declare const Report: (new (init: ModelInit<Report>) => Report) & {
  copyOf(source: Report, mutator: (draft: MutableModel<Report>) => MutableModel<Report> | void): Report;
}