import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-page-footer',
  standalone: true,
  imports: [MatToolbarModule, TranslocoModule],
  templateUrl: './page-footer.component.html',
  styleUrls: ['./page-footer.component.scss'],
})
export class PageFooterComponent {}
