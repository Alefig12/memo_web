import { Routes } from '@angular/router';

import { Historial } from './historial/historial';
import { Login } from './login/login';
import { Lugares } from './lugares/lugares';
import { Shell } from './shell/shell';
import { Tablero } from './tablero/tablero';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: Login, title: 'Memo - Iniciar sesión' },
  {
    path: '',
    component: Shell,
    children: [
      { path: 'tablero', component: Tablero, title: 'Memo - Tablero' },
      { path: 'lugares', component: Lugares, title: 'Memo - Mis Lugares' },
      { path: 'historial', component: Historial, title: 'Memo - Mi Historial' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
