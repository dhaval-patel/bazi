class Base {
    constructor (private _id: string) {

    }

    get id(): string {
        return this._id;
    }
}

export { Base }