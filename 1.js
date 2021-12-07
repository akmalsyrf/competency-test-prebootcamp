// Fungsi total uang (tahun):
// Deposito bank = 350jt x 3.5% x tahun //24.500.000
// Obligasi = 650jt x 30% x 13% x tahun //50.700.000
// Saham A = 650jt x 35% x 14.5% x tahun //65.975.000
// Saham B = 650jt x 35% x 12.5% x tahun //56.875.000
// Total untung = deposito bank + obligasi + saham A + saham B // 198.050.000
// Return 1M + total untung  //1.198.050.000

function totalUang(tahun) {
  let deposito = ((350000000 * 3.5) / 100) * tahun;
  let obligasi = ((((650000000 * 30) / 100) * 13) / 100) * tahun;
  let sahamA = ((((650000000 * 35) / 100) * 14.5) / 100) * tahun;
  let sahamB = ((((650000000 * 35) / 100) * 12.5) / 100) * tahun;
  let totalUntung = deposito + obligasi + sahamA + sahamB;

  let hasil = 1000000000 + totalUntung;
  return hasil;
}
console.log(totalUang(2));
