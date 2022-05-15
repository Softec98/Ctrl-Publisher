export const environment = {
  production: true,
  dateInput: 'yyyy-MM-DD', // 'MM/DD/YYYY' | 'yyyy-MM-DD'
  dateLocale: 'pt-BR',     // en-US        | 'pt-BR'
  defaultLang: 'pt-BR',    // en           | 'pt-BR' 
  zipCodeEndPoint_pt_BR: [
    { Id: 1, url: `https://viacep.com.br/ws/[zipCode]/json/`, metodo: 'GET', cabecalho: 0 },
    { Id: 2, url: `http://republicavirtual.com.br/web_cep.php?formato=json&cep=[zipCode]`, metodo: 'GET', cabecalho: 0 },
    { Id: 3, url: `http://cep.la/[zipCode]`, metodo: 'GET', cabecalho: 1 }
  ],
  zipCodeEndPoint_us: [
    { Id: 1, url: `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/QuickGetZipCodeDetails/[zipCode]?key=DEMOAPIKEY`, metodo: 'GET', cabecalho: 0 }
  ],
  apiEndPoint: [
    'https://localhost:3000'
  ],
  DefaultRemark: 'Aceito o uso de frações de sangue, tais como: Albumina, Imunoglobulinas, Hemoglobina, Hemina, Interferons e Eritropoetina (EPO). Aceito também os seguintes procedimentos: Recuperação Intra-Operatória de Células,  Hemodiluição, Máquina Coração-Pulmão, Diálese, Tampão Sanguineo Peridural e Tampão de Cola de Fibrina.' 
};
