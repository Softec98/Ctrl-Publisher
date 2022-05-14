import { PublisherDB } from "./PublisherDB";
import { Utils } from "../Utils/Utils";
import { IPublisher } from "../Interfaces/IPublisher";
import { IAuxiliar } from "../Interfaces/IAuxiliar";
import { ILegalRepresentative } from "../Interfaces/ILegalRepresentative";

export class Publisher extends PublisherDB implements IPublisher {

  public Lang!: string;
  public BirthAge!: number;
  public BaptismAge!: number;
  public Assignment!: string;
  public MaritalStatus!: string;
  public LegalRepresentative: ILegalRepresentative[] = [];
  public RemarkInLines: string[] = [];
  public assignments: IAuxiliar[] = [];
  public action!: string;

  log() {
    console.log(JSON.stringify(this));
  }

  public constructor(init?: Partial<Publisher>) {

    super(init);

    if (!this.Lang) {
      this.Lang = 'pt-BR'
    }

    // Calcular os anos dos campos de data
    this.BirthAge = Utils.calcAge(this.BirthDate);
    this.BaptismAge = Utils.calcAge(this.BaptismDate);

    // Buscar a descrição do campo de designação para exibir na tela
    this.getAssignments().then(() => {
      this.Assignment = this.assignments.find(x => x.key == this.AssignmentId)?.value!;
    });
  }

  private async getAssignments() {
    if (this.assignments.length == 0)
      await Utils.getAuxiliar(`assignment-${this.Lang}`).then((aux) => {
        this.assignments = aux;
      });
  }
}