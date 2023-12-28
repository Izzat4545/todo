<script lang="ts">
export default {
  data() {
    return {};
  },
  methods: {
    parentFunction() {
      console.log("parent function");
    },
    childFunction() {
      console.log("child function");
    },
  },
};
</script>

<template>
  <div class="w-[50%] m-auto">
    <div class="text-lg text-center py-3">Posted date</div>
    <ul>
      <li
        @click="parentFunction"
        class="btn btn-ghost h-full rounded-md hover:bg-transparent overflow-hidden p-0 w-full group"
      >
        <div
          class="bg-white transition-all group-hover:bg-slate-50 w-full flex pr-2 h-[70px] items-center justify-between"
        >
          <div class="flex gap-2 h-full items-center">
            <!-- IMPORTANCE -->
            <div class="bg-red-400 h-full px-2"></div>
            <!-- TASK -->
            <div class="text-[20px]">Do the dishes</div>
          </div>
          <button
            @click.stop="childFunction"
            class="btn btn-ghost btn-circle text-white"
          >
            <span class="material-symbols-outlined text-red-400"> delete </span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>
