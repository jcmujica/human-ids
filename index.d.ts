declare module 'human-ids' {
  interface IdGeneratorSettings {
    lang: string;
    adjective?: boolean;
    color?: boolean;
    noun?: boolean;
    number?: {
      min?: number;
      max?: number;
      completeWithZeros?: boolean;
    };
  }

  function generateId(settings?: IdGeneratorSettings): string;

  export = generateId;
}