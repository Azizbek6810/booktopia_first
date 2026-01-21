import {
  isPlatformBrowser,
  NgOptimizedImage,
  PlatformLocation,
} from '@angular/common';
import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { KeyItem } from '../app.model';
import { TranslocoPipe, TranslocoService } from '@jsverse/transloco';
import { SeoService } from '../seo.service';
import { Router } from '@angular/router';
import { LanguageService } from './language.service';
import { Language } from '../core/guard/language.guard';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private languageService = inject(LanguageService);
  platformLocation = inject(PlatformLocation);
  constructor(
    private router: Router,
    private seoService: SeoService,
    private translocoService: TranslocoService,
  ) {}

  parseLangFromUrl(url: string): string {
    return url.split('/')[1];
  }

  defineCurrentLang(url: string): string {
    const langFromUrl = this.parseLangFromUrl(url);

    const isValidLang = Object.values(Language).includes(langFromUrl);

    const langToUse = isValidLang ? langFromUrl : 'uz';

    return langToUse;
  }

  ngOnInit(): void {
    const lang = this.defineCurrentLang(this.platformLocation.pathname);

    this.languageService.updateLocale(lang);

    const activeLang = this.lang.find((el) => el.key === lang);

    this.currentLang = lang;

    this.currentItem = activeLang ? activeLang : this.lang[0];
  }

  lang: KeyItem[] = [
    {
      key: 'uz',
      value: "O'zbek tili",
    },
    {
      key: 'en',
      value: 'English',
    },
  ];

  currentLang: string = 'uz';

  currentItem: KeyItem;

  changeLang(lang: KeyItem): void {
    this.currentItem = lang;
    this.seoService.updateHreflangLinks(this.router.url);
    this.languageService.updateLocale(lang.key);
    this.languageService.changeLang(lang.key);
  }
}
