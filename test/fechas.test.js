import assert from "node:assert/strict";
import test from "node:test";

import { aDia, avisoDe, escribirDia, estadoDelClub, nocheActual, proximaFecha } from "../src/js/modulos/fechas.js";

// Un momento en la hora de Bogotá. 2026-11-12 es jueves.
const enBogota = (fecha, hora) => Date.parse(`${fecha}T${hora}:00-05:00`);

test("la noche vigente cambia a las 3 a. m. de Bogotá", () => {
  assert.equal(nocheActual(enBogota("2026-11-13", "02:59")), aDia("2026-11-12"));
  assert.equal(nocheActual(enBogota("2026-11-13", "03:00")), aDia("2026-11-13"));
});

test("la noche vigente cruza el cambio de año", () => {
  assert.equal(nocheActual(enBogota("2027-01-01", "02:59")), aDia("2026-12-31"));
  assert.equal(nocheActual(enBogota("2027-01-01", "03:00")), aDia("2027-01-01"));
});

test("la noche vigente cuenta el 29 de febrero", () => {
  assert.equal(nocheActual(enBogota("2028-02-29", "12:00")), aDia("2028-02-29"));
  assert.equal(nocheActual(enBogota("2028-03-01", "02:00")), aDia("2028-02-29"));
});

test("el jueves abre a las 10 p. m.", () => {
  assert.deepEqual(estadoDelClub(enBogota("2026-11-12", "20:00")), { noche: 4, abierto: false, texto: "Hoy abrimos a las 10 p. m." });
  assert.deepEqual(estadoDelClub(enBogota("2026-11-12", "22:00")), { noche: 4, abierto: true, texto: "Abierto ahora, hasta las 3 a. m." });
});

test("el viernes a las 2:59 a. m. sigue la noche del jueves, y a las 3:00 ya cerró", () => {
  assert.deepEqual(estadoDelClub(enBogota("2026-11-13", "02:59")), { noche: 4, abierto: true, texto: "Abierto ahora, hasta las 3 a. m." });
  assert.deepEqual(estadoDelClub(enBogota("2026-11-13", "03:00")), { noche: 5, abierto: false, texto: "Hoy abrimos a las 10 p. m." });
});

test("el sábado a las 11 p. m. está abierto", () => {
  assert.deepEqual(estadoDelClub(enBogota("2026-11-14", "23:00")), { noche: 6, abierto: true, texto: "Abierto ahora, hasta las 3 a. m." });
});

test("el domingo a las 2 a. m. sigue la noche del sábado, y en la tarde está cerrado", () => {
  assert.deepEqual(estadoDelClub(enBogota("2026-11-15", "02:00")), { noche: 6, abierto: true, texto: "Abierto ahora, hasta las 3 a. m." });
  assert.deepEqual(estadoDelClub(enBogota("2026-11-15", "15:00")), { noche: null, abierto: false, texto: "Abrimos el jueves a las 10 p. m." });
});

test("el lunes señala el jueves y el miércoles dice mañana", () => {
  assert.equal(estadoDelClub(enBogota("2026-11-16", "12:00")).texto, "Abrimos el jueves a las 10 p. m.");
  assert.equal(estadoDelClub(enBogota("2026-11-18", "12:00")).texto, "Mañana abrimos a las 10 p. m.");
  assert.equal(estadoDelClub(enBogota("2026-11-18", "23:00")).abierto, false);
});

test("avisoDe distingue esta noche, mañana y próxima noche", () => {
  assert.equal(avisoDe(10, 10), "Esta noche");
  assert.equal(avisoDe(11, 10), "Mañana");
  assert.equal(avisoDe(12, 10), "Próxima noche");
});

test("escribirDia da la fecha en español y en formato ISO", () => {
  assert.deepEqual(escribirDia(aDia("2026-11-07")), { iso: "2026-11-07", numero: 7, semana: "sábado", mes: "noviembre", texto: "sábado 7 de noviembre" });
  assert.equal(escribirDia(aDia("2028-02-29")).texto, "martes 29 de febrero");
});

test("proximaFecha conserva una fecha base a menos de un ciclo", () => {
  assert.equal(proximaFecha(aDia("2026-11-19"), aDia("2026-11-12")), aDia("2026-11-19"));
});

test("proximaFecha trae al ciclo vigente una fecha base lejana, futura o pasada", () => {
  assert.equal(proximaFecha(aDia("2026-11-26"), aDia("2026-11-12")), aDia("2026-11-12"));
  assert.equal(proximaFecha(aDia("2026-10-29"), aDia("2026-11-12")), aDia("2026-11-12"));
  assert.equal(proximaFecha(aDia("2026-10-29"), aDia("2026-11-13")), aDia("2026-11-26"));
});

test("proximaFecha cruza el cambio de año y el 29 de febrero", () => {
  assert.equal(proximaFecha(aDia("2026-12-24"), aDia("2027-01-01")), aDia("2027-01-07"));
  assert.equal(proximaFecha(aDia("2028-02-17"), aDia("2028-02-20")), aDia("2028-03-02"));
});
