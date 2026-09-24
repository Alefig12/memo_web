import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmar-eliminar',
  imports: [MatButtonModule, MatDialogModule],
  template: `
    <header>CONFIRMACIÓN</header>
    <p>¿Estás seguro que deseas eliminar este Lugar?</p>
    <div class="botones">
      <button mat-flat-button class="boton-tonal negro" [mat-dialog-close]="false">Cancelar</button>
      <button mat-flat-button class="boton-tonal" [mat-dialog-close]="true">Sí, eliminar</button>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    header {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--mat-sys-surface-container-high);
      border-bottom: 1px solid var(--mat-sys-outline);
      font-size: 32px;
      font-weight: 500;
    }

    p {
      margin: 26px 70px 0;
      font-size: 32px;
      font-weight: 500;
      line-height: 1.6;
      text-align: center;
      color: #000;
    }

    .botones {
      display: flex;
      justify-content: center;
      gap: 19px;
      padding: 24px 0 45px;

      button {
        width: 196px;
      }
    }
  `,
})
export class ConfirmarEliminar {}
