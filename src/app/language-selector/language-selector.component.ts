import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  TranslocoModule,
  TranslocoService,
  getBrowserLang,
} from '@jsverse/transloco';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslocoModule,
  ],
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnInit {
  activeLang!: string;
  availableLangs!: string[];
  private translocoService = inject(TranslocoService);

  ngOnInit(): void {
    const browserLang = `${getBrowserLang()}`;

    this.availableLangs = this.translocoService.getAvailableLangs() as string[];

    if (this.translocoService.isLang(browserLang)) {
      this.activeLang = getBrowserLang()!;
      this.translocoService.setActiveLang(this.activeLang);
    } else {
      this.activeLang = this.translocoService.getDefaultLang()!;
    }
  }

  changeLanguage(lang: string): void {
    this.translocoService.setActiveLang(lang);
    this.activeLang = this.translocoService.getActiveLang()!;
  }
}
