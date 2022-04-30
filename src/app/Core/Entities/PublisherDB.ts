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
    }

    static getAssignments(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 1, 'value': 'Publisher non-baptized' },
                { 'key': 2, 'value': 'Publisher' },
                { 'key': 3, 'value': 'Ministerial Servant' },
                { 'key': 4, 'value': 'Elder' }
            ] :
            [
                { 'key': 1, 'value': 'Publicador não batizado' },
                { 'key': 2, 'value': 'Publicador' },
                { 'key': 3, 'value': 'Servo ministerial' },
                { 'key': 4, 'value': 'Ancião' }
            ];
    }

    static getGroups(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 1, 'value': 'Group 1' },
                { 'key': 2, 'value': 'Group 2' },
                { 'key': 3, 'value': 'Group 3' },
                { 'key': 1, 'value': 'Group 4' },
                { 'key': 2, 'value': 'Group 5' },
                { 'key': 3, 'value': 'Group 6' }
            ] :
            [
                { 'key': 1, 'value': 'Grupo 1' },
                { 'key': 2, 'value': 'Grupo 2' },
                { 'key': 3, 'value': 'Grupo 3' },
                { 'key': 1, 'value': 'Grupo 4' },
                { 'key': 2, 'value': 'Grupo 5' },
                { 'key': 3, 'value': 'Grupo 6' }
            ]
    }

    static getSituations(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 1, 'value': 'Active' },
                { 'key': 2, 'value': 'Inactive' },
                { 'key': 3, 'value': 'Irregular' },
                { 'key': 4, 'value': 'It\'s moved on' },
                { 'key': 5, 'value': 'Isn\'t publisher anymore' },
                { 'key': 6, 'value': 'Deceased' },
                { 'key': 7, 'value': 'Othes' }
            ] :
            [
                { 'key': 1, 'value': 'Ativo' },
                { 'key': 2, 'value': 'Inativo' },
                { 'key': 3, 'value': 'Irregular' },
                { 'key': 4, 'value': 'Mudou-se' },
                { 'key': 5, 'value': 'Não é mais publicador' },
                { 'key': 6, 'value': 'Falecido' },
                { 'key': 7, 'value': 'Outros' }
            ]
    }

    static getMaritalStatus(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 1, 'value': 'Single' },
                { 'key': 2, 'value': 'Married' },
                { 'key': 3, 'value': 'Split' },
                { 'key': 4, 'value': 'Divorced' },
                { 'key': 5, 'value': 'Widow' }
            ] :
            [
                { 'key': 1, 'value': 'Solteiro' },
                { 'key': 2, 'value': 'Casado' },
                { 'key': 3, 'value': 'Separado' },
                { 'key': 4, 'value': 'Divorciado' },
                { 'key': 5, 'value': 'Viúvo' }
            ]
    }

    static getGenders(lang: string) {

        return lang == 'en' ?
            [
                { 'key': 'F', 'value': 'Female' },
                { 'key': 'M', 'value': 'Male' }
            ] :
            [
                { 'key': 'F', 'value': 'Feminino' },
                { 'key': 'M', 'value': 'Masculino' }
            ]
    }

    static getStates(lang: string) {

        let retorno = [{ 'key': '', 'value': '', 'capitalValue': '' }];

        switch (lang) {
            case 'en':
                retorno = [
                    { 'key': 'AL', 'value': 'Alabama', 'capitalValue': 'Montgomery' },
                    { 'key': 'AK', 'value': 'Alaska', 'capitalValue': 'Juneau' },
                    { 'key': 'AZ', 'value': 'Arizona', 'capitalValue': 'Phoenix' },
                    { 'key': 'AR', 'value': 'Arkansas', 'capitalValue': '	Little Rock' },
                    { 'key': 'CA', 'value': 'California', 'capitalValue': 'Sacramento' },
                    { 'key': 'CO', 'value': 'Colorado', 'capitalValue': 'Denver' },
                    { 'key': 'CT', 'value': 'Connecticut', 'capitalValue': 'Hartford' },
                    { 'key': 'DE', 'value': 'Delaware', 'capitalValue': '' },
                    { 'key': 'DC', 'value': 'District of Columbia', 'capitalValue': 'Dover' },
                    { 'key': 'FL', 'value': 'Florida', 'capitalValue': '	Tallahassee' },
                    { 'key': 'GA', 'value': 'Georgia', 'capitalValue': 'Atlanta' },
                    { 'key': 'HI', 'value': 'Hawaii', 'capitalValue': 'Honolulu' },
                    { 'key': 'ID', 'value': 'Idaho', 'capitalValue': 'Boise' },
                    { 'key': 'IL', 'value': 'Illinois', 'capitalValue': 'Springfield' },
                    { 'key': 'IN', 'value': 'Indiana', 'capitalValue': 'Indianapolis' },
                    { 'key': 'IA', 'value': 'Iowa', 'capitalValue': 'Des Moines' },
                    { 'key': 'KS', 'value': 'Kansas', 'capitalValue': 'Topeka' },
                    { 'key': 'KY', 'value': 'Kentucky', 'capitalValue': 'Frankfort' },
                    { 'key': 'LA', 'value': 'Louisiana', 'capitalValue': 'Baton Rouge' },
                    { 'key': 'ME', 'value': 'Maine', 'capitalValue': 'Augusta' },
                    { 'key': 'MD', 'value': 'Maryland', 'capitalValue': 'Annapolis' },
                    { 'key': 'MA', 'value': 'Massachusetts', 'capitalValue': 'Boston' },
                    { 'key': 'MI', 'value': 'Michigan', 'capitalValue': 'Lansing' },
                    { 'key': 'MN', 'value': 'Minnesota', 'capitalValue': 'Saint Paul' },
                    { 'key': 'MS', 'value': 'Mississippi', 'capitalValue': 'Jackson' },
                    { 'key': 'MO', 'value': 'Missouri', 'capitalValue': 'Jefferson City' },
                    { 'key': 'MT', 'value': 'Montana', 'capitalValue': 'Helena' },
                    { 'key': 'NE', 'value': 'Nebraska', 'capitalValue': 'Lincoln' },
                    { 'key': 'NV', 'value': 'Nevada', 'capitalValue': 'Carson City' },
                    { 'key': 'NH', 'value': 'New Hampshire', 'capitalValue': 'Concord' },
                    { 'key': 'NJ', 'value': 'New Jersey', 'capitalValue': 'Trenton' },
                    { 'key': 'NM', 'value': 'New Mexico', 'capitalValue': 'Santa Fe' },
                    { 'key': 'NY', 'value': 'New York', 'capitalValue': 'Albany' },
                    { 'key': 'NC', 'value': 'North Carolina', 'capitalValue': 'Raleigh' },
                    { 'key': 'ND', 'value': 'North Dakota', 'capitalValue': 'Bismarck' },
                    { 'key': 'OH', 'value': 'Ohio', 'capitalValue': 'Columbus' },
                    { 'key': 'OK', 'value': 'Oklahoma', 'capitalValue': 'Oklahoma City' },
                    { 'key': 'OR', 'value': 'Oregon', 'capitalValue': 'Salem' },
                    { 'key': 'PA', 'value': 'Pennsylvania', 'capitalValue': 'Harrisburg' },
                    { 'key': 'RI', 'value': 'Rhode Island', 'capitalValue': 'Providence' },
                    { 'key': 'SC', 'value': 'South Carolina', 'capitalValue': 'Columbia' },
                    { 'key': 'SD', 'value': 'South Dakota', 'capitalValue': 'Pierre' },
                    { 'key': 'TN', 'value': 'Tennessee', 'capitalValue': 'Nashville' },
                    { 'key': 'TX', 'value': 'Texas', 'capitalValue': 'Austin' },
                    { 'key': 'UT', 'value': 'Utah', 'capitalValue': 'Salt Lake City' },
                    { 'key': 'VT', 'value': 'Vermont', 'capitalValue': 'Montpelier' },
                    { 'key': 'VA', 'value': 'Virginia', 'capitalValue': 'Richmond' },
                    { 'key': 'WA', 'value': 'Washington', 'capitalValue': 'Olympia' },
                    { 'key': 'WV', 'value': 'West Virginia', 'capitalValue': 'Charleston' },
                    { 'key': 'WI', 'value': 'Wisconsin', 'capitalValue': 'Madison' },
                    { 'key': 'WY', 'value': 'Wyoming', 'capitalValue': 'Cheyenne' }];
                break;
            case 'pt-BR':
                retorno = [
                    { 'key': "AC", 'value': 'Acre', 'capitalValue': 'Rio Branco' },
                    { 'key': "AL", 'value': 'Alagoas', 'capitalValue': 'Maceió' },
                    { 'key': "AP", 'value': 'Amapá', 'capitalValue': 'Macapá' },
                    { 'key': "AM", 'value': 'Amazonas', 'capitalValue': 'Manaus' },
                    { 'key': "BA", 'value': 'Bahia', 'capitalValue': 'Salvador' },
                    { 'key': "CE", 'value': 'Ceará', 'capitalValue': 'Fortaleza' },
                    { 'key': "DF", 'value': 'Distrito Federal', 'capitalValue': 'Distrito Federal' },
                    { 'key': "ES", 'value': 'Espírito Santo', 'capitalValue': 'Vitória' },
                    { 'key': "GO", 'value': 'Goiás', 'capitalValue': 'Goiânia' },
                    { 'key': "MA", 'value': 'Maranhão', 'capitalValue': 'São Luiz' },
                    { 'key': "MT", 'value': 'Mato Grosso', 'capitalValue': 'Cuiabá' },
                    { 'key': "MS", 'value': 'Mato Grosso do Sul', 'capitalValue': 'Campo Grande' },
                    { 'key': "MG", 'value': 'Minas Gerais', 'capitalValue': 'Belo Horizonte' },
                    { 'key': "PA", 'value': 'Pará', 'capitalValue': 'Belém' },
                    { 'key': "PB", 'value': 'Paraíba', 'capitalValue': 'João Pessoa' },
                    { 'key': "PR", 'value': 'Paraná', 'capitalValue': 'Curitiba' },
                    { 'key': "PE", 'value': 'Pernambuco', 'capitalValue': 'Recife' },
                    { 'key': "PI", 'value': 'Piauí', 'capitalValue': 'Teresina' },
                    { 'key': "RJ", 'value': 'Rio de Janeiro', 'capitalValue': 'Rio de Janeiro' },
                    { 'key': "RN", 'value': 'Rio Grande do Norte', 'capitalValue': 'Natal' },
                    { 'key': "RO", 'value': 'Rondônia', 'capitalValue': 'Porto Velho' },
                    { 'key': "RR", 'value': 'Roraima', 'capitalValue': 'Boa Vista' },
                    { 'key': "SC", 'value': 'Santa Catarina', 'capitalValue': 'Florianópolis' },
                    { 'key': "SP", 'value': 'São Paulo', 'capitalValue': 'São Paulo' },
                    { 'key': "SE", 'value': 'Sergipe', 'capitalValue': 'Aracaju' },
                    { 'key': "TO", 'value': 'Tocantins', 'capitalValue': 'Palmas' }
                ];
                break;
        }
        return retorno;
    }
}