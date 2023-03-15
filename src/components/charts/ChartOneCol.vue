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
        width="160"
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
import { defineComponent, onMounted, PropType, ref } from 'vue';
import { ChartData, FilterGrafico, Grafico, GraficoOneCol } from '../models';

export default defineComponent({
  name: 'FarolChart',
  components: {
    /*ExampleComponent*/
  },
  props: {
    graficoOneCol: {
      type: Object as PropType<GraficoOneCol>,
      required: true,
    }
  },
  setup(props) {
    //console.log("props", props);
    const chartDatas = ref<Array<ChartData>>([]);
    const graficos = ref<Array<Grafico>>([]);


    async function loadGraficos() {
      const resp = await api.post<ChartData[]>(
        '/api/Event/GetEventsInfo' , props.graficoOneCol.data
      );
      chartDatas.value = resp.data;
      console.log(props.graficoOneCol.data.filter);
      chartDatas.value.forEach((cd) => {
        const porcientos = [];
        let pc = 0;
        switch(props.graficoOneCol.data.filter){
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
        porcientos.push(pc);
        graficos.value.push({
          series: [{ name: props.graficoOneCol.caption, data: porcientos }],
          name: cd.name,
        });
      });
    }

    onMounted(async () => {
      await loadGraficos();
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
          categories: [props.graficoOneCol.caption],
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
        colors: [props.graficoOneCol.color],
      },
    };
  },
});
</script>
