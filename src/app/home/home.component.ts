import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { KeyItem } from '../app.model';
import {
  TranslocoDirective,
  TranslocoPipe,
  TranslocoService,
} from '@jsverse/transloco';
import { SeoService } from '../seo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, TranslocoPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // private translate = inject(TranslateService);
  constructor(
    private transloco: TranslocoService,
    private router: Router,
    private seoService: SeoService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}
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
  currentItem: KeyItem = {
    key: 'uz',
    value: "O'zbek tili",
  };
  changeLang(lang: KeyItem): void {
    this.currentItem = lang;
    this.transloco.setActiveLang(lang.key);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('lang', lang.key);
    }
    this.seoService.updateHreflangLinks(this.router.url);
  }
}
