<template>
    <div class="q-pa-md row justify-center">
        <q-scroll-area style="width:100%; height: calc(100vh - 72px - 72px - 32px);">
            <div v-if="room != null" v-for="(chat, index) in room.chats">
                <div class="row justify-center">
                    <q-chip
                        v-if="index == 0 ||
                formatTimestampToDateDisplay(chat.created_datetime) != formatTimestampToDateDisplay(room.chats[index - 1].created_datetime)"
                        square color="secondary" text-color="accent" class="self-center">
                        {{ getChatDate(chat) }}
                    </q-chip>
                </div>
                <q-chat-message v-if="isSentByMe(chat)" bg-color="indigo-1" text-color="font" :text="[chat.message]"
                    :stamp="formatTimestampToTime(chat.created_datetime)" sent class="q-mr-xl" />
                <q-chat-message v-else bg-color="accent" text-color="white" :text="[chat.message]"
                    :stamp="formatTimestampToTime(chat.created_datetime)" class="q-ml-md" />
            </div>
        </q-scroll-area>
    </div>
    <div class="q-pa-md">
        <!-- {{ testing }} -->
        <q-input dense filled v-model="text">
            <template v-slot:after>
                <q-btn round flat color="accent" icon="send" @click="sendChat" />
            </template>
        </q-input>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted } from 'vue';
import { date } from 'quasar';
import type { ChatRoom } from '@/interfaces/rest/ChatRoom';
import type { Chat } from '@/interfaces/rest/Chat';
import ChatService from '@/services/chat.service';
import { formatTimestampToDate, formatTimestampToDateDisplay, formatTimestampToTime } from '@/composables/formatter';

const props = defineProps<{
    room: ChatRoom | null
}>();

watch(props, async () => {
    console.log(props.room);
    connection.value = new WebSocket(`${import.meta.env.VITE_WS_URL}/chat/${props.room?.provider?.id}_${props.room?.customer?.id}/`);

    connection.value.onopen = () => console.log('connection open');
    connection.value.onmessage = (e) => {
        console.log('print something plis')
        console.log(e.data);
        testing.value.push(e.data);
    }
})

const text = ref<string>('');
const connection = ref<WebSocket>(new WebSocket(`${import.meta.env.VITE_WS_URL}/chat/${props.room?.provider?.id}_${props.room?.customer?.id}/`));
const testing = ref<string[]>([]);

connection.value.onopen = () => console.log('connection open');
connection.value.onmessage = (e) => {
    console.log('print something plis')
    console.log(e.data);
    testing.value.push(e.data);
}

function isSentByMe(chat: Chat) {
    return chat.customer_id != null;
}

function getChatDate(chat: Chat) {
    const now = formatTimestampToDate(new Date().toISOString());
    if (formatTimestampToDate(chat.created_datetime) == now) return 'Today';
    
    const yesterday = formatTimestampToDate(date.subtractFromDate(new Date(), { days: 1 }).toISOString())
    if (formatTimestampToDate(chat.created_datetime) == yesterday) return 'Yesterday';

    return formatTimestampToDateDisplay(chat.created_datetime);
}

function sendChat() {
    const msg = text.value;
    text.value = '';
    ChatService.sendChat({
        chat_room_id: props.room?.id,
        message: msg,
        customer_id: props.room?.customer?.id
    } as Chat);
}
</script>