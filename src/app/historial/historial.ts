import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

import { CONTACTOS, MEMOS_CERRADOS, MemoCerrado, PERIODOS, SEMANAS } from '../datos';
import { Encabezado } from '../encabezado/encabezado';

const RANGOS: Record<string, [number, number]> = {
  'Últimos 7 días': [2, 8],
  'Últimos 30 días': [6, 24],
  'Últimos 3 meses': [18, 60],
};

function azar(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function repartir(total: number, partes: number) {
  const valores = new Array(partes).fill(0);
  for (let i = 0; i < total; i++) {
    valores[Math.floor(Math.random() * partes)]++;
  }
  return valores;
}

@Component({
  selector: 'app-historial',
  imports: [
    Encabezado,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
  ],
  templateUrl: './historial.html',
  styleUrl: './historial.scss',
})
export class Historial {
  protected periodos = PERIODOS;
  protected contactos = CONTACTOS;

  protected periodo = signal<string | null>(null);
  protected contacto = signal<string | null>(null);
  protected hayDatos = computed(() => this.datos() !== null);
  protected nombre = computed(() => this.contacto()?.split(' ')[0] ?? '');

  protected datos = computed(() => {
    const periodo = this.periodo();
    if (!periodo || !this.contacto()) return null;

    const [min, max] = RANGOS[periodo];
    const tu = azar(min, max);
    const suyos = azar(min, max);
    const tuHora = azar(0, tu);
    const suyosHora = azar(0, suyos);
    const tuSemanas = repartir(tu, SEMANAS.length);
    const suyosSemanas = repartir(suyos, SEMANAS.length);
    const semanas = SEMANAS.map((s, i) => ({
      etiqueta: s.etiqueta,
      tu: tuSemanas[i],
      contacto: suyosSemanas[i],
    }));
    const fallidos = azar(0, Math.ceil(max / 5));

    return {
      tu,
      suyos,
      total: tu + suyos,
      fallidos,
      cerrados: tu + suyos + fallidos,
      porcentajeTu: Math.round((tu / (tu + suyos)) * 100),
      porHora: { tu: tuHora, contacto: suyosHora },
      porLugar: { tu: tu - tuHora, contacto: suyos - suyosHora },
      semanas,
      maximoSemana: Math.max(1, ...semanas.flatMap((x) => [x.tu, x.contacto])),
    };
  });

  protected pestana = signal(0);
  protected verMas = signal(false);

  protected cerrados = computed(() => {
    const filtro = this.pestana();
    return MEMOS_CERRADOS.filter(
      (m) =>
        (filtro === 0 || (filtro === 1 ? m.direccion === 'encargado' : m.direccion === 'recibido')) &&
        (this.verMas() || m.semana !== 'Hace dos semanas'),
    );
  });

  protected grupos = computed(() => {
    const grupos: { semana: string; memos: MemoCerrado[] }[] = [];
    for (const m of this.cerrados()) {
      const g = grupos.find((x) => x.semana === m.semana);
      if (g) g.memos.push(m);
      else grupos.push({ semana: m.semana, memos: [m] });
    }
    return grupos;
  });

  detalle(m: MemoCerrado) {
    return m.detalle.replace('{contacto}', this.contacto() ?? '');
  }
}
