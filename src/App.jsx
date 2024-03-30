import "./App.css";
import * as React from "react";
import { useEffect, useState } from "react";

function App() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const [filter, setfilter] = useState(false);
  const [filterpri, setfilterpri] = useState("none");
  // const [sort, setsort] = useState(false);
  const [sortval, setsortval] = useState("");
  const [data, setdata] = useState([]);
  const [edit, setedit] = useState(false);
  const [id, setid] = useState(0);
  const [pending, setpending] = useState([]);
  const [inprogress, setinprogress] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [deployed, setdeployed] = useState([]);
  const [deffered, setdeffered] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  // const [team, setteam] = useState("");
  const [assignee, setassignee] = useState("");
  const [priority, setpriority] = useState("P0");
  const [status, setstatus] = useState("pending");

  const [toggle, settoggle] = useState(false);
  useEffect(() => {
    var storeddata = JSON.parse(localStorage.getItem("userdata"));
    if (filterpri !== "none") {
      const newdata = storeddata.filter((item) => item.priority === filterpri);
      storeddata = newdata;
    }
    if (storeddata) {
      // console.log(storeddata);
      const pendingdata = storeddata.filter(
        (item) => item.status === "pending"
      );

      const inprogressdata = storeddata.filter(
        (item) => item.status === "inprogress"
      );
      const completeddata = storeddata.filter(
        (item) => item.status === "completed"
      );
      const deployeddata = storeddata.filter(
        (item) => item.status === "deployed"
      );
      const deffereddata = storeddata.filter(
        (item) => item.status === "deffered"
      );
      // console.log(pendingdata);
      setpending(pendingdata);
      setinprogress(inprogressdata);
      setcompleted(completeddata);
      setdeployed(deployeddata);
      setdeffered(deffereddata);
      setdata(storeddata);
    }
  }, [data]);

  // const sortbypri=()=>{
  //   const newdata=[]
  // }

  // const filter = () => {
  //   console.log("data");
  //   console.log(data);
  //   console.log(priority);
  //   const newdata = data.filter((item) => item.priority === priority);
  //   console.log("filtered data");
  //   console.log(newdata);
  //   setdata(newdata)

  // };
  const setval = (item) => {
    setid(item.id);
    settitle(item.title);
    setdescription(item.description);
    setassignee(item.assignee);
    setpriority(item.priority);
    setstatus(item.status);
  };

  const Update = () => {
    // const storeddata = JSON.parse(localStorage.getItem("userdata"));
    const newdata = data.map((item) => {
      if (item.id === id) {
        return { ...item, priority: priority, status: status };
      } else {
        return item;
      }
    });
    setdata(newdata);
    localStorage.setItem("userdata", JSON.stringify(newdata));
    settitle("");
    setdescription("");
    //setteam("");
    setassignee("");
    setpriority("");
    setstatus("pending");
    settoggle(false);
    setedit(false);
  };

  const Add = () => {
    const newobj = {
      id: Math.random(),
      title: title,
      description: description,
      assignee: assignee,
      priority: priority,
      status: status,
    };
    const newdata = [...data, newobj];
    setdata(newdata);
    // if (newobj.priority === "pending") {
    //   const newpdata = [...pending, newobj];
    //   setpending(newpdata);
    // }
    localStorage.setItem("userdata", JSON.stringify(newdata));
    settitle("");
    setdescription("");
    //setteam("");
    setassignee("");
    setpriority("");
    setstatus("pending");
    settoggle(false);
  };

  const Delete = (id) => {
    const newdata = data.filter((item) => item.id !== id);
    setdata(newdata);
    localStorage.setItem("userdata", JSON.stringify(newdata));
  };

  return (
    <div
      className={`overflow-x-hidden ${
        toggle ? "" : ""
      } bg-gradient-to-r from-indigo-300 to-purple-400 min-h-screen`} //correct
    >
      {/* <div className="bg-green-200 absolute w-1/2 mt-10  h-1/2 "></div> */}
      <div
        className={`absolute w-full h-screen flex ${
          toggle ? "" : "hidden"
        } justify-center pt-24 z-10`}
      >
        <div className="bg-gradient-to-r border-2  from-indigo-300 to-purple-400 md:w-1/4 w-full h-fit rounded-xl">
          <div className="bg-white flex flex-row items-center justify-between px-2 h-12 mb-2 rounded-t-xl">
            <div className="font-semibold text-xl">Create a Task</div>
            {/* make sure to correct */}
            <div
              className="cursor-pointer font-bold"
              onClick={() => {
                settoggle(false);
                setedit(false);
                settitle("");
                setdescription("");
                setassignee("");
                setpriority("P0");
                setstatus("pending");
              }}
            >
              X
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center p-2">
            <div className="flex flex-col">
              <label>Title</label>
              <input
                className={`bg-gray-100  rounded-sm ${
                  edit && "cursor-not-allowed"
                }`}
                type="text"
                value={title}
                onChange={(e) => settitle(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label>Description</label>
              <textarea
                className={`bg-gray-100  rounded-sm ${
                  edit && "cursor-not-allowed"
                }`}
                type="text"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label>Assignee</label>
              <input
                className={`bg-gray-100  rounded-sm ${
                  edit && "cursor-not-allowed"
                }`}
                type="text"
                value={assignee}
                onChange={(e) => setassignee(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-10">
              <div className="flex flex-col rounded-sm">
                <label>Priority</label>
                <select
                  name="priority"
                  value={priority}
                  onChange={(e) => setpriority(e.target.value)}
                >
                  <option value="P0">P0</option>
                  <option value="P1">P1</option>
                  <option value="P2">P2</option>
                </select>
              </div>
              {edit && (
                <div className="flex flex-col">
                  <label>Status</label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="inprogress">Inprogress</option>
                    <option value="completed">Completed</option>
                    <option value="deployed">Deployed</option>
                    <option value="deffered">Deffered</option>
                  </select>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-2">
              {!edit && (
                <button
                  className="bg-blue-500 my-2 p-1 w-fit rounded-lg text-white"
                  onClick={Add}
                >
                  Submit
                </button>
              )}
              {edit && (
                <button
                  className="bg-blue-500 my-2 p-1 w-fit rounded-lg text-white"
                  onClick={Update}
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="= p-1  text-center bg-gradient-to-r from-indigo-300 to-purple-400 h-10">
        <h1 className="font-bold text-2xl">InternAssignment</h1>
        <div></div>
      </div>

      <div
        className={`mt-8 p-4 h-full flex flex-col  justify-center border-2 border-white rounded-lg mx-4 gap-4 ${
          toggle ? "opacity-20" : ""
        }`}
      >
        <div className="p-4 flex flex-row justify-between rounded-lg w-full h-24">
          <div className="">
            <label className="text-lg font-semibold">Filter by:</label>
            <select
              name="priority"
              className="mx-1 p-1"
              defaultValue="none"
              // value={priority}
              onChange={(e) => {
                setfilterpri(e.target.value);
                // setfilter(true);
              }}
            >
              <option value="none">None</option>
              <option value="P0">P0</option>
              <option value="P1">P1</option>
              <option value="P2">P2</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <button
              className="bg-blue-600 text-white p-1 rounded-lg w-48"
              onClick={() => {
                settoggle(true);
              }}
            >
              Add New Task
            </button>
          </div>
        </div>

        <div className="flex md:flex-row flex-col gap-4">
          <div className="bg-white flex flex-col  md:w-1/5 h-96 rounded-lg">
            <div className="bg-gray-400 rounded-t-lg p-2 text-white font-semibold">
              Pending
            </div>
            <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-3">
              {pending &&
                pending.map((item) => {
                  return (
                    <div
                      className="m-1 p-1 flex flex-col rounded-md bg-gray-200"
                      key={item.id}
                    >
                      <div className="flex flex-row justify-between pt-2 px-2">
                        <h1 className="font-semibold text-xl">{item.title}</h1>
                        <p className="w-fit h-fit rounded-md text-white font-semibold bg-blue-500 px-1">
                          {item.priority}
                        </p>
                      </div>
                      <div className="h-[1px] bg-black m-2"></div>
                      <div className="px-2">{item.description}</div>
                      <div className="flex flex-row justify-between px-2">
                        <h1 className="font-semibold text-lg">
                          @{item.assignee}
                        </h1>
                        <div className="w-fit flex gap-1 h-fit text-white font-semibold  px-1">
                          <button
                            onClick={() => {
                              Delete(item.id);
                            }}
                            className="bg-red-500 text-white p-1 rounded-md"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setedit(true);
                              settoggle(true);
                              setval(item);
                            }}
                            className="bg-blue-600 text-white p-1 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button className="px-2 p-1 bg-blue-500 rounded-md m-2 text-white">
                          Assign
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-white flex flex-col md:w-1/5 h-96 rounded-lg">
            <div className="bg-yellow-500 rounded-t-lg p-2 text-white font-semibold">
              In Progress
            </div>
            <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-3">
              {inprogress &&
                inprogress.map((item) => {
                  return (
                    <div
                      className="m-1 p-1 flex flex-col rounded-md bg-gray-200"
                      key={item.id}
                    >
                      <div className="flex flex-row justify-between pt-2 px-2">
                        <h1 className="font-semibold text-xl">{item.title}</h1>
                        <p className="w-fit h-fit rounded-md text-white font-semibold bg-blue-500 px-1">
                          {item.priority}
                        </p>
                      </div>
                      <div className="h-[1px] bg-black m-2"></div>
                      <div className="px-2">{item.description}</div>
                      <div className="flex flex-row justify-between px-2">
                        <h1 className="font-semibold text-lg">
                          @{item.assignee}
                        </h1>
                        <div className="w-fit flex gap-1 h-fit text-white font-semibold  px-1">
                          <button
                            onClick={() => {
                              Delete(item.id);
                            }}
                            className="bg-red-500 text-white p-1 rounded-md"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setedit(true);
                              settoggle(true);
                              setval(item);
                            }}
                            className="bg-blue-600 text-white p-1 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button className="px-2 p-1 bg-blue-500 rounded-md m-2 text-white">
                          Assign
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-white flex flex-col md:w-1/5 h-96 rounded-lg">
            <div className="bg-green-500 rounded-t-lg p-2 text-white font-semibold">
              Completed
            </div>
            <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-3">
              {completed &&
                completed.map((item) => {
                  return (
                    <div
                      className="m-1 p-1 flex flex-col rounded-md bg-gray-200"
                      key={item.id}
                    >
                      <div className="flex flex-row justify-between pt-2 px-2">
                        <h1 className="font-semibold text-xl">{item.title}</h1>
                        <p className="w-fit h-fit rounded-md text-white font-semibold bg-blue-500 px-1">
                          {item.priority}
                        </p>
                      </div>
                      <div className="h-[1px] bg-black m-2"></div>
                      <div className="px-2">{item.description}</div>
                      <div className="flex flex-row justify-between px-2">
                        <h1 className="font-semibold text-lg">
                          @{item.assignee}
                        </h1>
                        <div className="w-fit flex gap-1 h-fit text-white font-semibold  px-1">
                          {/* <button
                          onClick={() => {
                            Delete(item.id);
                          }}
                          className="bg-red-500 text-white p-1 rounded-md"
                        >
                          Delete
                        </button> */}
                          <button
                            onClick={() => {
                              setedit(true);
                              settoggle(true);
                              setval(item);
                            }}
                            className="bg-blue-600 text-white p-1 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button className="px-2 p-1 bg-blue-500 rounded-md m-2 text-white">
                          Assign
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-white flex flex-col md:w-1/5 h-96 rounded-lg">
            <div className="bg-blue-700 rounded-t-lg p-2 text-white font-semibold">
              Deployed
            </div>
            <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-3">
              {deployed &&
                deployed.map((item) => {
                  return (
                    <div
                      className="m-1 p-1 flex flex-col rounded-md bg-gray-200"
                      key={item.id}
                    >
                      <div className="flex flex-row justify-between pt-2 px-2">
                        <h1 className="font-semibold text-xl">{item.title}</h1>
                        <p className="w-fit h-fit rounded-md text-white font-semibold bg-blue-500 px-1">
                          {item.priority}
                        </p>
                      </div>
                      <div className="h-[1px] bg-black m-2"></div>
                      <div className="px-2">{item.description}</div>
                      <div className="flex flex-row justify-between px-2">
                        <h1 className="font-semibold text-lg">
                          @{item.assignee}
                        </h1>
                        <div className="w-fit flex gap-1 h-fit text-white font-semibold  px-1">
                          <button
                            onClick={() => {
                              Delete(item.id);
                            }}
                            className="bg-red-500 text-white p-1 rounded-md"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setedit(true);
                              settoggle(true);
                              setval(item);
                            }}
                            className="bg-blue-600 text-white p-1 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button className="px-2 p-1 bg-blue-500 rounded-md m-2 text-white">
                          Assign
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="bg-white flex flex-col md:w-1/5 h-96 rounded-lg">
            <div className="bg-red-600 rounded-t-lg p-2 text-white font-semibold">
              Deffered
            </div>
            <div className="overflow-y-scroll overflow-x-hidden flex flex-col gap-3">
              {deffered &&
                deffered.map((item) => {
                  return (
                    <div
                      className="m-1 p-1 flex flex-col rounded-md bg-gray-200"
                      key={item.id}
                    >
                      <div className="flex flex-row justify-between pt-2 px-2">
                        <h1 className="font-semibold text-xl">{item.title}</h1>
                        <p className="w-fit h-fit rounded-md text-white font-semibold bg-blue-500 px-1">
                          {item.priority}
                        </p>
                      </div>
                      <div className="h-[1px] bg-black m-2"></div>
                      <div className="px-2">{item.description}</div>
                      <div className="flex flex-row justify-between px-2">
                        <h1 className="font-semibold text-lg">
                          @{item.assignee}
                        </h1>
                        <div className="w-fit flex gap-1 h-fit text-white font-semibold  px-1">
                          <button
                            onClick={() => {
                              Delete(item.id);
                            }}
                            className="bg-red-500 text-white p-1 rounded-md"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              setedit(true);
                              settoggle(true);
                              setval(item);
                            }}
                            className="bg-blue-500 text-white p-1 rounded-md"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                      <div className="">
                        <button className="px-2 p-1 bg-blue-500 rounded-md m-2 text-white">
                          Assign
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
