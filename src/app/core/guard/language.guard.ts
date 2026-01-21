import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';

export const Language = {
  RU: 'ru',
  UZ: 'uz',
  EN: 'en',
};

export const languageGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const langService = inject(TranslocoService);

  const firstSegment = segments[0]?.path;

  const supportedLangs = Object.values(Language);
  const isLangPrefixed = supportedLangs.includes(firstSegment);

  if (isLangPrefixed) {
    return true;
  }

  const currentLang = langService.getActiveLang();

  const remainingSegments = segments.map((s) => s.path).join('/');
  router.navigate([`/${currentLang}/${remainingSegments}`]);

  return false;
};
