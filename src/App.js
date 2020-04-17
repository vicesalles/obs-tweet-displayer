import React, { useState, useEffect, createRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function App() {

  const [tuit, setTuit] = useState("20");
  const [form, setForm] = useState("");

  const myContainer = createRef();
  const { twttr } = window;


  // Animació

  const tuitContainer = {
    hidden: { 
      opacity: 0, 
      y: 250, 
      transition: {
        duration: 1
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1
      }
    },
    exit: {
      opacity: 0,
      y: -250,
      scale: 0.5,
      transition: {
        duration: 1
      }
    }
  }

  function updateForm(e) {

    setForm(e.currentTarget.value);


  }

  const buscaTuit = e => {

    e.preventDefault();   
    setTuit(form);

  }

  function createTuit(t) {

    twttr.widgets.createTweet(
      t,
      myContainer.current,
      {
        cards: "hidden"
      }

    );

  }

  useEffect(() => {

    createTuit(tuit);
    setForm("");

  }, [tuit])


  return (
    <AnimatePresence>
      <div className="main">
        <form id="buscar" onSubmit={buscaTuit}>
          <input onChange={updateForm} value={form} />
          <button type="submit">Buscar</button>
        </form>

        <motion.div ref={myContainer}
          key={tuit}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={tuitContainer}
          className="container twittContainer">

        </motion.div>
      </div>
    </AnimatePresence>

  );
}

export default App;
