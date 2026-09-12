import { useState , useEffect } from 'react'

import './App.css'


interface Issue { //interface containing possible issues
  id: number;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
}


function App() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error,setError] = useState<string | null>(null);

    useEffect(() => {
      fetch("/issues")
       .then((res) => res.json())
        .then(setIssues)
        .catch((err) => setError(err.message));
  }, []);

  return (
    <>
    
     <div style={{fontFamily: "cursive" , padding: "1em"}}>
        {error && <p style={{color: "red"}}>Error: {error}</p>}
       
        <ul>
          {issues.map((i) => (
            <li key={i.id}>{i.title}</li>
          ))}
        </ul>



      </div>
    
    
    </>
   
      
    
    
  );
}

export default App
