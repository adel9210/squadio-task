export interface IBuilding {
    name: string
}

export interface Building {
    id: string;
    buildingName: string;
    countryName: string;
    countryCode: string;
    position: number[];
}

export interface User {
    id: string;
    name: string;
    buildings: Building[];
}

export type TFormMode = 'UPDATE' | 'ADD' | null;
