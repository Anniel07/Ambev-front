

// can supply only what needed (the rest will be taken from current locale):
const ptLocale = {
  /* starting with Sunday */
  days: 'Domingo_Segunda_Terça_Quarta_Qunita_Sexta_Sábado'.split('_'),
  daysShort: 'Dom_Seg_Ter_Qua_Qun_Sex_Sáb'.split('_'),
  months:
    'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split(
      '_'
    ),
  monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split(
    '_'
  ),
  firstDayOfWeek: 1, // 0-6, 0 - Sunday, 1 Monday, ...
  format24h: true,
  pluralDay: 'dias',
};

import { Notify } from 'quasar'

const showAlert = (msg: string, success = false ) => {
  Notify.create({
    color: success ? 'positive' : 'negative',
    position: 'top',
    message: msg,
    icon: success ? 'check' : 'report_problem',
  });
};

const contratPoderPublico = `(a) O evento é contratado diretamente(a) O evento é contratado diretamente com o Poder Público ou com
um intermediário seu, sendo este uma agência ou produtora de
eventos licitada, via de regra. (Ex.: Eventos de Prefeituras,
Aniversário da Cidade, Carnaval, Festas de São João etc.). (b) O
evento é patrocinado mediante o uso de verba de incentivo fiscal
cultural ou esportivo (Ex.: Maratonas, Festas Juninas,
Oktoberfest, Conexão Skol). (c) Eventos realizados em espaços
públicos (ex.: Parques, Praças, Ruas, Avenidas, Parques de
Exposições Municipais ou Estaduais, Praias etc.). (d) Eventos
realizados em espaços tombados a nível municipal, estadual ou
federal. (ex.: Farol da Barra, em Salvador; Cinemateca, em São
Paulo; Morro da Urca, no Rio de Janeiro etc.)`;

const espacioPublico = `(a) O evento é contratado diretamente com o poder Público ou com
um intermediário seu, sendo este uma agência ou produtora de
eventos licitada, via de regra. (Ex.: Eventos de Prefeituras,
Aniversário da Cidade, Carnaval, Festas de São João etc.). (b) O
evento é patrocinado mediante o uso de verba de incentivo fiscal
cultural ou esportivo (Ex.: Maratonas, Festas Juninas,
Oktoberfest, Conexão Skol). (c) Eventos realizados em espaços
públicos (ex.: Parques, Praças, Ruas, Avenidas, Parques de
Exposições Municipais ou Estaduais, Praias etc.). (d) Eventos
realizados em espaços tombados a nível municipal, estadual ou
federal. (Ex. Farol da Barra, em Salvador; Cinemateca, em São
Paulo; Morro da Urca, no Rio de Janeiro etc.)`;

const menorIdade= `O evento permite a entrada e a participação de crianças e
adolescentes menores de 18 anos de idade.`;

const actRisco = `O evento possui alguma atração que exponha a risco elevado algum
dos seus participantes ou funcionários próprios ou terceiros.
Ex.: Montanha Russa, tirolesa, plataforma elevatória (mirante),
etc).`;

const marcaEst = `Há exposição das marcas da companhia na estrutura de palco ou de
camarote plotado no evento.`;

const universitario = `A CIA. Não patrocina este tipo de evento em razão de compromisso
firmado em prol do consumo responsável no âmbito da associação
nacional das cervejarias`;

export { ptLocale, showAlert, contratPoderPublico, espacioPublico, menorIdade,actRisco, marcaEst,universitario }
