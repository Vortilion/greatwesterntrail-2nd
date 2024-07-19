import { Component, OnInit } from '@angular/core';
import {
  AvailableLangs,
  TranslocoService,
  getBrowserLang,
} from '@ngneat/transloco';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  activeLang: any;

  constructor(private translocoService: TranslocoService) {}
  ngOnInit(): void {
    const browserLang: string = `${getBrowserLang()}`;

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
