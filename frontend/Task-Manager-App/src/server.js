import Post_URL from './utils.js'


export const createTask = async(taskObj)=>{
    const url = `${Post_URL}tasks`;
    const opt = {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskObj)
    }
    try{
      const results = await fetch(url, opt);
      const data = await results.json();
      return data;
    }catch(err){
        return err;
    }
}



export const getAllTasks = async()=>{
    const url = `${Post_URL}tasks`;
    const opt = {
        method: "GET",
        headers:{
            'Content-Type': 'application/json'
        }
       
    }
    try{
      const results = await fetch(url, opt);
      const data = await results.json();
      return data;
    }catch(err){
        return err;
    }
}

export const DeleteTask = async(id)=>{
    const url = `${Post_URL}tasks/${id}`;
    const opt = {
        method: "DELETE",
        headers:{
            'Content-Type': 'application/json'
        }
       
    }
    try{
      const results = await fetch(url, opt);
      const data = await results.json();
      return data;
    }catch(err){
        return err;
    }
}

export const updateTask = async(id,obj)=>{
    const url = `${Post_URL}tasks/${id}`;
    const opt = {
        method: "PUT",
        headers:{
            'Content-Type': 'application/json'
        }, body: JSON.stringify(obj)
       
    }
    try{
      const results = await fetch(url, opt);
      const data = await results.json();
      return data;
    }catch(err){
        return err;
    }
}
