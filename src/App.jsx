import React, { useEffect, useState } from "react";
// Styles
import "./sass/index.scss";
// Firestore
import { collection, onSnapshot } from "firebase/firestore";
import store from "./FIrebase/firebaseConfig";
// Components
import AddComponent from "./components/addcomponent";
import ListComponent from "./components/listComponent";
import ConfigComponent from "./components/configComponent";
import HeaderComponent from "./components/headerComponent";
import FooterComponent from "./components/footerComponent";
import MsgComponent from "./components/msgComponent";
// Img
import HeaderDarkMobile from "./assets/img/bg-mobile-dark.jpg";
import HeaderDarkDesktop from "./assets/img/bg-desktop-dark.jpg";
import HeaderLightMobile from "./assets/img/bg-mobile-light.jpg";
import HeaderLightDesktop from "./assets/img/bg-desktop-light.jpg";
// Icon
import { BiLoaderAlt } from "react-icons/bi";

const App = () => {
  const [Tasks, setTasks] = useState([]);
  const [TasksAll, setTasksAll] = useState([]);
  const [Theme, setTheme] = useState("dark");
  const [Id, setId] = useState(null);
  const [CurrentFilter, setCurrentFilter] = useState("all");
  const [Reset, setReset] = useState(false);
  const [Loading, setLoading] = useState(true);
  useEffect(() => {
    onSnapshot(collection(store, "tareas"), snapshot => {
      let temp = [];
      snapshot.docs.forEach(doc => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setLoading(false);
      setTasks(temp);
      setTasksAll(temp);

      const completed = temp.filter(task => task.completed);
      let arrCompleted = [];
      completed.forEach(item => {
        arrCompleted.push(item.id);
      });
      setCompleted(arrCompleted);
    });
  }, []);

  const setCompleted = newId => setId(newId);

  const changeTheme = newTheme => setTheme(newTheme);

  const getAllTasks = () => (setTasks(TasksAll), setCurrentFilter("all"));

  const getActiveTasks = activeTasks => (
    setTasks(activeTasks), setCurrentFilter("active")
  );

  const getCompletedTasks = completedTasks => (
    setTasks(completedTasks), setCurrentFilter("completed")
  );

  const reset = isReset => setReset(isReset);

  return (
    <>
      <img
        src={HeaderDarkDesktop}
        className="img-dark-desktop"
        alt="desktop header dark"
      />
      <img
        src={HeaderDarkMobile}
        className="img-dark-mobile"
        alt="mobile header dark"
      />
      <img
        src={HeaderLightDesktop}
        className="img-light-desktop"
        alt="desktop header light"
      />
      <img
        src={HeaderLightMobile}
        className="img-light-mobile"
        alt="mobile hader light"
      />
      <div className={"content " + Theme}>
        <HeaderComponent changeTheme={changeTheme} />
        <AddComponent countTask={Tasks.length} setReset={reset} reset={Reset} />
        {Loading ? (
          <div className="loading">
            <h2>Loading...</h2>
            <BiLoaderAlt className="icon-loading" />
          </div>
        ) : null}
        <MsgComponent tasks={Tasks} filter={CurrentFilter} loading={Loading} />
        <ListComponent list={Tasks} />
        <ConfigComponent
          numTasks={Tasks.length}
          completed={Id}
          staticTasks={TasksAll}
          getAll={getAllTasks}
          getActive={getActiveTasks}
          getCompleted={getCompletedTasks}
          reset={Reset}
        />
        <FooterComponent />
      </div>
    </>
  );
};

export default App;
