import { Component, input } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  template: `
    <div class="textos">
      <h1>{{ titulo() }}</h1>
      @if (subtitulo()) {
        <p>{{ subtitulo() }}</p>
      }
    </div>
    <ng-content />
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      flex: none;
      min-height: clamp(96px, 12vh, 125px);
      box-sizing: border-box;
      padding: 8px clamp(16px, 2.5vw, 36px) 8px clamp(16px, 2.6vw, 38px);
      background: var(--mat-sys-inverse-on-surface);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
      position: relative;
      z-index: 1;
    }

    .textos {
      flex: 1;
      min-width: 280px;
    }

    h1 {
      margin: 0;
      font-size: clamp(32px, 3.4vw, 48px);
      font-weight: 700;
      line-height: 1.25;
    }

    p {
      margin: 0 0 0 2px;
      font-size: 18px;
      font-weight: 500;
      line-height: 1.6;
      color: var(--mat-sys-on-surface-variant);
    }
  `,
})
export class Encabezado {
  titulo = input.required<string>();
  subtitulo = input<string>();
}
