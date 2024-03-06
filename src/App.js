import './App.css';
import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [text, setText] = useState('');

  useEffect(() => {
    const docRef = doc(db, "texts", "yourUniqueDocumentId");
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setText(data.content);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleTextChange = async (event) => {
    const newText = event.target.value;
    setText(newText);

    const docRef = doc(db, "texts", "yourUniqueDocumentId");

    try {
      await setDoc(docRef, {
        content: newText,
        timestamp: new Date()
      });
      console.log("Dokument erfolgreich aktualisiert!");
    } catch (e) {
      console.error("Fehler beim Aktualisieren des Dokuments: ", e);
    }
  };

  return (
    <div className="App">
      <textarea 
        style={{ 
          height: '99vh', 
          width: '100%', 
          border: 'none', 
          margin: 0, 
          padding: '10px', 
          boxSizing: 'border-box', 
          resize: 'none' 
        }}
        value={text}
        onChange={handleTextChange}
      ></textarea>
    </div>
  );
}

export default App;
