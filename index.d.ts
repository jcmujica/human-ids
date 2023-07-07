declare module 'human-ids' {
  export interface IdGeneratorSettings {
    lang: string;
    adjective?: boolean;
    color?: boolean;
    noun?: boolean;
    number?: {
      min?: number;
      max?: number;
      completeWithZeros?: boolean;
      sets?: number;
    };
  }

  export default class IdGenerator {
    constructor(settings?: IdGeneratorSettings);
    generateId(): string;
  }
}
