<template>
  <div class="row">
    <div
      class="col-12 column items-center justify-evenly"
      style="margin-bottom: 20px"
      v-for="cd in graficos"
      :key="cd.stateId"
    >
      <apexchart
        type="bar"
        height="350"
        width="290"
        :options="chartOptions"
        :series="cd.series"
      ></apexchart>
      <p style="font-weight: bold; margin-top: -20px">{{ cd.name }}</p>
    </div>
  </div>
</template>


<script lang="ts">
import { api } from 'src/boot/axios';
import { showAlert } from 'src/boot/util';
import { ChartData, FilterGrafico, Grafico, GraficoRelatorio } from '../models';

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
    graficoOneCol: {
      type: Object as PropType<GraficoRelatorio>,
      required: true,
    },
  },
  setup(props) {
    const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);
    //console.log("props", props);
    const chartDatas = ref<Array<ChartData>>([]);
    const graficos = ref<Array<Grafico>>([]);

    const categories = ref<Array<string>>([]);
    const percents = ref<Array<number>>([]);

    async function loadGraficos(apiResult : any) {
      try {
        /* const resp = await api.post<ChartData[]>(
          '/api/Event/GetEventsInfo',
          props.graficoOneCol.data
        ); */
        if(!apiResult.data)
          throw apiResult;
        chartDatas.value = apiResult.data;
        //console.log(props.graficoOneCol.data.filter);
        chartDatas.value.forEach((cd) => {
          //const porcientos = [];
          let pc = 0;
          switch (props.graficoOneCol.data.filter) {
            case 0:
              pc = cd.approvedPercent;
              break;
            case 1:
              pc = cd.rejectPercent;
              break;
            default:
              pc = cd.expiredPercent;
              break;
          }
          //porcientos.push(pc);
          categories.value.push(cd.name);
          percents.value.push(pc);
          // graficos.value.push({
          //   series: [{ name: props.graficoOneCol.caption, data: porcientos }],
          //   name: cd.name,
          // });
        });
        graficos.value.push({
            series: [{ name: '', data: percents.value }],
            name: props.graficoOneCol.caption,
        });
      } catch (err: any) {
        showAlert(
          `não foi possível exibir gráficos: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }

   /*  onMounted(async () => {
      await loadGraficos();
    }); */
    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        const apiResult = await callPostApi(result.value.accessToken, '/api/Event/GetEventsInfo', props.graficoOneCol.data).catch(() =>
          acquireToken()
        );
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
          categories: categories.value,
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
          text: '',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444',
          },
        },
        colors: [props.graficoOneCol.color],
      },
    };
  },
});
</script>

function callPostApi(accessToken: string, arg1: string, data: FilterGrafico) {
  throw new Error('Function not implemented.');
}
