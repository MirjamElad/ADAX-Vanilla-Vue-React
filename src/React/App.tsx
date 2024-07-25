import React from 'react';
import { useSync } from 'adax-react';
import { trigger } from 'adax';
import { voteFor, getMood } from '../state';

const cmpStyles = 'bg-white rounded-xl shadow-lg mx-6 px-6 py-4 my-2';
const btnStyles =
  'bg-gray-400 mt-4 px-4 py-2 rounded-lg border border-slate-500 shadow-2xl';

// We chose to pass data (i.e. name) and functions (i.e. query & action) as props just to point that it is possible to
//   re-use components to display different state parts and access the global state with different actions!
const FansGroup = ({
  name,
  query,
  action,
}: {
  name: string;
  query: (x: any) => { mood: any };
  action: (x: { name: string }) => void;
}) => {
  const { mood } = useSync(query, { name: name });
  return (
    <div className={cmpStyles}>
      <h1>{`${name} FANS: ${mood}`}</h1>
      <button
        onClick={() => trigger(action, { name: name })}
        className={btnStyles}
      >
        Click to Vote
      </button>
    </div>
  );
};

function App() {
  return <FansGroup name="Blue" query={getMood} action={voteFor} />;
}

export default App;
