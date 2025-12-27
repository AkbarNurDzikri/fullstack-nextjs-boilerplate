-- CreateEnum
CREATE TYPE "StatusRumah" AS ENUM ('KOSONG', 'DIHUNI', 'DIKONTRAKKAN', 'DIJUAL', 'RENOVASI');

-- CreateEnum
CREATE TYPE "StatusPenduduk" AS ENUM ('AKTIF', 'PINDAH', 'MENINGGAL', 'SEMENTARA');

-- CreateEnum
CREATE TYPE "JenisKelamin" AS ENUM ('LAKI_LAKI', 'PEREMPUAN');

-- CreateEnum
CREATE TYPE "Pendidikan" AS ENUM ('TIDAK_SEKOLAH', 'SD', 'SMP', 'SMA', 'D1', 'D2', 'D3', 'S1', 'S2', 'S3');

-- CreateEnum
CREATE TYPE "StatusPernikahan" AS ENUM ('BELUM_KAWIN', 'KAWIN', 'CERAI_HIDUP', 'CERAI_MATI');

-- CreateEnum
CREATE TYPE "Agama" AS ENUM ('ISLAM', 'KRISTEN', 'KATOLIK', 'HINDU', 'BUDDHA', 'KHONGHUCU');

-- CreateEnum
CREATE TYPE "HubunganKeluarga" AS ENUM ('KEPALA_KELUARGA', 'ISTRI', 'ANAK', 'ORANG_TUA', 'MERTUA', 'CUCU', 'FAMILI_LAIN', 'LAINNYA');

-- CreateEnum
CREATE TYPE "RentangPenghasilan" AS ENUM ('TIDAK_ADA', 'DI_BAWAH_1JT', 'ANTARA_1JT_3JT', 'ANTARA_3JT_5JT', 'ANTARA_5JT_10JT', 'DI_ATAS_10JT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastLogin" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Gang" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "deskripsi" TEXT,
    "ketuaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Gang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rumah" (
    "id" TEXT NOT NULL,
    "nomor" TEXT NOT NULL,
    "alamat" TEXT,
    "status" "StatusRumah" NOT NULL DEFAULT 'KOSONG',
    "gangId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Rumah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keluarga" (
    "id" TEXT NOT NULL,
    "nomorKK" TEXT NOT NULL,
    "alamatLama" TEXT,
    "sudahUpdateDomisili" BOOLEAN NOT NULL DEFAULT false,
    "status" "StatusPenduduk" NOT NULL DEFAULT 'AKTIF',
    "rumahId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Keluarga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penduduk" (
    "id" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "jenisKelamin" "JenisKelamin" NOT NULL,
    "agama" "Agama" NOT NULL,
    "pendidikan" "Pendidikan" NOT NULL,
    "golonganDarah" TEXT,
    "statusPernikahan" "StatusPernikahan" NOT NULL,
    "tanggalNikah" TIMESTAMP(3),
    "pekerjaan" TEXT,
    "kewarganegaraan" TEXT NOT NULL DEFAULT 'WNI',
    "namaAyah" TEXT,
    "namaIbu" TEXT,
    "hubunganKeluarga" "HubunganKeluarga" NOT NULL,
    "apakahBekerja" BOOLEAN NOT NULL DEFAULT false,
    "penghasilanBulanan" "RentangPenghasilan" NOT NULL DEFAULT 'TIDAK_ADA',
    "status" "StatusPenduduk" NOT NULL DEFAULT 'AKTIF',
    "tanggalMasuk" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tanggalKeluar" TIMESTAMP(3),
    "alasanKeluar" TEXT,
    "keluargaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "Penduduk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MutasiPenduduk" (
    "id" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jenisMutasi" TEXT NOT NULL,
    "alasan" TEXT,
    "pendudukId" TEXT NOT NULL,
    "rumahId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,

    CONSTRAINT "MutasiPenduduk_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Gang_nama_key" ON "Gang"("nama");

-- CreateIndex
CREATE UNIQUE INDEX "Gang_ketuaId_key" ON "Gang"("ketuaId");

-- CreateIndex
CREATE UNIQUE INDEX "Rumah_nomor_key" ON "Rumah"("nomor");

-- CreateIndex
CREATE UNIQUE INDEX "Rumah_gangId_nomor_key" ON "Rumah"("gangId", "nomor");

-- CreateIndex
CREATE UNIQUE INDEX "Keluarga_nomorKK_key" ON "Keluarga"("nomorKK");

-- CreateIndex
CREATE UNIQUE INDEX "Penduduk_nik_key" ON "Penduduk"("nik");

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_ketuaId_fkey" FOREIGN KEY ("ketuaId") REFERENCES "Penduduk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Gang" ADD CONSTRAINT "Gang_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_gangId_fkey" FOREIGN KEY ("gangId") REFERENCES "Gang"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rumah" ADD CONSTRAINT "Rumah_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keluarga" ADD CONSTRAINT "Keluarga_rumahId_fkey" FOREIGN KEY ("rumahId") REFERENCES "Rumah"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keluarga" ADD CONSTRAINT "Keluarga_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keluarga" ADD CONSTRAINT "Keluarga_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_keluargaId_fkey" FOREIGN KEY ("keluargaId") REFERENCES "Keluarga"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penduduk" ADD CONSTRAINT "Penduduk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_pendudukId_fkey" FOREIGN KEY ("pendudukId") REFERENCES "Penduduk"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_rumahId_fkey" FOREIGN KEY ("rumahId") REFERENCES "Rumah"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MutasiPenduduk" ADD CONSTRAINT "MutasiPenduduk_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
