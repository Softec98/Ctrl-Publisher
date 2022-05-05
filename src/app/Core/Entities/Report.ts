import { ReportDB } from './ReportDB';
import { Utils } from "../Utils/Utils";
import { IAuxiliar } from "../Interfaces/IAuxiliar";

export class Report extends ReportDB {

    public Lang!: string;
    public TypeName!: string;

    public types: IAuxiliar[] = [];

    log() {
        console.log(JSON.stringify(this));
    }

    public constructor(init?: Partial<Report>) {

        super(init);

        if (!this.Lang) {
            this.Lang = 'pt-BR'
        }

        this.getTypes().then(() => {
            this.TypeName = this.types.find(x => x.key == this.TypeId)?.value!;
        });
    }

    private async getTypes() {
        if (this.types.length == 0)
            await Utils.getAuxiliar(`type-${this.Lang}`).then((aux) => {
                this.types = aux;
            });
    }
}