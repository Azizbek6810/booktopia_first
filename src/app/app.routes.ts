import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { languageGuard } from './core/guard/language.guard';

export const routes: Routes = [
  {
    path: '',
    canMatch: [languageGuard],
    children: [
      {
        path: ':lang',
        children: [{ path: '', component: HomeComponent }],
      },
    ],
  },
];
