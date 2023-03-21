<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Relatório de Auditoria
    </h5>
  </div>
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4">
      <q-select
        v-model="filterMod"
        :options="filters"
        label="Selecione um filtro*"
        @update:model-value="changeFilter"
      />
      <!-- :rules="[(val) => !!val || 'O campo é obrigatório.']" -->
    </div>
    <div class="col-4"></div>
  </div>
  <div
    v-show="filterMod != undefined && filterMod.value === sPeriodo"
    class="row"
  >
    <div class="col-4"></div>
    <div class="col-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-input v-model="startDate" label="Data e hora do Início do Evento*">
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
                    @update:model-value="changeStartDate"
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
                  <q-time v-model="startDate" mask="DD-MM-YYYY HH:mm" format24h>
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
          <q-input v-model="endDate" label="Data e hora do Fim do Evento*">
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
                    @update:model-value="changeEndDate"
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

    <div class="col-4"></div>
  </div>
  <div
    v-show="filterMod != undefined && filterMod.value === sBrand"
    class="row"
  >
    <div class="col-4"></div>
    <div class="col-4">
      <q-select
        v-model="brandMod"
        :options="brands"
        label="Selecione uma Marca*"
        @update:model-value="changeBrand"
      />
    </div>
    <div class="col-4"></div>
  </div>
  <div
    v-show="filterMod != undefined && filterMod.value === sRegion"
    class="row"
  >
    <div class="col-4"></div>
    <div class="col-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-select
            v-model="regionMod"
            :options="regions"
            label="Selecione uma região*"
            @update:model-value="loadStatesByRegion"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="stateMod"
            :options="states"
            label="Selecione um estado*"
            :disable="regionMod == undefined"
            @update:model-value="loadCitiesByState"
          />
        </div>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
  <div
    v-show="filterMod != undefined && filterMod.value === sRegion"
    class="row"
  >
    <div class="col-4"></div>
    <div class="col-4">
      <div class="row q-col-gutter-lg">
        <div class="col-6">
          <q-select
            v-model="municipioMod"
            :options="municipios"
            label="Selecione um município*"
            :disable="stateMod == undefined"
            @update:model-value="doRegionalFilter"
          />
        </div>
        <div class="col-6">
          <q-select
            v-model="unitMod"
            :options="units"
            label="Selecione uma Unidade*"
            @update:model-value="doRegionalFilter"
          />
        </div>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
  <br />
  <ChartOneCol
    :key="componentKey"
    :graficoOneCol="graficoOneCol"
    v-show="filterMod != undefined && filterMod.value <= 2"
  ></ChartOneCol>
  <ChartThreeCol
    :key="componentKey3"
    :graficoThreeCol="graficoThreeCol"
    v-show="filterMod != undefined && filterMod.value > 2"
  ></ChartThreeCol>
</template>

<script lang="ts">
import {
  Select,
  DropDownInfo,
  DropDownInfo2,
  GraficoRelatorio,
  FilterGrafico,
} from 'components/models';
import { api } from 'src/boot/axios';
import { ptLocale, showAlert } from 'src/boot/util';
//import ExampleComponent from 'components/ExampleComponent.vue';
import {
  defineComponent,
  defineAsyncComponent,
  onMounted,
  ref,
  watch,
} from 'vue';

import { callGetApi } from 'src/utils/MsGraphApiCall';
import { useMsalAuthentication } from 'src/composition-api/useMsalAuthentication';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/authConfig';

const ChartOneCol = defineAsyncComponent(
  () => import('components/charts/ChartOneCol.vue')
);
const ChartThreeCol = defineAsyncComponent(
  () => import('components/charts/ChartThreeCol.vue')
);

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
    ChartOneCol,
    ChartThreeCol,
  },
  setup() {
    const { result, acquireToken } = useMsalAuthentication(
      InteractionType.Redirect,
      loginRequest
    );
    const filters = ref<Select[]>();
    const filterMod = ref<Select>();
    const startDate = ref('');
    const endDate = ref('');
    const brands = ref<Select[]>();
    const brandMod = ref<Select>();

    const regions = ref<Select[]>();
    const regionMod = ref<Select>();

    const states = ref<Select[]>();
    const stateMod = ref<Select>();

    const municipios = ref<Select[]>();
    const municipioMod = ref<Select>();

    const units = ref<Select[]>();
    const unitMod = ref<Select>();

    //const colorOneCol = ref('#00ff00');
    //const captionOneCol = ref('HH');
    const colors = ['#21BA45', '#C10015', '#F2C037'];
    const captions = ['Aprovado', 'Reprovado', 'Expirados'];

    const data = ref<FilterGrafico>({
      filter: 0,
      unit: 0,
      state: 0,
      city: '',
      startDate: '',
      endDate: '',
      brandId: 0,
    });

    const graficoOneCol = ref<GraficoRelatorio>({
      data: data.value,
      color: '#21BA45',
      caption: 'Aprovado',
    });
    const componentKey = ref(0); //for update graphic one col

    const graficoThreeCol = ref<GraficoRelatorio>({
      data: data.value,
      color: '',
      caption: '',
    });
    const componentKey3 = ref(0); //for update graphic three cols

    async function loadFilters() {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, '/api/Enum/GetFilterEnventsDropdownItems');

        if(!apiResult.data)
          throw apiResult;
        //const resp = await api.get('/api/Enum/GetFilterEnventsDropdownItems');
        filters.value = apiResult.data.result.map((info: DropDownInfo) => {
          return { label: info.text, value: parseInt(info.value) };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar filtros: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }
    async function loadBrands() {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, '/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name');

        if(!apiResult.data)
          throw apiResult;
        /* const resp = await api.get(
          '/api/Brand/GetDropdownItems?fieldNameValue=id&fieldNameText=name'
        ); */

        brands.value = apiResult.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar marcas: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    async function loadRegions() {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, '/api/RegionStateCity/GetRegions');

        if(!apiResult.data)
          throw apiResult;
        //const resp = await api.get('/api/RegionStateCity/GetRegions');
        regions.value = apiResult.data.map((info: DropDownInfo2) => {
          return { label: info.name, value: info.id };
        });
      } catch (err: any) {
        showAlert(
          `Falha ao carregar regiões: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    async function loadStatesByRegion(val: Select) {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken,  `/api/RegionStateCity/GetSatesPerRegions?regionID=${val.value}`);

        if(!apiResult.data)
          throw apiResult;
        // const resp = await api.get(
        //   `/api/RegionStateCity/GetSatesPerRegions?regionID=${val.value}`
        // );
        states.value = apiResult.data.map((info: DropDownInfo2) => {
          return { label: info.name, value: info.id };
        });
        //console.log(filters.value);
        //deselect stte and municipio
        stateMod.value = undefined;
        municipioMod.value = undefined;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar estados: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    async function loadCitiesByState(val: Select) {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken,  `/api/RegionStateCity/GetCitiesPerState?stateID=${val.value}`);

        if(!apiResult.data)
          throw apiResult;
        /* const resp = await api.get(
          `/api/RegionStateCity/GetCitiesPerState?stateID=${val.value}`
        ); */
        municipios.value = apiResult.data.map((info: DropDownInfo2) => {
          return { label: info.name, value: info.id };
        });
        //console.log(filters.value);
        municipioMod.value = undefined;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar municípios: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }

    const changeStartDate = (value: any, reason: any, details: any) => {
      //console.log(value);
      //date.value = value;
      graficoOneCol.value.data.startDate = value;
      componentKey3.value++;
    };
    const changeEndDate = (value: any, reason: any, details: any) => {
      //console.log(value);
      //date.value = value;
      graficoOneCol.value.data.endDate = value;
      componentKey3.value++;
    };

    function changeBrand(val: Select) {
      data.value.brandId = val.value;
      componentKey3.value++;
    }

    function doRegionalFilter(val: Select) {
      //console.log("text", stateMod.value?.value ?? 0);
      data.value.state =
        stateMod.value != undefined ? stateMod.value?.value : 0;
      data.value.city =
        municipioMod.value != undefined ? municipioMod.value?.label : '';
      data.value.unit = unitMod.value != undefined ? +unitMod.value?.value : -1; //-1 means filter toda en caso q no este definido

      if (stateMod.value != undefined && municipioMod.value != undefined) {
        //filtrar solo cuando municipio y estado este definido
        componentKey3.value++;
      }
    }

    function changeFilter(val: Select) {
      //alert(val.value);
      if (val.value < 3) {
        //show graphic one column
        graficoOneCol.value.color = colors[val.value];
        graficoOneCol.value.caption = captions[val.value];
        data.value.filter = val.value;
        componentKey.value++;
      } else {
        //show graphic three column
        data.value.filter = val.value;
        if (val.value === 3) {
          data.value.startDate = startDate.value;
          data.value.endDate = endDate.value;
        } else if (val.value === 4) {
          data.value.brandId =
            brandMod.value != undefined ? brandMod.value.value : 0;
        } else if (val.value === 6) {
          //regional
          //clear region, state, city and units
          regionMod.value = undefined;
          stateMod.value = undefined;
          municipioMod.value = undefined;
          unitMod.value = undefined;
          data.value.state = -1; //pro primera vez no mostrar resultados
        }
        //if(val.value !== 6)
        //return;
        componentKey3.value++;
      }
    }

    async function loadUnits() {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken,  'api/Enum/GetUnitsDropdownItems');

        if(!apiResult.data)
          throw apiResult;
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

    /*     onMounted(async () => {
      await loadFilters();
      await loadBrands();
      await loadRegions();
      await loadUnits();
    }); */

    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        // let apiResult = await callGetApi(result.value.accessToken, '/api/Enum/GetUnitsDropdownItems').catch(() =>
        //   acquireToken()
        // );
        await loadFilters();
        await loadBrands();
        await loadRegions();
        await loadUnits();
      }
    }

    updateData();

    watch(result, () => {
      // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
      updateData();
    });

    return {
      filters,
      filterMod,
      startDate,
      endDate,
      brands,
      brandMod,
      regions,
      regionMod,
      states,
      stateMod,
      municipios,
      municipioMod,
      units,
      unitMod,
      ptLocale,
      sBrand: ref(4),
      sPeriodo: ref(3),
      sRegion: ref(6),
      loadStatesByRegion,
      loadCitiesByState,
      //dataFilter,
      //colorOneCol,
      //captionOneCol,
      graficoOneCol,
      graficoThreeCol,
      changeFilter,
      componentKey,
      componentKey3,
      changeStartDate,
      changeEndDate,
      changeBrand,
      doRegionalFilter,
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
