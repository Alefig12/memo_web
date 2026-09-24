import {
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  computed,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as L from 'leaflet';

import { LUGARES, Lugar } from '../datos';
import { Encabezado } from '../encabezado/encabezado';
import { ConfirmarEliminar } from './confirmar-eliminar';

@Component({
  selector: 'app-lugares',
  imports: [
    Encabezado,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRippleModule,
    MatSliderModule,
  ],
  templateUrl: './lugares.html',
  styleUrl: './lugares.scss',
})
export class Lugares implements OnDestroy {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private mapaRef = viewChild.required<ElementRef<HTMLDivElement>>('mapa');

  protected lugares = signal<Lugar[]>(LUGARES.map((l) => ({ ...l })));
  protected busqueda = signal('');
  protected visibles = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    return this.lugares().filter((l) => l.nombre.toLowerCase().includes(texto));
  });

  protected elegidoId = signal<number | null>(LUGARES[0].id);
  protected elegido = computed(() => this.lugares().find((l) => l.id === this.elegidoId()) ?? null);

  protected editando = signal(false);
  protected borrador = signal<Lugar | null>(null);
  protected actual = computed(() => this.borrador() ?? this.elegido());

  private mapa?: L.Map;
  private observador?: ResizeObserver;
  private marcador?: L.Marker;
  private circulo?: L.Circle;

  constructor() {
    afterNextRender(() => this.crearMapa());

    effect(() => {
      const l = this.actual();
      if (!this.mapa || !l) return;
      const punto = L.latLng(l.lat, l.lng);
      this.marcador?.setLatLng(punto);
      this.circulo?.setLatLng(punto).setRadius(l.radio);
    });

    effect(() => {
      const l = this.elegido();
      if (this.mapa && l && !this.editando()) {
        this.mapa.setView([l.lat, l.lng], 16);
      }
    });

    effect(() => {
      const editable = this.editando();
      if (!this.marcador) return;
      if (editable) {
        this.marcador.dragging?.enable();
      } else {
        this.marcador.dragging?.disable();
      }
    });
  }

  ngOnDestroy() {
    this.observador?.disconnect();
    this.mapa?.remove();
  }

  private crearMapa() {
    const l = this.elegido() ?? LUGARES[0];
    this.mapa = L.map(this.mapaRef().nativeElement, { zoomControl: true }).setView([l.lat, l.lng], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(this.mapa);

    const icono = L.divIcon({
      className: 'pin-lugar',
      html: '<span class="material-symbols-outlined lleno">location_on</span>',
      iconSize: [40, 40],
      iconAnchor: [20, 38],
    });
    this.circulo = L.circle([l.lat, l.lng], {
      radius: l.radio,
      color: '#3d2e00',
      weight: 2,
      fillColor: '#ffbd35',
      fillOpacity: 0.3,
    }).addTo(this.mapa);
    this.marcador = L.marker([l.lat, l.lng], { icon: icono, draggable: false }).addTo(this.mapa);

    this.observador = new ResizeObserver(() => this.mapa?.invalidateSize());
    this.observador.observe(this.mapaRef().nativeElement);

    this.marcador.on('dragend', () => this.moverA(this.marcador!.getLatLng()));
    this.mapa.on('click', (e: L.LeafletMouseEvent) => {
      if (this.editando()) this.moverA(e.latlng);
    });
  }

  private moverA(punto: L.LatLng) {
    const b = this.borrador();
    if (b) this.borrador.set({ ...b, lat: punto.lat, lng: punto.lng });
  }

  elegir(l: Lugar) {
    if (this.editando()) this.cancelar();
    this.elegidoId.set(l.id);
  }

  editar() {
    const l = this.elegido();
    if (!l) return;
    this.borrador.set({ ...l });
    this.editando.set(true);
  }

  cambiarNombre(nombre: string) {
    const b = this.borrador();
    if (b) this.borrador.set({ ...b, nombre });
  }

  cambiarRadio(radio: number) {
    if (!this.editando()) this.editar();
    const b = this.borrador();
    if (b) this.borrador.set({ ...b, radio });
  }

  guardar() {
    const b = this.borrador();
    if (!b) return;
    const nombre = b.nombre.trim() || this.elegido()!.nombre;
    this.lugares.update((lista) => lista.map((l) => (l.id === b.id ? { ...b, nombre } : l)));
    this.salirDeEdicion();
    this.snackBar.open('Lugar guardado', undefined, { duration: 2500 });
  }

  cancelar() {
    this.salirDeEdicion();
    const l = this.elegido();
    if (l && this.mapa) this.mapa.setView([l.lat, l.lng], this.mapa.getZoom());
  }

  eliminar() {
    const l = this.elegido();
    if (!l) return;
    this.dialog
      .open(ConfirmarEliminar, {
        width: '504px',
        backdropClass: 'fondo-gris',
        panelClass: 'dialogo-memo',
        autoFocus: false,
      })
      .afterClosed()
      .subscribe((confirmado) => {
        if (!confirmado) return;
        this.lugares.update((lista) => lista.filter((x) => x.id !== l.id));
        this.salirDeEdicion();
        this.elegidoId.set(this.lugares()[0]?.id ?? null);
        this.snackBar.open(`Se eliminó ${l.nombre}`, undefined, { duration: 2500 });
      });
  }

  private salirDeEdicion() {
    this.editando.set(false);
    this.borrador.set(null);
  }
}
