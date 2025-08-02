import TaskModel from "../models/task.js";



const createTask = async (req, res)=>{
    const data = req.body;

    try{
        if(!data.taskName || typeof data.taskName !== 'string' || data.taskName.trim() === ''){
            return res.status(400).json({ message: "Field is empty" });
        }
        const model = await new TaskModel(data);
       await model.save();
        res.status(200)
        .json({message:'Task Created Successfuly', success: true});

    }catch(err){
        res.status(500).json({message: ' Failed to Create the Task', success: false});
    }
}



const fetchTask = async (req, res)=>{
   
    try{
        const model = await TaskModel.find({});
       
        res.status(200)
        .json({message:'All Tasks', success: true, model});

    }catch(err){
        res.status(500).json({message: ' Failed to Find Task', success: false});
    }
}



const updateById = async (req, res)=>{
   
    try{
        const id = req.params.id;
        const body = req.body;
        const obj = {$set: {...body}}
        await TaskModel.findByIdAndUpdate(id, obj);
       
        res.status(201)
        .json({message:'Updated Successfuly', success: true,});

    }catch(err){
        res.status(500).json({message: 'Cannot find the object', success: false});
    }
}

const deleteByID = async (req, res)=>{
   
    try{
        const id = req.params.id;
        await TaskModel.findByIdAndDelete(id);
       
        res.status(200)
        .json({message:'Deleted Successfuly', success: true,});

    }catch(err){
        res.status(500).json({message: 'Failed to Delete', success: false});
    }
}


export {
  createTask,
  fetchTask,
  updateById,
  deleteByID,
};