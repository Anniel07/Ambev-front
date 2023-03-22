<template>
  <div class="row">
    <div
      class="col-3 column items-center justify-center"
      style="margin-bottom: 20px"
      v-for="cd in graficos"
      :key="cd.stateId"
    >
      <apexchart
        type="bar"
        height="270"
        width="260"
        :options="chartOptions"
        :series="cd.series"
      ></apexchart>
      <p style="font-weight: bold; margin-top: -20px">{{ cd.name }}</p>
      <!-- -->
    </div>
  </div>
</template>


<script lang="ts">
//import { Todo, Meta } from 'components/models';
//import ExampleComponent from 'components/ExampleComponent.vue';
import { api } from 'src/boot/axios';
import { showAlert } from 'src/boot/util';
import { ChartData, Grafico, GraficoRelatorio } from '../models';

import { useMsalAuthentication } from 'src/composition-api/useMsalAuthentication';
import { callGetApi, callPostApi } from 'src/utils/MsGraphApiCall';
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/authConfig';

export default defineComponent({
  name: 'FarolChart',
  components: {
    /*ExampleComponent*/
  },
  props: {
    graficoThreeCol: {
      type: Object as PropType<GraficoRelatorio>,
      required: true,
    },
  },
  setup(props) {
    const { result, acquireToken } = useMsalAuthentication(
      InteractionType.Redirect,
      loginRequest
    );
    //console.log("props", props);
    const chartDatas = ref<Array<ChartData>>([]);
    const graficos = ref<Array<Grafico>>([]);

    async function loadGraficos(apiResult: any) {
      try {
        /* const resp = await api.post<ChartData[]>(
          '/api/Event/GetEventsInfo',
          props.graficoThreeCol.data
        ); */
        if (!apiResult.data) throw apiResult;
        chartDatas.value = apiResult.data;
        //console.log(props.graficoThreeCol.data.filter);
        chartDatas.value.forEach((cd) => {
          const porcientos = [];
          porcientos.push(
            cd.approvedPercent,
            cd.pendentPercent,
            cd.rejectPercent
          );

          graficos.value.push({
            series: [{ name: 'Eventos', data: porcientos }],
            name: cd.name,
          });
        });
      } catch (err: any) {
        showAlert(
          `não foi possível exibir gráficos: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }

    /* onMounted(async () => {
      await loadGraficos();
    }); */
    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        const temp = props.graficoThreeCol.data;
        //console.log(temp.filter,temp.city,  temp.state); //no hacer peticion cuando es regional hasta defnir todos los campos
        if (
          temp.filter === 6 &&
          (temp.city == undefined ||
            temp.city == '' ||
            temp.state == undefined ||
            temp.state < 0)
        )
          return;
        const apiResult = await callPostApi(
          result.value.accessToken,
          '/api/Event/GetEventsInfo',
          props.graficoThreeCol.data
        ).catch(() => acquireToken());
        await loadGraficos(apiResult);
        //console.log('api result' , data.value);
      }
    }

    updateData();

    watch(result, () => {
      // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
      updateData();
    });
    return {
      chartDatas,
      graficos,
      chartOptions: {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 8,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function (val: number) {
            return val + '%';
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ['#304758'],
          },
        },

        xaxis: {
          categories: ['Aprovado', 'Pendente', 'Reprovado'],
          position: 'top',
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        yaxis: {
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val: number) {
              return val + '%';
            },
          },
        },
        title: {
          text: 'SP',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444',
          },
        },
        colors: [
          function ({
            value,
            seriesIndex,
            dataPointIndex,
            w,
          }: {
            value: string;
            seriesIndex: number;
            dataPointIndex: number;
            w: string;
          }): string {
            switch (dataPointIndex) {
              case 0:
                return '#21BA45';
              case 1:
                return '#F2C037';
              case 2:
                return '#C10015';
              default:
                return '';
            }
          },
        ],
      },
    };
  },
});
</script>
