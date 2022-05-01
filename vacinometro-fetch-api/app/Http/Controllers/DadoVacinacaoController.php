<?php

namespace App\Http\Controllers;

use App\Models\DadoVacinacao;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class DadoVacinacaoController {

    // Recupera o último dado registrado no banco.
    public function getLatestData() {

        if(Cache::has('latestData')) {
            $dadoMaisRecente = Cache::get('latestData');

            return response()->json($dadoMaisRecente);
        }

        $dadoMaisRecente = DadoVacinacao::select()
        ->orderByDesc('dataAtualizacao')
        ->limit(1)
        ->get();

        if (!$dadoMaisRecente) return response(0);

        $expiresAt = Carbon::now()->addHours(12);

        Cache::put('latestData', $dadoMaisRecente, $expiresAt);

        return response()->json($dadoMaisRecente);

    }

    // Recupera os dois últimos dados registrados no banco e retorna a diferença entre eles
    public function get24HoursData() {

        $resposta = array(
            "primeirasDoses" => 0,
            "segundasDoses" => 0,
            "dosesReforco" => 0
        );

        // Verifica se o item já não existe no cache.
        if(Cache::has('last24hours')) {

            $resposta = Cache::get('last24hours');

            return response()->json($resposta);
        }

        $ultimosDoisDados = DadoVacinacao::select()
        ->orderByDesc('dataAtualizacao')
        ->limit(2)
        ->get();

        // Caso as informações estejam incompletas
        if (!$ultimosDoisDados) return response()->json($resposta);
        if (count($ultimosDoisDados) < 2 ) return response()->json($resposta);

        // Caso o dado mais recente não tenha sido atualizado hoje (Número de doses permanece igual),
        // não houve registro de novas doses nas últimas 24 horas.
        $today = date('d/M/Y');
        $latestDataUpdateTimestamp =  strtotime($ultimosDoisDados[0]["dataAtualizacao"]);
        $latestDataUpdatedDate = date('d/M/Y', $latestDataUpdateTimestamp);

        if ($today != $latestDataUpdatedDate) {
            return response()->json($resposta);
        }

        // Campos recuperados do banco
        $ultimasPrimeirasDoses = $ultimosDoisDados[0]["qtdPrimeiraDose"];
        $ultimasSegundasDoses = $ultimosDoisDados[0]["qtdSegundaDose"];
        $ultimasDosesReforco = $ultimosDoisDados[0]["qtdDoseReforco"];
        $penultimasPrimeirasDoses = $ultimosDoisDados[1]["qtdPrimeiraDose"];
        $penultimasSegundasDoses = $ultimosDoisDados[1]["qtdSegundaDose"];
        $penultimasDosesReforco = $ultimosDoisDados[1]["qtdDoseReforco"];

        // Respostas finais
        $resposta["primeirasDoses"] = abs((int) $ultimasPrimeirasDoses - (int) $penultimasPrimeirasDoses);
        $resposta["segundasDoses"] = abs((int) $ultimasSegundasDoses - (int) $penultimasSegundasDoses);
        $resposta["dosesReforco"] = abs((int) $ultimasDosesReforco - (int) $penultimasDosesReforco);

        // Adiciona o item ao cache com um tempo de expiração de 12 horas
        $expiresAt = Carbon::now()->addHours(12);
        Cache::put('last24hours', $resposta, $expiresAt);

        return response()->json($resposta);
    }

    // Recupera todos os dados do banco e os filtra por mês
    public function getHistoryData() {
        if(Cache::has('historyData')) {

            $resposta = Cache::get('historyData');

            return response()->json($resposta);
        }

        $dadosHistoricos = DadoVacinacao::select()
        ->orderByDesc('dataAtualizacao')
        ->get();

        $expiresAt = Carbon::now()->addHours(12);

        Cache::put('historyData', $dadosHistoricos, $expiresAt);

        return response()->json($dadosHistoricos);

    }

}
