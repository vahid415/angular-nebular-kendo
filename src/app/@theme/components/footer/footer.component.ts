import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
      Created with ♥ by <b><a href="https://github.com/vahid415/angular-nebular-kendo" target="_blank">Vahid</a></b> 2020
    </span>
    <div class="socials">
      <a href="https://github.com/vahid415" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/vahid-khanmohamadi-5aa780180" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}
