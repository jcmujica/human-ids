declare module 'human-ids' {
  interface IdGeneratorSettings {
    lang: string;
    adjective?: boolean;
    color?: boolean;
    noun?: boolean;
    randomOrder?: boolean;
    separator?: string;
    asObject?: boolean;
    semantics?: {
      [key: string]: string['noun' | 'adjective' | 'color' | 'number'];
    } | null;
    number?: {
      min?: number;
      max?: number;
      completeWithZeros?: boolean;
    };
    dictionary?: {
      adjectives: {
        [key: string]: string[];
      };
      colors: {
        [key: string]: string[];
      };
      nouns: {
        [key: string]: string[];
      }
    };
  }

  function generateId(settings?: IdGeneratorSettings): string;

  export = generateId;
}