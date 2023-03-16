<template>
  <div class="row items-center justify-center q-gutter-xl">
    <p><q-icon name="square" color="positive" size="xs" /> Aprovado</p>
    <p><q-icon name="square" color="warning" size="xs" /> Pendente</p>
    <p><q-icon name="square" color="negative" size="xs" /> Reprovado</p>
  </div>
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
/** componente usado en Index y pagina Farol Antigimento */
import { api } from 'src/boot/axios';
import { showAlert } from 'src/boot/util';
import { defineComponent, onMounted, ref } from 'vue';
import { ChartData, Grafico } from '../models';

export default defineComponent({
  name: 'FarolChart',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const chartDatas = ref<Array<ChartData>>([]);
    const graficos = ref<Array<Grafico>>([]);

    async function loadFarol() {
      try {
        const resp = await api.get<ChartData[]>(
          '/api/Event/GetFarolAntingimento'
        );
        chartDatas.value = resp.data;
        //console.log(chartDatas.value);
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

    onMounted(async () => {
      await loadFarol();
    });
    return {
      chartDatas,
      graficos,
      /*series: [
        {
          name: 'Eventos',
          data: [],
        },
      ],*/
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
