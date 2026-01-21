import { environment } from './../environment/environment';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  baseUrl = environment.baseUrl;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {}

  updateHreflangLinks(currentUrl: string) {
    // eski hreflang'larni o'chiramiz
    const links = this.document.querySelectorAll(
      `link[rel="alternate"][hreflang]`,
    );
    links.forEach((l) => l.remove());
    const langs = [
      {
        hreflang: 'en',
        path: '/en',
      },
      {
        hreflang: 'uz',
        path: '/uz',
      },
      { hreflang: 'x-default', path: '/uz' },
    ];

    langs.forEach((lang) => {
      const link = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang.hreflang);
      link.setAttribute('href', this.baseUrl + lang.path + currentUrl);
      this.document.head.appendChild(link);
    });
  }
}
