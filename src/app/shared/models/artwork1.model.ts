export class Artwork {
    ObjectID: string;
    ImageURL: string;
    DominantColour: string;
    DominantPrimaryColour: Array<string>;

    constructor(i_ObjectID?: string, i_ImageURL?: string, i_DominantColour?: string, i_DominantPrimary?: Array<string>) {
        this.ObjectID = i_ObjectID;
        this.ImageURL = i_ImageURL;
        this.DominantColour = i_DominantColour;
        this.DominantPrimaryColour = i_DominantPrimary;
    }
}