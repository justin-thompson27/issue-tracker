import { IssueUserRef } from "../data/issue.js";

declare global { //adds or modify the a definition of an object in on a global scale in typescript 
  namespace Express{ //namespace declares that the code will belong to this specific type which is express 
    interface Request { // the interface Request belongs to the express namesapce/module 
      user: IssueUserRef; //adds user property to Request that is type of issueUserRef
    }
  }
}

export {}; //This file is a module not a script that will have anything exported or imported from it. 
//For it to count as a module the export has to be empty.
//modules have local scope while scripts have global scope for this to be treated as a module it needs to have at least one import or export statement.