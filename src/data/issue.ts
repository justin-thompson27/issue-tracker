

export interface Issue { //interface containing possible issues
  id: number;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
}

export const issues : Issue[] = [ //array made using issue interface
  {id: 1, title: "Missing Login" ,description: "Login function not appearing",status: "open", priority:"high"},
  {id: 2, title: "Incorrect Password" ,description: "Password is being entered correctly but still is flagged as incorrect",status: "in-progress", priority:"high"},
  {id: 3, title: "Page failing to load" ,description: "Page infinitely loads over and over again",status: "closed", priority:"low"}

]

let nextId = 4;
 
export function getNextId(): number {
  return nextId++;
}
