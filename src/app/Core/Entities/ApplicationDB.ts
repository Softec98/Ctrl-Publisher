import Dexie from 'dexie';
import { PublisherDB } from "./PublisherDB";
import { ReportDB } from './ReportDB';
import { CalendarDB } from './CalendarDB';

export class ApplicationDB extends Dexie {

    publisher!: Dexie.Table<PublisherDB, number>;
    report!: Dexie.Table<ReportDB, number>;
    calendar!: Dexie.Table<CalendarDB, number>;

    constructor() {
        super("PublisherControlDB");

        this.version(1).stores({
            publisher: "++Id, Name, NationalId, Gender, AssignmentId, GroupId, SituationId", // baptismDate, birthDate, isAnointed, assignmentId, isRegularPioneer, groupId, situationId, gender, zipCode, address, complement, number, suburb, city, state, areaCode, phoneNumber, cellPhone, email, remark, sequenceNumber, generalId, nationalId, ocupation, maritalStatusId, isLegalRepresentative, nationality, witness1Name, witness1GeneralId, witness2Name, witness2GeneralId, legalRepresentative1Id, legalRepresentative2Id, fillDate
            report: "++Id, PublisherId, Calendar, TypeId", // Publications, Videos, Hours, Revisits, Studies
            calendar: "++Id, Calendar"
        });

        this.publisher.mapToClass(PublisherDB);
        this.report.mapToClass(ReportDB);
        this.calendar.mapToClass(CalendarDB);

        this.on('populate', () => this.populate());
    }

    async populate() {

        let lang: string = 'pt-BR';

        await db.publisher.bulkAdd([
            new PublisherDB({
                Id: 1,
                GeneralId: '225389435',
                NationalId: '14250279898',
                Name: 'Ronaldo Pereira de Souza',
                BaptismDate: new Date('1988-03-27'),
                BirthDate: new Date('1975-05-22'),
                IsAnointed: false,
                AssignmentId: 2,
                IsRegularPioneer: false,
                GroupId: 2,
                SituationId: 1,
                Gender: 'F',
                ZipCode: '09861400',
                Address: 'Av. Edilu, 203',
                Number: 203,
                Complement: 'casa',
                Suburb: 'Jd. Santo Ignácio',
                City: 'São Bernardo do Campo',
                State: 'SP',
                AreaCode: '11',
                PhoneNumber: '',
                CellPhone: '991989875',
                Email: 'softec98@hotmail.com',
                Remark: '',
                SequenceNumber: 0,
                Ocupation: 'Autônomo',
                MaritalStatusId: 2,
                IsLegalRepresentative: true,
                Nationality: 'Brasileiro',
                Witness1Name: 'Fulano de Tal',
                Witness1GeneralId: '122345678',
                Witness2Name: 'Siclano de Tal',
                Witness2GeneralId: '901234567',
                LegalRepresentative1Id: 0,
                LegalRepresentative2Id: 1,
                FillDate: new Date()
            }),
            new PublisherDB({
                Id: 2,
                NationalId: '26666225848',
                GeneralId: '239302916',
                Name: 'Rubiana Silvia Ribeiro de Souza',
                BaptismDate: new Date('1989-03-18'),
                BirthDate: new Date('1976-04-04'),
                IsAnointed: false,
                AssignmentId: 2,
                IsRegularPioneer: false,
                GroupId: 2,
                SituationId: 1,
                Gender: 'F',
                ZipCode: '09861400',
                Address: 'Av. Edilu, 203',
                Number: 203,
                Complement: 'casa',
                Suburb: 'Jd. Santo Ignácio',
                City: 'São Bernardo do Campo',
                State: 'SP',
                AreaCode: '11',
                PhoneNumber: '',
                CellPhone: '991974407',
                Email: 'rubiana@stw.com.br',
                Remark: '',
                SequenceNumber: 0,
                Ocupation: 'Dona de casa',
                MaritalStatusId: 2,
                IsLegalRepresentative: true,
                Nationality: 'Brasileira',
                Witness1Name: 'Fulana de Tal',
                Witness1GeneralId: '982345678',
                Witness2Name: 'Siclana de Tal',
                Witness2GeneralId: '121234567',
                LegalRepresentative1Id: 1,
                LegalRepresentative2Id: 0,
                FillDate: new Date()
            })
            ,
            new PublisherDB({
                Id: 3,
                NationalId: '54558356021',
                GeneralId: '',
                Name: 'Deildes Cunha Chagas',
                BaptismDate: new Date('1978-03-18'),
                BirthDate: new Date('1958-11-04'),
                IsAnointed: false,
                AssignmentId: 2,
                IsRegularPioneer: false,
                GroupId: 2,
                SituationId: 1,
                Gender: 'F',
                ZipCode: '09990190',
                Address: 'R. Armelin A. F. Coutinho',
                Number: 357,
                Complement: 'casa 4',
                Suburb: 'Pq Real',
                City: 'Diadema',
                State: 'SP',
                AreaCode: '11',
                PhoneNumber: '40553100',
                CellPhone: '',
                Email: 'deildes@hotmail.com',
                Remark: '',
                SequenceNumber: 0,
                Ocupation: 'Aposentada',
                MaritalStatusId: 1,
                IsLegalRepresentative: true,
                Nationality: 'Brasileira',
                Witness1Name: 'Fulana de Tal',
                Witness1GeneralId: '772345678',
                Witness2Name: 'Siclana de Tal',
                Witness2GeneralId: '661234567',
                LegalRepresentative1Id: 1,
                LegalRepresentative2Id: 0
            }),
            new PublisherDB({
                Id: 4,
                NationalId: "70785201068",
                GeneralId: "777777777",
                Name: "Rogerio Pereira de Souza",
                Gender: "M",
                BaptismDate: new Date("1993-01-30"),
                BirthDate: new Date("1978-10-30"),
                ZipCode: "09930670",
                Address: "Rua Serra das Vertentes",
                Number: 67,
                Complement: "(Prq Reid)",
                Suburb: "Campanário",
                State: "SP",
                City: "Diadema",
                Email: "delo_souza@hotmail.com",
                AreaCode: "11",
                PhoneNumber: "44444-4444",
                CellPhone: "99999-9999",
                MaritalStatusId: 2,
                GroupId: 2,
                AssignmentId: 3,
                SituationId: 1,
                IsRegularPioneer: false,
                IsAnointed: false,
                IsLegalRepresentative: true,
                Ocupation: "Gestor",
                Nationality: "Brasileiro",
                Remark: "Aceito o uso de frações de sangue, tais como: Albumina, Imunoglobulinas, Hemoglobina, Hemina, Interferons e Eritropoetina (EPO). Aceito também os seguintes procedimentos: Recuperação Intra-Operatória de Células,  Hemodiluição, Máquina Coração-Pulmão, Diálese, Tampão Sanguineo Peridural e Tampão de Cola de Fibrina.",
                Witness1Name: "Ronaldo Pereira de Souza",
                Witness1GeneralId: "225389435",
                Witness2Name: "Rubiana Silvia Ribeiro de Souza",
                Witness2GeneralId: "239302916",
                LegalRepresentative1Id: -1,
                LegalRepresentative2Id: -1
            })
        ]);

        await db.calendar.bulkAdd([
            new CalendarDB({
                Id: 1,
                Calendar: 202101
            }),
            new CalendarDB({
                Id: 2,
                Calendar: 202102
            }),
            new CalendarDB({
                Id: 3,
                Calendar: 202103
            }),
            new CalendarDB({
                Id: 4,
                Calendar: 202201
            }),
            new CalendarDB({
                Id: 5,
                Calendar: 202202
            }),
            new CalendarDB({
                Id: 6,
                Calendar: 202203
            }),            
        ]);

        await db.report.bulkAdd([
            new ReportDB({
                Id: 1,
                PublisherId: 1,
                CalendarId: 1,
                TypeId: 1,
                Publications: 1,
                Videos: 1,
                Hours: 1,
                Revisits: 1,
                Studies: 1
            }),
            new ReportDB({
                Id: 2,
                PublisherId: 1,
                CalendarId: 5,
                TypeId: 1,
                Publications: 2,
                Videos: 2,
                Hours: 2,
                Revisits: 2,
                Studies: 2
            }),
            new ReportDB({
                Id: 3,
                PublisherId: 1,
                CalendarId: 6,
                TypeId: 1,
                Publications: 3,
                Videos: 3,
                Hours: 3,
                Revisits: 3,
                Studies: 3
            }),
            new ReportDB({
                Id: 4,
                PublisherId: 2,
                CalendarId: 4,
                TypeId: 1,
                Publications: 1,
                Videos: 1,
                Hours: 1,
                Revisits: 1,
                Studies: 1
            }),
            new ReportDB({
                Id: 5,
                PublisherId: 2,
                CalendarId: 2,
                TypeId: 1,
                Publications: 2,
                Videos: 2,
                Hours: 2,
                Revisits: 2,
                Studies: 2
            }),
            new ReportDB({
                Id: 6,
                PublisherId: 2,
                CalendarId: 6,
                TypeId: 1,
                Publications: 3,
                Videos: 3,
                Hours: 3,
                Revisits: 3,
                Studies: 3
            }),
            new ReportDB({
                Id: 7,
                PublisherId: 3,
                CalendarId: 4,
                TypeId: 1,
                Publications: 1,
                Videos: 1,
                Hours: 1,
                Revisits: 1,
                Studies: 1
            }),
            new ReportDB({
                Id: 8,
                PublisherId: 3,
                CalendarId: 5,
                TypeId: 1,
                Publications: 2,
                Videos: 2,
                Hours: 2,
                Revisits: 2,
                Studies: 2
            }),
            new ReportDB({
                Id: 9,
                PublisherId: 3,
                CalendarId: 3,
                TypeId: 1,
                Publications: 3,
                Videos: 3,
                Hours: 3,
                Revisits: 3,
                Studies: 3
            }),            
        ]);
    }
}

export const db = new ApplicationDB();