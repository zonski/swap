// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import {useEffect, useState} from "react";
import {HelloResponse, monkeyMagic} from "@swap/server-api";


export function App() {

  const [hello, setHello] = useState<HelloResponse | null>(null);

  const local = monkeyMagic();

  useEffect(() => {
    fetch("http://localhost:3333/api")
    .then((response) => response.json())
    .then((data) => {
      setHello(data);
    })
    .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Admin Portal</h1>
      <div>
        Server says: {hello?.message}

      </div>
      <div>
        Locally: {local.message}
      </div>
    </div>
  );
}

export default App;
