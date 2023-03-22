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
      clearable
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


  <div class="q-ml-xl row items-start q-gutter-xl">
    <q-card
      class="my-card"
      :class="
        event.status === EventStatus.Pendent
          ? 'warningBor'
          : event.status === EventStatus.Approved
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
            event.status === EventStatus.Pendent
              ? 'warning'
              : event.status === EventStatus.Approved
              ? 'positive'
              : 'negative'
          "
          icon="edit"
          :disable="event.status !== EventStatus.Pendent"
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
            event.status === EventStatus.Pendent
              ? 'text-warning'
              : event.status === EventStatus.Approved
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
          :class="{ 'text-negative': event.status === EventStatus.Rejected }"
          :disable="event.status !== EventStatus.Pendent"
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
                  (docEvt.status == null)
                    ? 'primary'
                    : docEvt.status === ArchiveStatus.Approved
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
                @click="showFileArea(true, docEvt.src, docEvt.rejectionReason)"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled"
                icon="thumb_up"
                no-caps
                size="sm"
                rounded
                color="positive"
                @click="showAprobarFile(docEvt.docId)"
              ></q-btn>
              <q-btn
                v-if="!docEvt.disabled"
                icon="thumb_down"
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
          <p v-if="rejectionReason != null && rejectionReason != ''" class="text-negative">Arquivo rejeitado: {{rejectionReason}}</p>
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
import { defineComponent, onMounted, ref, watch } from 'vue';
import { api, baseUrl } from 'boot/axios';
import { ptLocale, showAlert } from 'boot/util';

import { callGetApi } from 'src/utils/MsGraphApiCall';
import { useMsalAuthentication } from 'src/composition-api/useMsalAuthentication';
import { InteractionType } from '@azure/msal-browser';
import { loginRequest } from 'src/authConfig';
import {ArchiveStatus, EventStatus} from 'components/enums';

export default defineComponent({
  name: 'IndexPage',
  components: {
    /*ExampleComponent*/
  },
  setup() {
    const { result, acquireToken } = useMsalAuthentication(InteractionType.Redirect, loginRequest);
    const units = ref<Select[]>();

    const model = ref<Select>();
    const date = ref('');
    const unitId = ref(-1);
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
    const rejectionReason = ref(''); //si un archivo es desaprobado mostrar la razon;

    async function rejectEvent() {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, `api/Event/RejectEvent/${selectedEvt.value}`);

        if(!apiResult.data)
          throw apiResult;
        //await api.get<ApiResp>(`api/Event/RejectEvent/${selectedEvt.value}`);
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

    async function loadUnits(apiResult: any) {
      try {
        //const resp = await api.get('/api/Enum/GetUnitsDropdownItems');
        if(!apiResult.data)
          throw apiResult;
        units.value = apiResult.data.result.map((o: DropDownInfo) => {
          return { label: o.text, value: parseInt(o.value) };
        });
        //if (units.value != undefined) model.value = units.value[0];
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
        /*
        const resp = await api.get(
          'api/Event/GetPaginatedList?Unit=' +
            unitId.value +
            '&SkipCount=0&Date=' +
            date.value
        );*/
        if(!result.value) return;
        const unitTemp = unitId.value < 0 ? '' : unitId.value;
        const apiResult = await callGetApi(result.value.accessToken, 'api/Event/GetPaginatedList?Unit=' +
            unitTemp +
            '&SkipCount=0&Date=' +
            date.value);

        if(!apiResult.data)
          throw apiResult;
        events.value = apiResult.data.result.items;
      } catch (err: any) {
        showAlert(
          `Falha ao carregar eventos: ${err.response?.data.errorMessage ?? err}`
        );
      }
    }

    const changeUnit = async (val: Select) => {
      //console.log(val);
      unitId.value = val ? val.value : -1;
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
          rejectionReason: null,
        });
      }
      //console.log("evtDoc", docEvts.value);
    };

    const aprobarEvt = async () => {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, `/api/Event/ApproveEvent/${currEvtId.value}`);

        if(!apiResult.data)
          throw apiResult;
        //await api.get(`/api/Event/ApproveEvent/${currEvtId.value}`);

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
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, `/api/Archive/GetUploadedArchives?eventId=${evtId}`);

        if(!apiResult.data)
          throw apiResult;

        /* const resp = await api.get(
          `/api/Archive/GetUploadedArchives?eventId=${evtId}`
        ); */
        apiResult.data.forEach(
          (x: { id: number; category: string; status: number | null; rejectionReason: string | null }) => {
            const evt = docEvts.value?.filter((e) => e.category == x.category);
            if (evt != undefined && evt?.length > 0) {
              const first = evt[0];
              first.docId = x.id;
              first.status = x.status;
              first.color = x.id ? 'orange' : 'grey';
              first.disabled = x.status != null;
              first.src = baseUrl + '/api/Archive/Show/' + x.id;
              first.rejectionReason = x.rejectionReason;
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

    const showFileArea = (flag: boolean, src = '', _rejectionReason: '') => {
      isFileShowed.value = flag;
      srcFile.value = src;
      rejectionReason.value = _rejectionReason;
      //console.log("src", src);
    };

    const aprobarArquivo = async () => {
      try {
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken, `/api/Archive/ApproveArchive/${currDocId.value}`);

        if(!apiResult.data)
          throw apiResult;

        // const resp = await api.get(
        //   `/api/Archive/ApproveArchive/${currDocId.value}`
        // );
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
        if(!result.value) return;
        const apiResult = await callGetApi(result.value.accessToken,
              `/api/Archive/RejectArchive?ArchiveId=${currDocId.value}&RejectionReason=${reason.value}`);

        if(!apiResult.data)
          throw apiResult;
        // const resp = await api.get(
        //   `/api/Archive/RejectArchive?ArchiveId=${currDocId.value}&RejectionReason=${reason.value}`
        // );
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
      //await loadUnits();
      //await loadEvents();
    });

    async function updateData() {
      if (result.value != undefined && result.value.accessToken) {
        let apiResult = await callGetApi(result.value.accessToken, '/api/Enum/GetUnitsDropdownItems').catch(() =>
          acquireToken()
        );
        await loadUnits(apiResult);
        /*apiResult = await callGetApi(result.value.accessToken, 'api/Event/GetPaginatedList?Unit=' +
            unitId.value +
            '&SkipCount=0&Date=' +
            date.value).catch(() =>
          acquireToken()
        );*/
        await loadEvents();
      }
    }

    updateData();

    watch(result, () => {
      // Fetch new data from the API each time the result changes (i.e. a new access token was acquired)
      updateData();
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
      EventStatus,
      ArchiveStatus,
      rejectionReason,
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
