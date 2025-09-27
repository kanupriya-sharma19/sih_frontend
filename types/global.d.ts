// types/global.d.ts
export {};

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: new (
          config: {
            pageLanguage: string;
            includedLanguages: string;
            layout: number;
            autoDisplay?: boolean;
          },
          elementId: string
        ) => void;
        TranslateElement: {
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
        };
      };
    };
    googleTranslateElementInit: () => void;
  }
}