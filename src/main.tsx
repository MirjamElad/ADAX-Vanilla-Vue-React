import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './React/App';
import { createApp } from 'vue';
import VueApp from './Vue/App.vue';
import { subscribe } from 'adax';
import { getResult } from './state';
import './base.css';

//// [SECTION]: Vanilla  JavaScript ////////////////////////////////////
const onData = (
  { data: { winnerName, winnerScore, runnerUpName, runnerUpScore } }: any,
  elementId: string
) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.innerHTML = `
  <div
    class="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 border-slate-300 my-2"
  >
    <div class="p-2 text-3xl">
      ${winnerName}: (${winnerScore})
    </div>
    <div class="p-2 text-3xl">
      ${runnerUpName}: (${runnerUpScore})
    </div>
  </div>
  `;
};
const vanillaApp = () => {
  const { result, onMounted } = subscribe(
    ({ data }) => onData({ data }, 'vanilla-app'),
    getResult
  );
  onMounted();
  onData(result, 'vanilla-app');
};
vanillaApp();
////////////////////////////////////////////////////////////////////////

//// [SECTION]: Vue ////////////////////////////////////
createApp(VueApp).mount('#vue-app');
////////////////////////////////////////////////////////////////////////

//// [SECTION]: React ////////////////////////////////////
ReactDOM.createRoot(document.getElementById('react-app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
////////////////////////////////////////////////////////////////////////
