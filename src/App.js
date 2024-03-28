import './App.css';
import React from 'react';
import Filter from './components/Filter';
import Navbar from './components/Navbar';
import Cards from './components/Cards';
import Spinner from './components/Spinner';
import { apiUrl,filterData } from './data';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const App=()=> {

  const [courses,setCourses] = useState([]);
  const [loading,setLoading] = useState(true);
  const [category,setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{

      const res = await fetch(apiUrl);
      const output = await res.json();

      setCourses(output.data);

    }catch(err){
      toast.error("Something Went Wrong");
    }
    setLoading(false);
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
        <div>
          <Navbar />
        </div>
        <div>
        <div>
          <Filter 
          filterData={filterData}
          category={category}
          setCategory={setCategory}
          ></Filter>
        </div>
        <div className="w-11/12 max-w-[1200px] min-h-[50vh] mx-auto flex flex-wrap justify-center items-center" >
          {
            loading ? (<Spinner />) : (<Cards courses={courses}  category={category} />) 
          }
        </div>
        </div>
    </div>
  );
}

export default App;
