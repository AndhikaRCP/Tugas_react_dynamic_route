import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

function App (){
    const NPM = useParams();
    console.log(NPM);
}

export default App;
