<?php

namespace App\Helpers;

use Carbon\Carbon;

class DateHelper
{
    /**
     * Convert numbers to Indonesian words
     */
    public static function terbilang($number)
    {
        $number = abs($number);
        $huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
        $temp = "";
        
        if ($number < 12) {
            $temp = " " . $huruf[$number];
        } else if ($number < 20) {
            $temp = self::terbilang($number - 10) . " Belas";
        } else if ($number < 100) {
            $temp = self::terbilang((int)($number / 10)) . " Puluh" . self::terbilang($number % 10);
        } else if ($number < 200) {
            $temp = " Seratus" . self::terbilang($number - 100);
        } else if ($number < 1000) {
            $temp = self::terbilang((int)($number / 100)) . " Ratus" . self::terbilang($number % 100);
        } else if ($number < 2000) {
            $temp = " Seribu" . self::terbilang($number - 1000);
        } else if ($number < 1000000) {
            $temp = self::terbilang((int)($number / 1000)) . " Ribu" . self::terbilang($number % 1000);
        }
        
        return $temp;
    }

    /**
     * Convert a date string to Indonesian verbose words.
     * Example: '2026-04-22' -> 'Rabu Tanggal Dua Puluh Dua Bulan April Tahun Dua Ribu Dua Puluh Enam'
     */
    public static function toIndonesianDateWords($dateString)
    {
        $date = Carbon::parse($dateString)->locale('id');
        
        $hari = $date->isoFormat('dddd');
        $tanggalAngka = $date->format('j');
        $bulan = $date->isoFormat('MMMM');
        $tahunAngka = $date->format('Y');

        $tanggalKata = trim(self::terbilang($tanggalAngka));
        $tahunKata = trim(self::terbilang($tahunAngka));

        return "{$hari} Tanggal {$tanggalKata} Bulan {$bulan} Tahun {$tahunKata}";
    }
}
