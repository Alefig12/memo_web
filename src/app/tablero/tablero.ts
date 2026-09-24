import { Component, computed, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { Memo, RECUADROS_GRANDES, RECUADROS_PEQUENOS, Recuadro, memosDe } from '../datos';
import { Encabezado } from '../encabezado/encabezado';

@Component({
  selector: 'app-tablero',
  imports: [Encabezado, MatChipsModule, MatIconModule, MatRippleModule],
  templateUrl: './tablero.html',
  styleUrl: './tablero.scss',
})
export class Tablero {
  protected grandes = RECUADROS_GRANDES;
  protected pequenos = RECUADROS_PEQUENOS;
  protected cantidad = memosDe;

  protected recuadro = signal<Recuadro | null>(null);
  protected memo = signal<Memo | null>(null);
  protected memos = computed(() => {
    const r = this.recuadro();
    return r ? memosDe(r) : [];
  });

  elegirRecuadro(r: Recuadro) {
    this.recuadro.set(this.recuadro()?.id === r.id ? null : r);
    this.memo.set(null);
  }
}
