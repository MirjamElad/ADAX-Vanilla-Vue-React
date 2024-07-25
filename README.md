**Share state/logic between different frontend libraries/framework**

**NB**: You can play with the example & inspect its code [**HERE**](https://stackblitz.com/edit/simple-counter-vue-faezke?file=src%2Fmain.tsx)

**ADAX** greatly facilitates sharing state/logic between different frontend technologies/libraries/framework. Our small test combines Vanilla Javascript, React and Vue to make them all access, manipulate and share the exact same state!

![image](https://github.com/user-attachments/assets/0ba73c80-8e63-43f7-8acb-a6111a6c3948)


Our small example uses Vanilla Javascrit/Typescript for the result panel then Vue and React for the "FANS" areas. One can vote for the Red vs Blue team within the "FANS" areas and see the detailed results in the result panel.

Note that both "FANS" areas show their respective mood with an emoji. If it's a tie both moods are neutral 😐. Otherwise, the winning team displays 😃 and the losing one 🤬. Click/Vote to see the results pannel update immediately. On the other hand, the "FANS" areas only updates if there is a "change of mood".

![image](https://github.com/user-attachments/assets/dfe00ac4-2359-41fb-996f-b0154e62108f)


**Implementation Overview**_(Code in: "./src/")_

**State & logic** _(Code in: "./src/state.ts")_: Define the app's state & the functions query or change that state! It also holds the rules of the app.

**Vanilla code** _(Code in: "./src/main.tsx")_: Contains the Vanilla code for the result panel and sets both React and Vue.

**Vue** _(Code in: "./src/Vue")_: Contains the **Vue** code for the **Red** FANS area.

**React** _(Code in: "./src/React")_: Contains the **React** code for the **Blue** FANS area.
