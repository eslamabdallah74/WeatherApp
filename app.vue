<script setup lang="ts">
// Title
useMeta({
  title: 'WeatherApp'
})

const cookie = useCookie("city");
const config = useRuntimeConfig();

if (!cookie.value) cookie.value = "suez";

const search = ref(cookie.value);
const input = ref("");
const background = ref("");
const cityNotFound = ref("");

const { data: city, error } = useAsyncData(
  "city",
  async () => {
    let response;

    try {
      response = await $fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search.value}`,
        {
          params: {
            units: "metric",
            appid: config.WEATHER_APP_SECRET,
          },
        }
      );
      // If there's an error clear it
      cityNotFound.value = null;

      cookie.value = search.value;

      const temp = response.main.temp;

      if (temp <= -10) {
        background.value =
          "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > -10 && temp <= 0) {
        background.value =
          "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3540&q=80";
      } else if (temp > 0 && temp <= 10) {
        background.value =
          "https://images.unsplash.com/photo-1560258018-c7db7645254e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4032&q=80";
      } else {
        background.value =
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3546&q=80";
      }
    } catch (e) {
      cityNotFound.value = "City not found";
    }

    return response;
  },
  {
    watch: [search],
  }
);

let today = new Date();
today = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const handleClick = () => {
  const formatedSearch = input.value.trim().split(" ").join("+");
  search.value = formatedSearch;
  input.value = "";
};


</script>

<template>
  <div class="relative h-screen overflow-hidden">
    <img :src="background" />
    <div class="absolute top-0 w-full h-full overlay" />
    <div class="absolute top-0 w-full h-full p-48">
      <div class="flex justify-between">
        <div class="">
          <h1 class="p-6 text-white text-7xl">{{ city.name }}</h1>
          <p class="mt-2 text-2xl text-white font-extralight">{{ today }}</p>
          <img :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`" class="w-56 icon" />
        </div>
        <div class="p-6 bg-blue-400 rounded-lg">
          <p class="font-bold text-white text-9xl">{{ city.main.temp }}°</p>
          <p class="text-3xl text-white">Feels like <span class="font-bold">{{ city.main.feels_like }}°</span></p>
          <p class="text-3xl text-white">Max <span class="font-bold">{{ city.main.temp_max }}°</span></p>
          <p class="text-3xl text-white">Min <span class="font-bold">{{ city.main.temp_min }}°</span></p>
          <p class="text-3xl text-white">Humidity <span class="font-bold">{{ city.main.humidity }}%</span></p>
        </div>
      </div>
      <div class="mt-20">
        <input type="text" class="w-1/2 h-10" placeholder="Search a city..." v-model="input" />
        <button class="w-20 h-10 text-white bg-sky-400" @click="handleClick">
          Search
        </button>
      </div>
    </div>
  </div>

</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.icon {
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style>
