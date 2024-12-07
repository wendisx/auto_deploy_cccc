const express =require("express");
const {exec} = require("child_process");
const dotenv = require("dotenv");
dotenv.config();

const auto_deploy = express();

auto_deploy.post("/git-push-post",(req,res)=>{
    let shell_script_file = process.env.SHELL_SCRIPT_FILE;
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

auto_deploy.listen(process.env.PORT,process.env.HOST,()=>{
    console.log(`auto server is running on http://${process.env.HOST}:${process.env.PORT}`);
});