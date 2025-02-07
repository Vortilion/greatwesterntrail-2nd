import { Component, OnInit } from '@angular/core';
import {
  AvailableLangs,
  TranslocoService,
  getBrowserLang,
} from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: false,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  activeLang: any;
  availableLangs!: any[];

  constructor(private translocoService: TranslocoService) {}
  ngOnInit(): void {
    const browserLang: string = `${getBrowserLang()}`;

    this.availableLangs = this.translocoService.getAvailableLangs();

    if (this.translocoService.isLang(browserLang)) {
      this.activeLang = getBrowserLang();
      this.translocoService.setActiveLang(this.activeLang);
    } else {
      this.activeLang = this.translocoService.getDefaultLang();
    }
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = this.translocoService.getActiveLang();
  }
}
