<template>
  <div class="messages">
    <select v-model="filter" @change="onChange($event)">
      <option value="all">View all</option>
      <option value="uncompleted">View uncompleted</option>
    </select>

    <div id="table">
      <div
        class="tr"
        v-for="(m, i) in messages"
        :key="m._id"
        v-bind:class="{ finished: m.check }"
      >
        <div class="td" style="width: 30px; padding-left: 20px">
          <input
            type="checkbox"
            v-model="m.check"
            v-on:click="onSelect(m, i)"
          />
        </div>
        <div
          class="td"
          v-html="m.title ? m.title : '<i>(No subject)</i>'"
        ></div>
        <div class="td">{{ m.email }}</div>
        <div class="td">{{ m.date | formatDate }}</div>
        <div class="td">
          <div class="d-flex" style="width: 40px; padding-right: 20px">
            <div v-if="m.assigned" class="user-avatar me-2">
              {{ m.assigned }}
            </div>
            <button class="btn btn-secondary" title="Briši">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { io } from "socket.io-client";
import serverSettings from "@/assets/settings";
import { authHeader } from '../_helpers/auth-header';

interface Messages {
  _id: string;
  check: boolean;
  title: string;
  email: string;
  date: Date;
  assigned: string;
}

export default Vue.extend({
  mounted: function () {
    this.getData();

    this.socket.on("connect", () => {
      console.log("123");
    });

    this.socket.on("disconnect", () => {
      console.log(11);
    });

    this.socket.on("connect_error", () => {
      console.log(333);
    });
  },
  data: function () {
    return {
      socket: io(serverSettings.serverEndPoint),
      filter: "all",
      messages: [] as Messages[],
    };
  },
  methods: {
    getData() {

      const headers = authHeader();

      axios
        .get(serverSettings.serverEndPoint + "/api/messages", {
          headers: {
            'Authorization': headers,
          },
        })
        .then((response) => {
          if (response.status == 200) {
            this.messages = [...response.data];
          }
        }).catch(error => {
          console.log(error)
        });
    },
    onSelect(message: Messages, index: number) {
      message.check = !message.check ? true : false;

      if (!message.assigned) {
        message.assigned = "LS";
      } else {
        message.assigned = "";
      }

      // reactive
      this.messages.splice(index, 1, message);
    },
    onChange(event: Event) {
      let element = event.target as HTMLInputElement;
      console.log(element.value);
    },
  },
});
</script>

<style lang="scss">
@import "~@/assets/mixin";
@import "~@/assets/colors";

.messages {
  @include mt(4);
  @include mb(2);
}

#table {
  @include mt(1);
  width: 100%;
  display: table;
  border-collapse: collapse;
}
.tr {
  display: table-row;
  border: 1px solid rgba(#000, 0.1);
}
.td {
  display: table-cell;
  height: 43px;
  vertical-align: middle;
  @include px(0.5);
}

.finished {
  .td {
    color: rgba(green, 0.5);
  }
}

.user-avatar {
  background: red;
  color: #fff;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 500;
  width: 20px;
  padding: 5px;
  border-radius: 15%;
}
</style>