import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public auth: AuthService,
    public translateService: TranslateService) {

      let lang:string = environment.defaultLang.toString();

      auth.handleAuthentication();

      translateService.addLangs([lang, 'en']);
      
      translateService.setDefaultLang(lang); 
      
      const browserLang = translateService.getBrowserLang();

      translateService.use(browserLang?.match(/pt-BR|en/) ? browserLang : lang);
  }  
}