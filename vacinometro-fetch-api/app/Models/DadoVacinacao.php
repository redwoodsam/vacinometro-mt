<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class DadoVacinacao extends Model {

    protected $table = 'vacinacao_mt';


    protected $fillable = [
        'qtdPrimeiraDose',
        'porcentagemPrimeiraDose',
        'qtdSegundaDose',
        'porcentagemSegundaDose',
        'qtdDoseReforco',
        'porcentagemDoseReforco',
        'dataAtualizacao'
    ];

    protected $hidden = [];

}
