import { Utils } from "../Utils/Utils";

export class PublisherDB {

    public Id!: number;
    public Name!: string;
    public BaptismDate!: Date;
    public BirthDate!: Date;
    public IsAnointed!: boolean;
    public AssignmentId!: number;
    public IsRegularPioneer!: boolean;
    public GroupId!: number;
    public SituationId!: number;
    public Gender!: string;
    public ZipCode!: string;
    public Address!: string;
    public Complement!: string;
    public Number!: number;
    public Suburb!: string;
    public City!: string;
    public State!: string;
    public AreaCode!: string;
    public PhoneNumber!: string;
    public CellPhone!: string;
    public Email!: string;
    public Remark!: string;
    public SequenceNumber!: number;
    public GeneralId!: string;
    public NationalId!: string;
    public Ocupation!: string;
    public MaritalStatusId!: number;
    public IsLegalRepresentative!: boolean;
    public Nationality!: string;
    public Witness1Name!: string;
    public Witness1GeneralId!: string;
    public Witness2Name!: string;
    public Witness2GeneralId!: string;
    public LegalRepresentative1Id!: number;
    public LegalRepresentative2Id!: number;
    public FillDate!: Date;

    public constructor(init?: Partial<PublisherDB>) {
        Object.assign(this, init);

        // Converter os campos de data para tipo: Date
        this.BirthDate = new Date(init?.BirthDate!);
        this.BaptismDate = new Date(init?.BaptismDate!);

        // Remover a formatação dos campos, deixando apenas números
        this.NationalId = Utils.OnlyNumbers(init?.NationalId!);
        this.GeneralId = Utils.OnlyNumbers(init?.GeneralId!);
        this.ZipCode = Utils.OnlyNumbers(init?.ZipCode!);
        this.PhoneNumber = Utils.OnlyNumbers(init?.PhoneNumber!);
        this.CellPhone = Utils.OnlyNumbers(init?.CellPhone!);
        this.Witness1GeneralId = Utils.OnlyNumbers(init?.Witness1GeneralId!);
        this.Witness2GeneralId = Utils.OnlyNumbers(init?.Witness2GeneralId!);
    }
}