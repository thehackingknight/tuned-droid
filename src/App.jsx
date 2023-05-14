/* eslint-disable */

import { useEffect, useState } from "react";
import { shell, path } from "@tauri-apps/api";

//import "./styles/halfmoon/halfmoon.min.css";
import "./App.css";
//import "./styles/css/classes.css";
import "./styles/css/tuned-theme.css";

function App() {
  const [connectedDevices, setConnectedDevices] = useState([]);
  const [adbDir, setAdbDir] = useState("");
  const [gettingDevices, setGettingDevices] = useState(true);

  useEffect(() => {
    getAdbDir();
  }, []);

  useEffect(() => {
    getDevices();
  }, [adbDir]);

  const getAdbDir = async () => {
    let defaultAdbDir = await path.resolveResource("resources/adb.exe");
    setAdbDir(defaultAdbDir.slice(4));
  };

  const getDevices = async () => {
    console.log("Excecuting...");
    setGettingDevices(true);
    let cmd = new shell.Command("cmd-cmd", ["/C", adbDir, "devices"]);
    cmd
      .execute()
      .then((res) => {
        console.log("Success");
        let data = res.stdout.trim().split("\n").slice(1);
        setConnectedDevices(data);
        setGettingDevices(false);
        console.log(res.stderr);
      })
      .catch((e) => {
        console.log(e);
        setGettingDevices(false);
      });
  };

  return (
    <div className="dark">
      <div className="card bg-2 t-l">
            <h1>TunedStarter</h1>

        <div className="">
          <div style={{}} className="input-group d-none">
            <label className="t-l" htmlFor="adb-dir">
              Adb directory:
            </label>
            <input
              type="text"
              id="adb-dir"
              className="form-control"
              value={adbDir}
              onChange={(e) => setAdbDir(e.target.value)}
            />
          </div>
          <a></a>
        </div>
        <div className="bg-2 w-400 br-10 ta-l pdx-10 pdy-5">
          <div style={{ paddingBottom: 15 }} className="br-5 my-10 bg-0 pdx-20">
            <h5 className="">
              Connected devices{" "}
              <button
                disabled={gettingDevices}
                className={
                  "w-40 p-1 btn btn-primary" +
                  (gettingDevices ? "loading" : "")
                }
                onClick={getDevices}
              >
                R
              </button>
            </h5>
            <div className="" id="devices">
              {connectedDevices.length ? (
                <ul>
                  {connectedDevices.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <div className="my-10 w-100p ta">
                  <code className="ta-c">No devices</code>
                </div>
              )}
            </div>
          </div>
          <div className="">
            <button className="w-200 btn">Connect with WIFI</button>
          </div>
          <div className="my-6 input-group">
            <label htmlFor="vol">Volume:</label>
            <input
              className="form-control w-190"
              type="number"
              name="vol"
              id="vol"
              max={100}
              min={0}
              value={45}
            />
          </div>
          <div className="input-group">
            <label htmlFor="mode">Mode:</label>
            <select name="mode" id="mode" className="w-200 form-control">
              <option value={0}>Potrait</option>
              <option value={1}>Landscape</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
