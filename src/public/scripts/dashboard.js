document.addEventListener('DOMContentLoaded',()=>{
    console.log("dom content loaded");
    document.getElementById("create-task-btn").addEventListener('click',submitNewTask);
});

const submitNewTask= ()=>{
    var newTask= document.getElementById("new-task");
    let task ={};
    task.description= newTask.value;
    if(newTask!=undefined){
        fetch('/tasks',{
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        .then(function(response){
            if(response.status==201){
                document.getElementById("new-task-success").innerHTML = "Successfully created all the tasks";
                document.getElementById("new-task-error").innerHTML= "";
                document.getElementsByName("new-task-form")[0].reset();
            }else{
                document.getElementById("new-task-success").innerHTML = "";
                document.getElementById("new-task-error").innerHTML = "Error when creting tasks";
                document.getElementsByName("new-task-form")[0].reset();
            }
        })
    }else{
        document.getElementById("new-task-success").innerHTML = "";
        document.getElementById("new-task-error").innerHTML = "You should atleat fill the task";
    }
}