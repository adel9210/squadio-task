export interface IBuilding {
    name: string
}

export interface Building {
    id: string;
    buildingName: string;
    position: number[];
}

export interface User {
    id: string;
    name: string;
    buildings: Building[];
}
