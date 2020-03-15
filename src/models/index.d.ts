import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class elements {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly price?: number;
  readonly rating?: number;
  constructor(init: ModelInit<elements>);
  static copyOf(source: elements, mutator: (draft: MutableModel<elements>) => MutableModel<elements> | void): elements;
}

export declare class userdata {
  readonly id: string;
  readonly githubAPIKey?: string;
  constructor(init: ModelInit<userdata>);
  static copyOf(source: userdata, mutator: (draft: MutableModel<userdata>) => MutableModel<userdata> | void): userdata;
}

export declare class project {
  readonly id: string;
  readonly name: string;
  readonly githubRepo?: string;
  readonly fileLocation?: string;
  constructor(init: ModelInit<project>);
  static copyOf(source: project, mutator: (draft: MutableModel<project>) => MutableModel<project> | void): project;
}