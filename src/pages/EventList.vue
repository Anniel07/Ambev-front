<template>
  <div class="header-index row items-center justify-evenly">
    <h5
      class="text-white"
      style="font-weight: bold; text-decoration: underline"
    >
      Lista de Eventos
    </h5>
    <!-- <q-badge color="secondary" multi-line>
        Model: "{{ model }}"
      </q-badge> -->
  </div>
  <div class="q-pa-md row items-center justify-center q-gutter-md">
    <q-select
      v-model="model"
      :options="units"
      label="Unidade"
      style="width: 350px"
      @update:model-value="changeUnit"
    />

    <q-input v-model="date" style="width: 350px" label="Data do Evento">
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date
              v-model="date"
              mask="DD-MM-YYYY"
              :locale="ptLocale"
              @update:model-value="changeDate"
            >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
  <div class="row row items-center justify-center q-gutter-xl">
    <p><q-icon name="square" color="positive" /> Aprovado</p>
    <p><q-icon name="square" color="warning" /> Pendente</p>
    <p><q-icon name="square" color="negative" /> Reprovado</p>
  </div>

  <!-- :style="{
        'border-right-color':
          event.status === 0
            ? 'var(--positive)'
            : event.status === 1
            ? '#3E8F69'
            : '#BD0C31',
      }" -->
  <div class="q-ml-xl row items-start q-gutter-xl">
    <q-card
      class="my-card"
      :class="
        event.status === 0
          ? 'warningBor'
          : event.status === 1
          ? 'positiveBor'
          : 'negativeBor'
      "
      v-for="event in events"
      :key="event.id"
    >
      <q-card-actions align="right">
        <q-btn
          :to="'/cadastro-evento-preenchido/' + event.id"
          flat
          round
          color="blue-grey-13"
          icon="visibility"
        />
        <q-btn
          :to="'/editar-evento/' + event.id"
          flat
          round
          :color="
            event.status === 0
              ? 'warning'
              : event.status === 1
              ? 'positive'
              : 'negative'
          "
          icon="edit"
          :disable="event.status !== 0"
        />
        <q-btn
          flat
          round
          color="grey"
          icon="close"
          @click="showRejectEvt(event.id)"
        />
      </q-card-actions>

      <q-card-section>
        <div
          class="text-h6 q-mb-xs"
          :class="
            event.status === 0
              ? 'text-warning'
              : event.status === 1
              ? 'text-positive'
              : 'text-negative'
          "
        >
          {{ event.name }}
        </div>
        <div class="row no-wrap items-center">
          <q-item-label caption>{{ event.startDate }}</q-item-label>
        </div>
      </q-card-section>

      <q-card-actions>
        <q-btn
          no-caps
          flat
          :class="{ 'text-negative': event.status === 2 }"
          :disable="event.status != 0"
          @click="showFiles(event.id)"
          >Arquivos</q-btn
        >
      </q-card-actions>
    </q-card>
  </div>
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente rejeitar este evento?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          no-caps
          label="Sim"
          color="positive"
          v-close-popup
          @click="rejectEvent"
        />
        <q-btn flat no-caps label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="confirmAprbarEvt" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente aprovar este evento?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          v-close-popup
          @click="aprobarEvt"
        />
        <q-btn flat no-caps label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!--Aprobar arquivo -->
  <q-dialog v-model="confirmAprobarFile" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm">Deseja realmente aprovar este arquivo?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          v-close-popup
          @click="aprobarArquivo"
        />
        <q-btn no-caps flat label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Rechazar arquvio -->
  <q-dialog v-model="confirmRechazarFile" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="error" color="negative" text-color="white" />
        <span class="q-ml-sm"
          >Se você realmente deseja rejeitar este arquivo, insira o motivo</span
        >
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input dense v-model="reason" autofocus />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          no-caps
          flat
          label="Sim"
          color="positive"
          @click="rechazarArquivo"
        />
        <q-btn no-caps flat label="Não" color="negative" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- dialog with files asociated to the event -->
  <q-dialog v-model="showFileDialog">
    <q-card style="width: 800px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">Arquivos</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-show="!isFileShowed">
          <div
            class="row"
            v-for="docEvt in docEvts"
            :key="docEvt.category"
            style="margin-bottom: 25px"
          >
            <div v-if="docEvt.category != '0'" class="col-7">
              <q-btn
                no-caps
                class="csWidth"
                :label="docEvt.label"
                filled
                rounded
                :color="
                  docEvt.status == null
                    ? 'primary'
                    : docEvt.status == 0
                    ? 'positive'
                    : 'negative'
                "
              />
            </div>
            <div
              v-if="docEvt.category != '0'"
              class="col-5 row items-center q-gutter-md"
            >
              <q-btn
                icon="description"
                no-caps
                flat
                rounded
                :color="docEvt.color"
                :disable="docEvt.color == 'grey'"
                @click="showFileArea(true, docEvt.src)"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled"
                icon="check"
                no-caps
                size="sm"
                rounded
                color="positive"
                @click="showAprobarFile(docEvt.docId)"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled"
                icon="remove"
                no-caps
                size="sm"
                rounded
                color="negative"
                @click="showRechazarFile(docEvt.docId)"
              ></q-btn>
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
          label="Aprovar evento"
          flat
          color="primary"
          @click="confirmAprbarEvt = true"
        />
        <q-btn no-caps label="Fechar" flat color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <br />
</template>

<script lang="ts">
import {
  Event,
  Select,
  DocEvt,
  ApiResp,
  DropDownInfo,
} from 'components/models';
import { defineComponent, onMounted, ref } from 'vue';
import { api, baseUrl } from 'boot/axios';
import { ptLocale, showAlert } from 'boot/util';


export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const units = ref<Select[]>();

    const model = ref<Select>();
    const date = ref('');
    const unitId = ref(0);
    const events = ref<Event[]>();
    const selectedEvt = ref(-1);
    const confirm = ref(false);
    const docEvts = ref<DocEvt[]>();
    const showFileDialog = ref(false);
    const srcFile = ref('');
    const isFileShowed = ref(false); //para mostrar ocultar area archivos
    const confirmAprobarFile = ref(false);
    const confirmRechazarFile = ref(false);
    const currDocId = ref(0); //id del archivo seleccionado para aprobar o rechazar
    const currEvtId = ref(0);
    const reason = ref(''); //razon de rejeitar archivo
    const confirmAprbarEvt = ref(false);
    const showAprobarEvt = ref(false);

    async function rejectEvent() {
      try {
        await api.get<ApiResp>(`api/Event/RejectEvent/${selectedEvt.value}`);
        await loadEvents();
      } catch (err: any) {
        showAlert(
          `Não foi possível rejeitar este evento: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }

    const showRejectEvt = (evtId: number) => {
      confirm.value = true;
      selectedEvt.value = evtId;
      //console.log('sel', evtId);
    };

    async function loadUnits() {
      try {
        const resp = await api.get('api/Enum/GetUnitsDropdownItems');
        units.value = resp.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
        if (units.value != undefined) model.value = units.value[0];
      } catch (err: any) {
        showAlert(
          `Falha ao carregar unidades: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    }
    async function loadEvents() {
      try {
        const resp = await api.get(
          'api/Event/GetPaginatedList?Unit=' +
            unitId.value +
            '&SkipCount=0&Date=' +
            date.value
        );
        events.value = resp.data.result.items;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar eventos: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    const changeUnit = async (val: Select) => {
      //console.log(val.value);
      unitId.value = val.value;
      await loadEvents();
    };

    const changeDate = async (value: any, reason: any, details: any) => {
      //console.log(value);
      date.value = value;
      await loadEvents();
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
      ];
      for (let i = 1; i <= 6; i++) {
        let cat = i === 1 ? '1' : '' + (i + 1);

        docEvts.value?.push({
          color: 'grey',
          disabled: true,
          src: '',
          file: new File([], ''),
          category: cat,
          label: labels[i - 1],
          docId: null,
          status: null,
        });
      }
      //console.log("evtDoc", docEvts.value);
    };

    const aprobarEvt = async () => {
      try {
        await api.get(`/api/Event/ApproveEvent/${currEvtId.value}`);

        await loadEvents();
        showFileDialog.value = false; // close dialog
        showAlert('Evento aprovado com sucesso', true);
      } catch (err: any) {
        showAlert(
          `Não foi possível aprovar este evento: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    };

    const showFiles = async (evtId: number) => {
      fillDocEvt(); //clear status
      currEvtId.value = evtId;
      try {
        const resp = await api.get(
          `/api/Archive/GetUploadedArchives?eventId=${evtId}`
        );
        resp.data.forEach(
          (x: { id: number; category: string; status: number | null }) => {
            const evt = docEvts.value?.filter((e) => e.category == x.category);
            if (evt != undefined && evt?.length > 0) {
              const first = evt[0];
              first.docId = x.id;
              first.status = x.status;
              first.color = x.id ? 'orange' : 'grey';
              first.disabled = x.status != null;
              first.src = baseUrl + '/api/Archive/Show/' + x.id;
            }
          }
        );
        showFileDialog.value = true;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar arquivos: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    };

    const showFileArea = (flag: boolean, src = '') => {
      isFileShowed.value = flag;
      srcFile.value = src;
      //console.log("src", src);
    };

    const aprobarArquivo = async () => {
      try {
        const resp = await api.get(
          `/api/Archive/ApproveArchive/${currDocId.value}`
        );
        await showFiles(currEvtId.value);
      } catch (err: any) {
        showAlert(
          `Não foi possível aprovar este arquivo: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    };
    const rechazarArquivo = async () => {
      if (reason.value.trim().length === 0) {
        showAlert('Insira o motivo');
        return;
      }
      try {
        const resp = await api.get(
          `/api/Archive/RejectArchive?ArchiveId=${currDocId.value}&RejectionReason=${reason.value}`
        );
        await showFiles(currEvtId.value);
        reason.value = '';
        confirmRechazarFile.value = false;
      } catch (err: any) {
        showAlert(
          `Não foi possível rejeitar este arquivo: ${
            err.response?.data.errorMessage ?? err
          }`
        );
      }
    };
    const showRechazarFile = (docId: number) => {
      confirmRechazarFile.value = true; // propmt for reason
      currDocId.value = docId;
    };
    const showAprobarFile = (docId: number) => {
      confirmAprobarFile.value = true;
      currDocId.value = docId;
      //console.log("currDocId",docId);
    };
    onMounted(async () => {
      fillDocEvt();
      await loadUnits();
      await loadEvents();
    });

    return {
      docEvts,
      units,
      model,
      events,

      date,
      ptLocale,
      changeUnit,
      changeDate,
      confirm,
      showRejectEvt,
      rejectEvent,
      showFileDialog,
      showAprobarEvt,
      confirmAprbarEvt,
      aprobarEvt,
      showFiles,
      showFileArea,
      isFileShowed,
      srcFile,
      confirmAprobarFile,
      confirmRechazarFile,
      aprobarArquivo,
      rechazarArquivo,
      showAprobarFile,
      showRechazarFile,
      reason,
      baseUrl,
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
  width: 340px;
  margin-left: 20px;
}

.positiveBor {
  border-right-color: $positive;
}
.negativeBor {
  border-right-color: $negative;
}
.warningBor {
  border-right-color: $warning;
}
.my-card {
  width: 100%;
  max-width: 300px;
  border-right-style: solid;
  border-right-width: 7px;
}

h6,
h5 {
  color: $orange;
}
</style>
