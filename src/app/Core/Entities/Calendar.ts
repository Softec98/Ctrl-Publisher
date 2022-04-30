export class Calendar {

    public Id!: number;
    public Calendar!: Date;

    public constructor(init?: Partial<Calendar>) {
        Object.assign(this, init);
    }
}