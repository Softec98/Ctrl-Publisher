export class ReportDB {

    public Id!: number;
    public PublisherId!: number;
    public CalendarId!: number;
    public TypeId!: number;
    public Publications!: number;
    public Videos!: number;
    public Hours!: number;
    public Revisits!: number;
    public Studies!: number;

    public constructor(init?: Partial<ReportDB>) {
        Object.assign(this, init);
    }
}