export interface IColorRequest {
  intent: {
    name: string,
    confirmationStatus: string,
    slots: {
      colorCount: {
        name: string,
        value: string,
        confirmationStatus: string,
        source: string,
      },
    },
  };
}
