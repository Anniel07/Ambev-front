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
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-11">
            <q-select
              v-model="brandMod"
              :options="brands"
              label="Selecione uma Marca*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
          <div class="col-1">
            <q-btn icon="add" color="primary" @click="prompt" />
          </div>
        </div>
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
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-6">
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
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                        />
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
                      v-model="startDate"
                      mask="DD-MM-YYYY HH:mm"
                      format24h
                    >
                      <div class="row items-center justify-end">
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <div class="col-6">
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
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                        />
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
                        <q-btn
                          v-close-popup
                          label="Fechar"
                          color="primary"
                          flat
                        />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>
      </div>

      <div class="col-3"></div>
    </div>

    <div class="q-ml-xl row items-start">
      <div class="col-3"></div>
      <div class="col-6">
        <div class="row q-col-gutter-lg">
          <div class="col-5">
            <q-input
              v-model="cep"
              label="CEP*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
              mask="#####-###"
              fill-mask="_"
              @blur="pesquisacep"
            />
          </div>
          <div class="col-2">
            <q-input v-model="state" label="Estado*" disable />
          </div>
          <div class="col-5">
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
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input
              v-model="estimatedAudience"
              label="Público Estimado*"
              :rules="[(val) => !!val || 'O campo é obrigatório.']"
            />
          </div>
          <div class="col-6">
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
        <div class="row q-col-gutter-lg">
          <div class="col-6">
            <q-input v-model="prodName" label="Produtor" />
          </div>
          <div class="col-6">
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
                {{ contratPoderPublico }}
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
                {{ espacioPublico }}
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
                {{ menorIdade }}
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
                {{ actRisco }}
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
                {{ marcaEst }}
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
                {{ universitario }}
              </q-tooltip>
            </q-icon>
          </div>
        </div>
        <div class="col-3"></div>
      </div>
    </div>

    <div class="row items-center justify-center q-gutter-xl">
      <q-btn
        no-caps
        color="primary"
        icon="upload"
        label="Upload"
        unelevated
        rounded
        @click="showModal = true"
      />
      <q-btn
        no-caps
        color="primary"
        icon="check"
        label="Salvar"
        type="submit"
        unelevated
        rounded
      />
    </div>
    <!-- put inside q-form -->
    <!-- upload files -->
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
              width="800"
              height="700"
            ></iframe>
          </div>
        </q-card-section>

        <q-card-actions v-show="!isFileShowed" align="center">
          <q-btn
            no-caps
            label="Upload"
            flat
            color="primary"
            @click="upload6File"
          />
          <q-btn no-caps label="Fechar" flat color="primary" v-close-popup />
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
                  style="margin-top: 0px; width: 100%"
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
            no-caps
            label="Upload"
            flat
            color="primary"
            @click="uploadEmailFile"
            v-close-popup
          />
          <q-btn
            no-caps
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
import { Select, DocEvt, DropDownInfo } from 'components/models';
import { useQuasar } from 'quasar';
import { api, axios, baseUrl } from 'src/boot/axios';
import { date } from 'quasar';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { defineComponent, onMounted, ref, watch } from 'vue';
import {
  actRisco,
  contratPoderPublico,
  espacioPublico,
  marcaEst,
  menorIdade,
  ptLocale,
  showAlert,
  universitario,
} from 'src/boot/util';
import { callGetApi, callPostApi } from 'src/utils/MsGraphApiCall';
import { useMsalAuthentication } from 'src/composition-api/useMsalAuthentication';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/authConfig';

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const { result, acquireToken } = useMsalAuthentication(
      InteractionType.Redirect,
      loginRequest
    );

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
    const docEmail = ref(null);
    const showEmailModal = ref(false);
    const docEvts = ref<DocEvt[]>();

    const srcFile = ref('');
    const isFileShowed = ref(false); //para mostrar ocultar area archivos

    const $q = useQuasar();

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
        showAlert('CEP não encontrado.');
      }
    }

    const pesquisacep = () => {
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
          showAlert('Formato de CEP inválido.');
        }
      } //end if.
      else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
      }
    };

    async function loadPropietarios() {
      try {
        if (!result.value) return;
        const apiResult = await callGetApi(
          result.value.accessToken,
          '/api/Enum/GetEventMakersDropdownItems'
        );

        if (!apiResult.data) throw apiResult;

        //const resp = await api.get('/api/Enum/GetEventMakersDropdownItems');
        namProp.value = apiResult.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }
    async function loadUnits() {
      try {
        if (!result.value) return;
        const apiResult = await callGetApi(
          result.value.accessToken,
          'api/Enum/GetUnitsDropdownItems'
        );

        if (!apiResult.data) throw apiResult;

        //const resp = await api.get('api/Enum/GetUnitsDropdownItems');
        units.value = apiResult.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar unidades: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }

    async function loadBrands() {
      try {
        if (!result.value) return;
        const apiResult = await callGetApi(
          result.value.accessToken,
          '/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name'
        );

        if (!apiResult.data) throw apiResult;
        // const resp = await api.get(
        //   '/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name'
        // );

        brands.value = apiResult.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar marcas: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }
    //add a new brand
    async function submitBrand(data: string) {
      try {
        if (!result.value) return;
        const apiResult = await callPostApi(
          result.value.accessToken,
          '/api/Brand/Add',
          { name: data }
        );
        if (!apiResult.data) throw apiResult;
        //const resp = await api.post('/api/Brand/Add', { name: data });
        await loadBrands();
        const id = apiResult.data.result.id;
        brandMod.value = brands.value?.filter((b) => b.value === id)[0];
      } catch (err: any) {
        showAlert(
          `Falha ao adicionar nova marca: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
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

    async function submitForm() {
      //console.log('formState', 1);
      const data = {
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
          namPropMod.value != undefined ? +namPropMod.value.value : 0,
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
      };
      try {
        if (!result.value) return;
        const apiResult = await callPostApi(
          result.value.accessToken,
          '/api/Event/Add',
          data
        );
        // if(!apiResult.data)
        //   throw apiResult;
        //await api.post('/api/Event/Add', data);
        //clear data
        unitMod.value = undefined;
        brandMod.value = undefined;
        (eventName.value = ''),
          (startDate.value = ''),
          (endDate.value = ''),
          (state.value = ''),
          (city.value = ''),
          (cep.value = ''),
          (address.value = ''),
          (estimatedAudience.value = ''),
          (investEvent.value = ''),
          (prodName.value = ''),
          (prodTel.value = ''),
          (email.value = ''),
          (namPropMod.value = undefined),
          (r1.value = false),
          (r2.value = false),
          (r3.value = false),
          (r4.value = false),
          (r5.value = false),
          (r6.value = false),
          // ValidationEmailArchiveId= null, // parseInt($("#ValidationEmailArchiveId").val()),
          docEvts.value?.forEach((de) => (de.docId = null));
        //end clear data
        showAlert('Evento adicionado com sucesso', true);
      } catch (err: any) {
        showAlert(
          `Falha ao adicionar evento: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }
    async function uploadFile(de: DocEvt) {
      const file = de.file;
      if (file != undefined && file.name != '') {
        //console.log("file",JSON.stringify(file), typeof file);
        var formData = new FormData();
        formData.append('archive', file);
        formData.append('category', de.category);
        try {
          if (!result.value) return;
          const apiResult = await callPostApi(
            result.value.accessToken,
            '/api/Archive/UploadArchive', formData
          );
          if (!apiResult.data) throw apiResult;
          //const resp = await api.post('/api/Archive/UploadArchive', formData);
          showAlert('Arquivo enviado com sucesso.', true);
          de.color = 'orange';
          de.disabled = false;
          de.src = baseUrl + '/api/Archive/Show/' + apiResult.data.result;
          de.docId = parseInt(apiResult.data.result);
          //console.log("src", de.src);
        } catch (err: any) {
          showAlert(
            `Falha ao upload arquive: ${err.response?.data.errorMessage ?? err}`
          );
        }
      }
    }
    // subir los 6 documentos cuando se abre modal en Upload
    async function upload6File() {
      const len =
        docEvts.value?.length != undefined ? docEvts.value?.length - 1 : 0;
      for (let i = 0; i < len; i++) {
        if (docEvts.value != undefined) await uploadFile(docEvts.value[i]);
      }
    }

    async function uploadEmailFile() {
      const last =
        docEvts.value?.length != undefined ? docEvts.value?.length - 1 : 0;

      if (docEvts.value != undefined) {
        //console.log(docEvts.value[last].file.name);
        if(docEvts.value[last].file.name !== '')
          await uploadFile(docEvts.value[last]);
        else
          r1.value = false;
      }
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

    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        /*const apiResult = await callGetApi(
          result.value.accessToken,
          `/api/Event/GetById/${route.params.id}`
        ).catch(() => acquireToken());*/
        await loadUnits();
        await loadBrands();
        await loadPropietarios();
      }
    }
    updateData();

    watch(result, () => {
      // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
      updateData();
    });

    onMounted(async () => {
      fillDocEvt();

      //console.log("Evts" , docEvts.value);
    });
    return {
      units,
      unitMod,
      brands,
      brandMod,
      eventName,
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
      docEmail,
      upload6File,
      isFileShowed,
      showFileArea,
      docEvts,
      showEmailModal,
      uploadEmailFile,
      handleShowEmailMod,
      contratPoderPublico,
      espacioPublico,
      menorIdade,
      actRisco,
      marcaEst,
      universitario,
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


