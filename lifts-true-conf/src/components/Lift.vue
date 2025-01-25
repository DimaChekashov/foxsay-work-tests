<template>
    <div class="lift">
      <div 
        class="lift__booth" 
        :class="data.status === 'waiting' ? 'wait' : ''"
        :style="{ 
          height: `${boothHeight}px`, 
          bottom: `${(data.position * boothHeight) - boothHeight}px`,
          transition: `bottom ${animationDuration}s ease`
        }"
      >
        <div 
          class="lift__booth-label" 
          :class="data.status === 'ready' ? 'hide' : ''"
        >{{ isUp ? '&uarr;' : '&darr;' }} {{ data.position }}</div>
      </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Data {
  animationDuration: number;
  isUp: boolean;
}

export default defineComponent({
  name: "Lift",
  data(): Data {
    return {
      animationDuration: 1,
      isUp: false
    }
  },
  props: {
    boothHeight: {
      type: Number,
      required: true
    },
    data: {
      type: Object,
      required: true,
      position: {
        type: Number,
        required: true
      },
      status: {
        type: String,
        required: true
      },
      id: {
        type: Number,
        required: true
      }
    },
  },
  watch: {
    "data.position": function (newVal, oldVal) {
      this.animationDuration = Math.abs(oldVal - newVal) + 1;
      this.isUp = newVal > oldVal;
      this.$emit("setStatus", { ...this.data, status: "moving" });
      setTimeout(() => {
        this.$emit("setStatus", { ...this.data, status: "waiting" });
        setTimeout(() => {
          this.$emit("setStatus", { ...this.data, status: "ready" });
        }, 3000);
      }, this.animationDuration * 1000);
    }
  }
});
</script>

<style scoped lang="scss">
.lift {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  border-left: 1px solid #000000;
  border-right: 1px solid #000000;
  &__booth {
    position: relative;
    width: 100px;
    height: 150px;
    background-color: aqua;
    padding: 15px;
    text-align: center;
    &-label {
      color: #ffffff;
      border-radius: 4px;
      padding: 8px 15px;
      background-color: rgba(0,0,0,0.3);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &.hide {
        display: none;
      }
    }
    &.wait {
      animation: flash 1s ease infinite;
    }
  }
}

@keyframes flash {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
  100% {
    opacity: 1;
  }
}
</style>
