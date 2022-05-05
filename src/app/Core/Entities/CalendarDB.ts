export class CalendarDB {

    public Id!: number;
    public Calendar!: number;

    public constructor(init?: Partial<CalendarDB>) {
        Object.assign(this, init);
    }
}