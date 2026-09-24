import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-shell',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
  ],
  templateUrl: './shell.html',
  styleUrl: './shell.scss',
})
export class Shell {
  protected cerrado = signal(false);

  constructor() {
    inject(BreakpointObserver)
      .observe('(max-width: 1100px)')
      .pipe(takeUntilDestroyed())
      .subscribe((r) => this.cerrado.set(r.matches));
  }

  protected secciones = [
    { ruta: '/tablero', nombre: 'Tablero', icono: 'home' },
    { ruta: '/lugares', nombre: 'Lugares', icono: 'location_on' },
    { ruta: '/historial', nombre: 'Historial', icono: 'quick_reference_all' },
  ];
}
