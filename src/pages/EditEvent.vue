<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Cadastro de Eventos
    </h5>
  </div>
  <q-form @submit="submitForm">
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <q-select
          v-model="unitMod"
          :options="units"
          label="Selecione uma Unidade*"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
        />
      </div>
      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6 row items-center">
        <q-select
          v-model="brandMod"
          :options="brands"
          label="Selecione uma Marca*"
          style="width: 90%"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
        />
        <q-space />
        <q-btn icon="add" color="primary" @click="prompt" />
      </div>
      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <q-input
          v-model="eventName"
          label="Nome do evento*"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
        />
      </div>
      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-3">
        <q-input
          v-model="startDate"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
          label="Data e hora do Início do Evento*"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="startDate"
                  mask="DD-MM-YYYY HH:mm"
                  :locale="ptLocale"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time v-model="startDate" mask="DD-MM-YYYY HH:mm" format24h>
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-3 q-ml-md">
        <q-input
          v-model="endDate"
          :rules="[
            (val) => !!val || 'O campo é obrigatório.',
            (val) =>
              validEndDate() ||
              'A data final deve ser maior ou igual à data inicial.',
          ]"
          label="Data e hora do Fim do Evento*"
        >
          <template v-slot:prepend>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date
                  v-model="endDate"
                  mask="DD-MM-YYYY HH:mm"
                  :locale="ptLocale"
                  :rules="[(val) => !!val || 'O campo é obrigatório.']"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-date>
              </q-popup-proxy>
            </q-icon>
          </template>

          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-time
                  v-model="endDate"
                  mask="DD-MM-YYYY HH:mm"
                  format24h
                  :rules="[(val) => !!val || 'O campo é obrigatório.']"
                >
                  <div class="row items-center justify-end">
                    <q-btn v-close-popup label="Fechar" color="primary" flat />
                  </div>
                </q-time>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-4">
            <q-input
              v-model="cep"
              label="CEP*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
              mask="#####-###"
              fill-mask="_"
              @blur="pesquisacep"
            />
          </div>
          <div class="col-3 q-ml-lg">
            <q-input v-model="state" label="Estado*" disable />
          </div>
          <div class="col-4 q-ml-lg">
            <q-input v-model="city" label="Cidade*" disable />
          </div>
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <q-expansion-item
          expand-separator
          icon="pin_drop"
          header-class="text-orange"
          label="Endereço*"
          default-opened
        >
          <q-input
            v-model="address"
            label="Endereço*"
            :rules="[(val) => !!val || 'O campo é obrigatório.']"
          />
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
      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-5">
            <q-input
              v-model="estimatedAudience"
              label="Público Estimado*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
          <div class="col-5 q-ml-xl">
            <q-input
              v-model="investEvent"
              label="Investimento*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-5">
            <q-input v-model="prodName" label="Produtor" />
          </div>
          <div class="col-5 q-ml-xl">
            <q-input v-model="prodTel" label="Tel. Produtor" />
          </div>
        </div>
      </div>

      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <q-input v-model="email" label="E-mail do produtor" type="email" />
      </div>

      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <q-select
          v-model="namPropMod"
          :options="namProp"
          label="Naming ou Proprietário?*"
          :rules="[(val) => !!val || 'O campo é obrigatório.']"
        />
      </div>
      <div class="col-3"></div>
    </div>
    <br />
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">
            <div class="row">Contratação com o Poder Público?*</div>
            <div class="row">
              <p class="text-caption">
                Crique
                <a
                  href="http://compliancechannel.la.interbrew.net/"
                  target="_blank"
                  >aqui</a
                >
                e registre um chamado no canal de compliance
              </p>
            </div>
          </div>
          <div class="col-2">
            <q-toggle v-model="r1" @click="handleShowEmailMod" />
          </div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                (a) O evento é contratado diretamente com o Poder Público ou com
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
                Paulo; Morro da Urca, no Rio de Janeiro etc.)
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>

      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">Evento realizado em espaço público?</div>
          <div class="col-2"><q-toggle v-model="r2" /></div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                (a) O evento é contratado diretamente com o poder Público ou com
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
                Paulo; Morro da Urca, no Rio de Janeiro etc.)
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">Eventos com menores de idade?</div>
          <div class="col-2"><q-toggle v-model="r3" /></div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                O evento permite a entrada e a participação de crianças e
                adolescentes menores de 18 anos de idade.
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">Ativação de risco?</div>
          <div class="col-2"><q-toggle v-model="r4" /></div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                O evento possui alguma atração que exponha a risco elevado algum
                dos seus participantes ou funcionários próprios ou terceiros.
                Ex.: Montanha Russa, tirolesa, plataforma elevatória (mirante),
                etc).
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">Ativação de marca em estrutura montada?</div>
          <div class="col-2"><q-toggle v-model="r5" /></div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                Há exposição das marcas da companhia na estrutura de palco ou de
                camarote plotado no evento.
              </q-tooltip>
            </q-icon>
          </div>
        </div>
      </div>
      <div class="col-3"></div>
    </div>
    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row">
          <div class="col-8">Universitário Open Bar?</div>
          <div class="col-2"><q-toggle v-model="r6" /></div>
          <div class="col-2 column items-end">
            <q-icon size="xs" name="help" color="negative">
              <q-tooltip anchor="center right" self="top right">
                A CIA. Não patrocina este tipo de evento em razão de compromisso
                firmado em prol do consumo responsável no âmbito da associação
                nacional das cervejarias
              </q-tooltip>
            </q-icon>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>
    <div class="row items-center justify-center q-gutter-xl">
      <q-btn
        color="primary"
        icon="upload"
        label="Upload"
        unelevated
        rounded
        @click="showModal = true"
      />
      <q-btn
        color="primary"
        icon="check"
        label="Salvar"
        type="submit"
        unelevated
        rounded
      />
    </div>
    <!-- put inside q-form -->
    <q-dialog v-model="showModal">
      <q-card style="width: 800px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Upload de arquivos</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div v-show="!isFileShowed">
            <div
              class="row"
              v-for="docEvt in docEvts"
              :key="docEvt.category"
              style="margin-bottom: 25px"
            >
              <div v-if="docEvt.category != '0'" class="col-5">
                <q-btn
                  no-caps
                  class="csWidth"
                  :label="docEvt.label"
                  filled
                  rounded
                  color="primary"
                />
              </div>
              <div v-if="docEvt.category != '0'" class="col-7 row items-center">
                <q-btn
                  icon="description"
                  no-caps
                  flat
                  rounded
                  :color="docEvt.color"
                  :disable="docEvt.disabled"
                  @click="showFileArea(true, docEvt.src)"
                ></q-btn>

                <q-file
                  color="primary"
                  style="margin-top: -10px; width: 80%"
                  v-model="docEvt.file"
                  label="Arquivo"
                  accept=".pdf, .png"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
          </div>
          <div v-show="isFileShowed">
            <q-btn
              flat
              color="primary"
              @click="showFileArea(false)"
              icon="close"
            />

            <iframe
              :src="srcFile"
              allow="fullscreen"
              width="850"
              height="700"
            ></iframe>
          </div>
        </q-card-section>

        <q-card-actions v-show="!isFileShowed" align="center">
          <q-btn label="Upload" flat color="primary" @click="upload6File" />
          <q-btn label="Fechar" flat color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-dialog v-model="showEmailModal">
      <q-card style="width: 800px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Upload de e-mail de validação de evento</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div>
            <div class="row" style="margin-bottom: 15px">
              <div class="col-12 row items-center">
                <q-file
                  color="primary"
                  style="margin-top: -20px; width: 100%"
                  label="Arquivos pdf; .png;"
                  accept=".pdf, .png"
                  v-model="docEvts[docEvts.length - 1].file"
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions v-show="!isFileShowed" align="center">
          <q-btn
            label="Upload"
            flat
            color="primary"
            @click="uploadEmailFile"
            v-close-popup
          />
          <q-btn
            label="Fechar"
            flat
            color="primary"
            @click="r1 = false"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-form>
  <br />
</template>

<script lang="ts">
import { Select, Unit, Brand, DocEvt } from 'components/models';
import { useQuasar } from 'quasar';
import { api, axios, baseUrl } from 'src/boot/axios';
import { date } from 'quasar';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ptLocale } from 'src/boot/util';

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const units = ref<Select[]>();
    const unitMod = ref<Select>();
    const brands = ref<Select[]>();
    const brandMod = ref<Select>();
    const eventName = ref('');
    const startDate = ref('');
    const endDate = ref('');
    const cep = ref('');
    const state = ref('');
    const city = ref('');
    const estimatedAudience = ref('');
    const investEvent = ref('');
    const prodName = ref('');
    const prodTel = ref('');
    const email = ref('');
    const namProp = ref<Select[]>();
    const namPropMod = ref<Select>();
    const r1 = ref(false);
    const r2 = ref(false);
    const r3 = ref(false);
    const r4 = ref(false);
    const r5 = ref(false);
    const r6 = ref(false);
    const address = ref('');
    //const docEmail = ref(null);
    const showEmailModal = ref(false);
    const docEvts = ref<DocEvt[]>();

    const srcFile = ref('');
    const isFileShowed = ref(false); //para mostrar ocultar area archivos
    const complianceAreaAuthorizationId = ref(null);
    const $q = useQuasar();
    const route = useRoute();
    /* const isValidEmailx = (): boolean => {

      const emailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const res = emailPattern.test(email.value);
      //console.log('pEmail', res);
      return email.value !=='' && res;
    }; */
    const validEndDate = (): boolean => {
      const exp =
        date.extractDate(startDate.value, 'DD-MM-YYYY').getTime() <=
        date.extractDate(endDate.value, 'DD-MM-YYYY').getTime();
      /*
      console.log(
        date.extractDate(startDate.value, 'DD-MM-YYYY').getTime(),
        date.extractDate(endDate.value, 'DD-MM-YYYY').getTime()
      );*/
      return startDate.value !== '' && exp;
    };

    function limpa_formulário_cep() {
      //Limpa valores do formulário de cep.
      state.value = '';
      city.value = '';
    }

    function meu_callback(conteudo: any) {
      if (!('erro' in conteudo)) {
        //Atualiza os campos com os valores.
        city.value = conteudo.localidade;
        state.value = conteudo.uf;
      } //end if.
      else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        $q.notify({
          color: 'negative',
          position: 'top',
          message: 'CEP não encontrado.',
          icon: 'report_problem',
        });
      }
    }

    const pesquisacep = (val: Event) => {
      //console.log("cep", cep.value);
      //Nova variável "cep" somente com dígitos.
      cep.value = cep.value.replace(/\D/g, '');

      //Verifica se campo cep possui valor informado.
      if (cep.value != '') {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep.value)) {
          //Preenche os campos com "..." enquanto consulta webservice.

          state.value = '...';
          city.value = '...';

          //make request
          axios
            .get('https://viacep.com.br/ws/' + cep.value + '/json')
            .then((response) => {
              //console.log('resp', cep.value);
              meu_callback(response.data);
            });

          //'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
        } //end if.
        else {
          //cep é inválido.
          limpa_formulário_cep();
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Formato de CEP inválido.',
            icon: 'report_problem',
          });
        }
      } //end if.
      else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
      }
    };

    async function loadPropietarios() {
      api
        .get('/api/Enum/GetEventMakersDropdownItems')
        .then((response) => {
          namProp.value = response.data.result.map((o: Unit) => {
            return { label: o.text, value: o.value };
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao carregar',
            icon: 'report_problem',
          });
        });
    }
    async function loadUnits() {
      api
        .get('/api/Enum/GetUnitsDropdownItems')
        .then((response) => {
          units.value = response.data.result.map((o: Unit) => {
            return { label: o.text, value: o.value };
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao carregar unidades',
            icon: 'report_problem',
          });
        });
    }
    async function loadBrands() {
      api
        .get('/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name')
        .then((response) => {
          brands.value = response.data.result.map((o: Brand) => {
            return { label: o.text, value: o.value };
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao carregar marcas',
            icon: 'report_problem',
          });
        });
    }
    async function submitBrand(data: string) {
      //show spinner
      api
        .post('/api/Brand/Add', { name: data })
        .then(async (response) => {
          //console.log("brand ",response);
          await loadBrands();
          //select brand
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao adicionar marca',
            icon: 'report_problem',
          });
        });
      //hide spinner
    }
    function prompt() {
      $q.dialog({
        title: 'Cadastrar Marca',
        message: 'Nome do Marca*',
        ok: 'Cadastrar',
        cancel: {
          label: 'Fechar',
        },
        prompt: {
          model: '',
          isValid: (val) => val.length > 0,
          type: 'text', // optional
        },
        //cancel: true,
        persistent: true,
      })
        .onOk(async (data) => {
          // console.log('>>>> OK, received', data)
          await submitBrand(data);
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    function submitForm(): void {
      //console.log('formState', 1);
      const data = {
        Id: route.params.id,
        Unit: unitMod.value != undefined ? +unitMod.value.value : 0,
        BrandId: brandMod.value?.value,
        Name: eventName.value,
        StartDate: startDate.value,
        EndDate: endDate.value,
        State: state.value,
        City: city.value,
        Cep: cep.value,
        Adress: address.value,
        EstimatedAudience: estimatedAudience.value,
        Invest: investEvent.value,
        ProducerName: prodName.value,
        ProducerPhone: prodTel.value,
        ProducerEmail: email.value,
        CarriedOutBy:
          namPropMod.value != undefined ? +namPropMod.value.value : 0, //.value?.value,
        ContractedGovernment: r1.value,
        MadePublicSpace: r2.value,
        MadewithMinors: r3.value,
        RiskActivation: r4.value,
        BrandActivation: r5.value,
        UniversityOpenBar: r6.value,
        ValidationEmailArchiveId:
          docEvts.value != undefined ? docEvts.value[6].docId : null,
        EventCharterId:
          docEvts.value != undefined ? docEvts.value[0].docId : null,
        FireDepartmentInspectionReportId:
          docEvts.value != undefined ? docEvts.value[1].docId : null,
        CivilFireServiceContractId:
          docEvts.value != undefined ? docEvts.value[2].docId : null,
        MobileContractId:
          docEvts.value != undefined ? docEvts.value[3].docId : null,
        PrivateSecurityContractId:
          docEvts.value != undefined ? docEvts.value[4].docId : null,
        SponsorshipAgreementId:
          docEvts.value != undefined ? docEvts.value[5].docId : null,
        complianceAreaAuthorizationId: complianceAreaAuthorizationId.value,
      };
      //console.log("two", data.EventCharterId);
      api
        .put(`/api/Event/Update/${route.params.id}`, data)
        .then((response) => {
          $q.notify({
            color: 'positive',
            position: 'top',
            message: 'Evento editado com sucesso',
            icon: 'check',
          });
        })
        .catch(() => {
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Falha ao editar evento',
            icon: 'report_problem',
          });
        });
    }
    function uploadFile(de: DocEvt) {
      const file = de.file;
      if (file != undefined && file.name != '') {
        //console.log("file",JSON.stringify(file), typeof file);
        var formData = new FormData();
        formData.append('archive', file);
        formData.append('category', de.category);

        api
          .post('/api/Archive/UploadArchive', formData)
          .then((response) => {
            $q.notify({
              color: 'positive',
              position: 'top',
              message: 'Arquivo enviado com sucesso.',
              icon: 'check',
            });
            de.color = 'orange';
            de.disabled = false;
            de.src = baseUrl + '/api/Archive/Show/' + response.data.result;
            de.docId = parseInt(response.data.result);
            //console.log("one", de.docId);
          })
          .catch((reason) => {
            $q.notify({
              color: 'negative',
              position: 'top',
              message: 'Falha ao upload arquive.',
              icon: 'report_problem',
            });
          });
      }
    }
    // subir los 6 documentos cuando se abre modal en Upload
    function upload6File() {
      const len =
        docEvts.value?.length != undefined ? docEvts.value?.length - 1 : 0;

      for (let i = 0; i < len; i++) {
        if (docEvts.value != undefined) uploadFile(docEvts.value[i]);
      }
    }

    function uploadEmailFile() {
      const last =
        docEvts.value?.length != undefined ? docEvts.value?.length - 1 : 0;
      if (docEvts.value != undefined) uploadFile(docEvts.value[last]);
    }

    const showFileArea = (flag: boolean, src = '') => {
      isFileShowed.value = flag;
      srcFile.value = src;
    };

    const fillDocEvt = () => {
      docEvts.value = [];
      const labels = [
        'Alvará do evento',
        'Auto de Vistoria do Corpo de Bombeiros (AVCB)',
        'Contrato de Bombeiros Civis',
        'Contrato de UTI Móvel',
        'Contrato de Segurança Privada',
        'Contrato de Patrocínio Assinado Pelas Partes',
        '',
      ];
      for (let i = 1; i <= 7; i++) {
        let cat = i === 1 ? '1' : '' + (i + 1);
        if (i === 7) cat = '0';

        docEvts.value?.push({
          color: 'grey',
          disabled: true,
          src: '',
          file: new File([], ''), //ref(null)
          category: cat,
          label: labels[i - 1],
          docId: null,
          status: null,
        });
      }
      //console.log("evtDoc", docEvts.value);
    };

    const handleShowEmailMod = () => {
      if (r1.value) showEmailModal.value = true;
    };

    async function loadEvent() {
      const id = route.params.id;
      //console.log("id", id);
      api
        .get('/api/Event/GetForEdit/' + id)
        .then((response) => {
          //event.value = response.data.result;
          console.log('event', response.data.result);
          const r = response.data.result;
          //fill event data
          unitMod.value =
            units.value != undefined ? units.value.filter(u => u.value == r.unit)[0] : undefined;
          brandMod.value =
            brands.value != undefined ? brands.value.filter(b => b.value == r.brandId)[0] : undefined;
          eventName.value = r.name;
          startDate.value = r.startDate;
          endDate.value = r.endDate;
          state.value = r.state;
          city.value = r.city;
          cep.value = r.cep;
          address.value = r.adress;
          estimatedAudience.value = r.estimatedAudience;
          investEvent.value = r.invest;
          prodName.value = r.producerName;
          prodTel.value = r.producerPhone;
          email.value = r.producerEmail;
          namPropMod.value =
            namProp.value != undefined
              ? namProp.value.filter(n => n.value == r.carriedOutBy)[0]
              : undefined;
          r1.value = r.contractedGovernment;
          r2.value = r.madePublicSpace;
          r3.value = r.madewithMinors;
          r4.value = r.riskActivation;
          r5.value = r.brandActivation;
          r6.value = r.universityOpenBar;

          r.archives.forEach((a: { category: number; id: number }) => {
            if (docEvts.value != undefined) {
              const idx = a.category == 0 ? 6 : a.category == 1 ? 0 : a.category - 2;
              docEvts.value[idx].docId = a.id;
              docEvts.value[idx].color = 'orange';
              docEvts.value[idx].disabled = false;
              docEvts.value[idx].src = baseUrl + '/api/Archive/Show/' + a.id;
            }
          });
          complianceAreaAuthorizationId.value = r.complianceAreaAuthorizationId;
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
      fillDocEvt();

      await loadUnits();
      await loadBrands();
      await loadPropietarios();
      await loadEvent();

      //console.log("Evts" , docEvts.value);
    });
    return {
      units,
      unitMod,
      brands,
      brandMod,
      eventName,
      //date: ref('2019-02-01 12:44'),
      startDate,
      endDate,
      cep,
      state,
      city,
      investEvent,
      estimatedAudience,
      prodName,
      prodTel,
      email,
      namPropMod,
      namProp,
      r1,
      r2,
      r3,
      r4,
      r5,
      r6,
      address,
      ptLocale,
      prompt,
      validEndDate,
      date,
      pesquisacep,
      submitForm,
      //isValidEmailx,
      showModal: ref(false),
      srcFile,

      upload6File,
      isFileShowed,
      showFileArea,
      docEvts,
      showEmailModal,
      uploadEmailFile,
      handleShowEmailMod,
    };
  },
});
</script>

<style lang="scss" scoped>
.header-index {
  background: url('../assets/images/back-login.jpg') center center no-repeat;
  background-size: cover;
  background-attachment: fixed;
  /*padding: 30px 0;*/
  border-radius: 0 0 30px 30px;
}

.csWidth {
  width: 320px;
}
</style>

<style lang="sass" scoped>
.my-card
  width: 100%
  height: 152px
  max-width: 290px
  max-heigth: 152px

h6, h5
  color: $orange
</style>


