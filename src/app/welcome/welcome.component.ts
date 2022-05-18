import { Component, HostListener, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private swUpdate: SwUpdate) { }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.subscribe(() => {
        if (confirm("Há uma nova versão do aplicativo disponível, deseja baixá-lo?")) {
          window.location.reload();
        }
      });
    }
  }

  // deferredPrompt: any;
  // showButton = false;

  // @HostListener('window:beforeinstallprompt', ['$event'])
  // onbeforeinstallprompt(e: any) {
  //   console.log(e);
  //   e.preventDefault();
  //   this.deferredPrompt = e;
  //   this.showButton = true;
  // }

  // addToHomeScreen() {
  //   this.showButton = false;
  //   this.deferredPrompt.prompt();
  //   this.deferredPrompt.userChoice
  //     .then((choiceResult: any) => {
  //       if (choiceResult.outcome === 'accepted') {
  //         console.log('User accepted the A2HS prompt');
  //       } else {
  //         console.log('User dismissed the A2HS prompt');
  //       }
  //       this.deferredPrompt = null;
  //     });
  // }
}