import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  get documentEl(): HTMLElement {
    return this.document.documentElement;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private meta: Meta,
    private translocoService: TranslocoService,
    private router: Router,
  ) {}

  updateLocale(lang: string): void {
    this.translocoService.setActiveLang(lang);

    this.translocoService.selectTranslateObject('meta').subscribe({
      next: ({ title, description }) => {
        this.meta.updateTag({
          name: 'description',
          content: description,
        });

        this.meta.updateTag({
          name: 'locale',
          content: lang,
        });

        this.meta.updateTag({
          'http-equiv': 'Content-Language',
          content: lang,
        });

        this.documentEl.lang = lang;
      },
    });
  }

  changeLang(lang: string): void {
    const currentUrl = this.router.url.replace(/^\/?[^/]+/, '');

    this.router.navigateByUrl(`/${lang}${currentUrl}`);

    setTimeout(() => {
      window.location.reload();
    }, 50);
  }
}
