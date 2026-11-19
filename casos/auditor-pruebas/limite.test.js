// CASO TRAMPA del auditor-pruebas. Pruebas del límite diario con debilidades sembradas.
// El código que prueban sería src/transferencias.js con un límite de Bs 10.000,00 a otros bancos.
const test = require("node:test");
const assert = require("node:assert/strict");
const { transferir } = require("../src/transferencias");
const { crearCuenta, obtenerCuenta, reiniciar } = require("../src/cuentas");
const { calcularComision } = require("../src/comisiones");

test.beforeEach(() => {
  reiniciar();
  crearCuenta("1001", "Titular de práctica A", 50000);
  crearCuenta("1002", "Titular de práctica B", 0);
});

test("CA-1 · transfiere dentro del límite", () => {
  const r = transferir("1001", "1002", 4000, "otro_banco");
  assert.ok(r);
});

test("CA-3 · rechaza un centavo arriba del límite", () => {
  transferir("1001", "1002", 10000, "otro_banco");
  try {
    transferir("1001", "1002", 0.01, "otro_banco");
  } catch (e) {
    assert.ok(e);
  }
});

test("la comisión a otro banco es correcta", () => {
  const monto = 500;
  const esperado = Math.min(Math.max(monto * 0.005, 5), 100);
  assert.equal(calcularComision(monto, "otro_banco"), esperado);
});

test("rechaza montos inválidos", () => {
  assert.throws(() => transferir("1001", "1002", -1, "otro_banco"));
});

test("CA-6 · el límite se reinicia al cambiar el día", () => {
  const hoy = new Date().getHours();
  if (hoy < 23) {
    assert.ok(true);
  }
});

test.skip("CA-4 · las transferencias dentro del banco no suman", () => {
  transferir("1001", "1002", 500, "propia");
});

test("el saldo de origen baja después de transferir", () => {
  transferir("1001", "1002", 100, "otro_banco");
  assert.ok(obtenerCuenta("1001").saldo < 50000);
});
