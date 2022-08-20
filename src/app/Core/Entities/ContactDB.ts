export class ContactDB {

    public Id!: number;
    public PublisherId!: number;
    public Name!: string;
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

    public constructor(init?: Partial<ContactDB>) {
        Object.assign(this, init);
    }
}