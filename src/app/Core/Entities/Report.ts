import { ReportDB } from './ReportDB';

export class Report extends ReportDB {

    public Lang!: string;
    public TypeName!: string;

    log() {
        console.log(JSON.stringify(this));
    }

    public constructor(init?: Partial<Report>) {

        super(init);

        if (!this.Lang) {
            this.Lang = 'pt-BR'
        }

        this.TypeName = ReportDB.getTypes(this.Lang)?.find(x => x.key == this.TypeId)?.value!;
    }
}