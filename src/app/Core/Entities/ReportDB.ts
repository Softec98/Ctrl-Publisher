export class ReportDB {

    public Id!: number;
    public PublisherId!: number;
    public Calendar!: number;
    public TypeId!: number;
    public Publications!: number;
    public Videos!: number;
    public Hours!: number;
    public Revisits!: number;
    public Studies!: number;

    public constructor(init?: Partial<ReportDB>) {
        Object.assign(this, init);
    }

    static getTypes(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 1, 'value': 'Publisher' },
                { 'key': 2, 'value': 'Auxiliar Pioneer' },
                { 'key': 3, 'value': 'Regular Pioneer' },
            ] :
            [
                { 'key': 1, 'value': 'Publicador' },
                { 'key': 2, 'value': 'Pioneiro Auxiliar' },
                { 'key': 3, 'value': 'Pioneiro Regular' },
            ];
    }
}