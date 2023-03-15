<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Cadastro de Eventos
    </h5>
  </div>
  <br />
  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Unidade</div>
    <p>{{ event?.unit }}</p>
  </div>

  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Marca</div>
    <p>{{ event?.brand }}</p>
  </div>
  <div class="q-ml-xl column items-start" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Nome do Evento</div>
    <p>{{ event?.name }}</p>
  </div>

  <div class="q-ml-xl row items-start q-gutter-xl" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Data início: {{ event?.startDate }}</div>
    <div class="text-h6 q-mb-xs" syle="margin-left: 100px;">
      Data fim: {{ event?.endDate }}
    </div>
  </div>
  <div class="q-ml-xl row items-start q-gutter-xl" style="margin-left: 300px">
    <div class="text-h6 q-mb-xs">Horário início: {{ event?.startTime }}</div>
    <div class="text-h6 q-mb-xs" syle="margin-left: 100px;">
      Horário fim: {{ event?.endTime }}
    </div>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p>Estado: {{ event?.state }}</p>
    <p style="margin-left: 150px">Cidade: {{ event?.city }}</p>
    <p style="margin-left: 150px">CEP: {{ event?.cep }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <!-- <div class="col-4"><p>Endereço: {{ event?.adress }}</p></div> -->
    <div class="col-8">
      <q-expansion-item
        expand-separator
        icon="pin_drop"
        header-class="text-orange"
        label="Endereço:"
        :caption="event?.adress"
        syle="margin-left: 300px;"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.571493761993!2d-46.68115388558403!3d-23.61969606963295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a2bfd0d0bf%3A0xbf5928fdcfe948c6!2sR.%20Bar%C3%A3o%20do%20Triunfo%20-%20Brooklin%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1572354768921!5m2!1spt-BR!2sbr"
          width="100%"
          height="450"
          frameborder="0"
          style="border: 0"
          allowfullscreen=""
        ></iframe>
      </q-expansion-item>
    </div>
    <div class="col-4"></div>
  </div>

  <!--  <div class="map">
    				<ul class="adress">

    					<li class="toggle-map form-group">
    						<a role="button" data-toggle="collapse" href="#toggleMap" aria-expanded="false" aria-controls="collapseExample">
    							<i class="fa fa-map-marker" aria-hidden="true"></i>
    						</a>
    					</li>
    				</ul>
    				<div class="collapse" id="toggleMap">
  						<div class="well">
    						<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3655.571493761993!2d-46.68115388558403!3d-23.61969606963295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce50a2bfd0d0bf%3A0xbf5928fdcfe948c6!2sR.%20Bar%C3%A3o%20do%20Triunfo%20-%20Brooklin%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1572354768921!5m2!1spt-BR!2sbr" width="100%" height="450" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
  						</div>
					</div>
    			</div> -->

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Público Estimado: {{ event?.estimatedAudience }}</p>
    <p class="col-8">Investimento: $R {{ event?.invest }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Nome Produtor: {{ event?.producerName }}</p>
    <p class="col-8">Tel. Produtor: {{ event?.producerPhone }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p>E-mail do produtor: {{ event?.producerEmail }}</p>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <p class="col-4">Naming ou Proprietário?:</p>
    <p class="col-8">{{ event?.carriedOutBy }}</p>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Contratação com o Poder Público?*</div>
    <div class="col-4"><q-toggle v-model="r1" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          (a) O evento é contratado diretamente com o Poder Público ou com um
          intermediário seu, sendo este uma agência ou produtora de eventos
          licitada, via de regra. (Ex.: Eventos de Prefeituras, Aniversário da
          Cidade, Carnaval, Festas de São João etc.). (b) O evento é patrocinado
          mediante o uso de verba de incentivo fiscal cultural ou esportivo
          (Ex.: Maratonas, Festas Juninas, Oktoberfest, Conexão Skol). (c)
          Eventos realizados em espaços públicos (ex.: Parques, Praças, Ruas,
          Avenidas, Parques de Exposições Municipais ou Estaduais, Praias etc.).
          (d) Eventos realizados em espaços tombados a nível municipal, estadual
          ou federal. (ex.: Farol da Barra, em Salvador; Cinemateca, em São
          Paulo; Morro da Urca, no Rio de Janeiro etc.)
        </q-tooltip>
      </q-icon>
    </div>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Evento realizado em espaço público?</div>
    <div class="col-4"><q-toggle v-model="r2" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          (a) O evento é contratado diretamente com o poder Público ou com um
          intermediário seu, sendo este uma agência ou produtora de eventos
          licitada, via de regra. (Ex.: Eventos de Prefeituras, Aniversário da
          Cidade, Carnaval, Festas de São João etc.). (b) O evento é patrocinado
          mediante o uso de verba de incentivo fiscal cultural ou esportivo
          (Ex.: Maratonas, Festas Juninas, Oktoberfest, Conexão Skol). (c)
          Eventos realizados em espaços públicos (ex.: Parques, Praças, Ruas,
          Avenidas, Parques de Exposições Municipais ou Estaduais, Praias etc.).
          (d) Eventos realizados em espaços tombados a nível municipal, estadual
          ou federal. (Ex. Farol da Barra, em Salvador; Cinemateca, em São
          Paulo; Morro da Urca, no Rio de Janeiro etc.)
        </q-tooltip>
      </q-icon>
    </div>
  </div>

  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Eventos com menores de idade?</div>
    <div class="col-4"><q-toggle v-model="r3" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          O evento permite a entrada e a participação de crianças e adolescentes
          menores de 18 anos de idade.
        </q-tooltip>
      </q-icon>
    </div>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Ativação de risco?</div>
    <div class="col-4"><q-toggle v-model="r4" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          O evento possui alguma atração que exponha a risco elevado algum dos
          seus participantes ou funcionários próprios ou terceiros. Ex.:
          Montanha Russa, tirolesa, plataforma elevatória (mirante), etc).
        </q-tooltip>
      </q-icon>
    </div>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Ativação de marca em estrutura montada?</div>
    <div class="col-4"><q-toggle v-model="r5" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          Há exposição das marcas da companhia na estrutura de palco ou de
          camarote plotado no evento.
        </q-tooltip>
      </q-icon>
    </div>
  </div>
  <div class="q-ml-xl row items-start" style="margin-left: 300px">
    <div class="text-h6 col-4">Universitário Open Bar?</div>
    <div class="col-4"><q-toggle v-model="r6" disable /></div>
    <div class="col-4">
      <q-icon size="xs" name="help" color="negative">
        <q-tooltip anchor="center right" self="top right">
          A CIA. Não patrocina este tipo de evento em razão de compromisso
          firmado em prol do consumo responsável no âmbito da associação
          nacional das cervejarias
        </q-tooltip>
      </q-icon>
    </div>
  </div>

  <br />
</template>

<script lang="ts">
import { Event } from 'components/models';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { api } from 'boot/axios';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const route = useRoute();

    const event = ref<Event>();
    const $q = useQuasar();
    const r1 = ref(false);
    const r2 = ref(false);
    const r3 = ref(false);
    const r4 = ref(false);
    const r5 = ref(false);
    const r6 = ref(false);
    async function loadEvent() {
      const id = route.params.id;
      //console.log("id", id);
      api
        .get('/api/Event/GetById/' + id)
        .then((response) => {
          event.value = response.data.result;
          //console.log('event', event.value);
          if (event.value != undefined) {
            r1.value = event.value.contractedGovernment;
            r2.value = event.value.madePublicSpace;
            r3.value = event.value.madewithMinors;
            r4.value = event.value.riskActivation;
            r5.value = event.value.brandActivation;
            r6.value = event.value.universityOpenBar;
            //console.log("add",event.value.adress);
          }
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao carregar evento',
            icon: 'report_problem',
          });
        });
    }

    onMounted(async () => {
      await loadEvent();
    });

    return {
      event,
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
    };
  },
});
</script>

<style lang="css" scoped>
.header-index {
  background: url('../assets/images/back-login.jpg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  /*padding: 30px 0;*/
  border-radius: 0 0 30px 30px;
}
p {
  color: 'blue-gray-13';
}
</style>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 300px
  border-right-style: solid
  border-right-width: 7px

.text-h6
  color: $orange

#aprovado_sq
  color: $aprovado
p
  color: $grey-7
  font-size: 16px
  font-weight: bold

#reprovado_sq
  color: $reprovado

#pendente_sq
  color: $pendente
</style>
