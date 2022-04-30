import { PublisherDB } from "./PublisherDB";
import { IPublisher } from "../Interfaces/IPublisher";

export class Publisher extends PublisherDB implements IPublisher {

    public Lang!: string;
    public BirthAge!: number;
    public BaptismAge!: number;
    public Assignment!: string;

    log() {
        console.log(JSON.stringify(this));
    }

    public constructor(init?: Partial<Publisher>) {

        super(init);

        if (!this.Lang) {
            this.Lang = 'pt-BR'
        }

        // Converter os campos de data para tipo: Date
        this.BirthDate = new Date(init?.BirthDate!);
        this.BaptismDate = new Date(init?.BaptismDate!);

        // Remover a formação dos campos, deixando apenas números
        this.NationalId = this.OnlyNumbers(init?.NationalId!);
        this.GeneralId = this.OnlyNumbers(init?.GeneralId!);
        this.ZipCode = this.OnlyNumbers(init?.ZipCode!);
        this.PhoneNumber = this.OnlyNumbers(init?.PhoneNumber!);
        this.CellPhone = this.OnlyNumbers(init?.CellPhone!);
        this.Witness1GeneralId = this.OnlyNumbers(init?.Witness1GeneralId!);
        this.Witness2GeneralId = this.OnlyNumbers(init?.Witness2GeneralId!);

        // Calcular os anos dos campos de data
        this.BirthAge = this.CalcAge(this.BirthDate);
        this.BaptismAge = this.CalcAge(this.BaptismDate);
        
        // Buscar a descrição do campo de designação para exibir na tela
        this.Assignment = PublisherDB.getAssignments(this.Lang)?.find(x => x.key == this.AssignmentId)?.value!;
    }

    private CalcAge(date: Date): number {
        if (date) {
            let timeDiff = Math.abs(Date.now() - new Date(date).getTime());
            return Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        }
        return 0;
    }

    private OnlyNumbers(campo: string) {
        return campo?.match(/\d/g)?.join('')!;
    }
}