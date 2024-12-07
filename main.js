const express =require("express");
const {exec} = require("child_process");

const auto_deploy = express();

auto_deploy.post("/git-push-post",(req,res)=>{
    let shell_script_file = "./hello.sh";
    let cmd = `bash ${shell_script_file}`;
    const result = exec(cmd,(err,stdout,stderr)=>{
        if(err){
            console.log(`[ERROR]\n${err}`);
            res.status(500).send("some error occured in unknown...");
        }
        if(stderr){
            console.log(`[STDERR]\n${stderr}`);
            res.status(500).send("some error occured in stderr...");
        }
            console.log(`[STDOUT]\n${stdout}`);
            res.status(200).send("the command executed success...");
    });
});

auto_deploy.listen(2222,()=>{
    console.log("auto server is running on port 2222...");
});