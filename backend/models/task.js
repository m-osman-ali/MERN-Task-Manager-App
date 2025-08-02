import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    taskName:{
        type: String,
        require: true
    },
    isDone:{
        type: Boolean,
        require: true
    }
})

const TaskModel = mongoose.model('todos', TaskSchema);

export default TaskModel;