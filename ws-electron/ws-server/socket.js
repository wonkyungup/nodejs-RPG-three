const ws = require('ws');
const wsServer = new ws.Server({ port : 55555 });

module.exports = () =>{
    wsServer.on('connection', (ws,req)=>{
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        console.log('new Client',ip);
    
        ws.on('message',(message)=>{
            
            console.log("Client Input: "+ message);
            ws.send(message);
            wsServer.clients.forEach((client)=>{
                if (client !== ws && client.readyState === ws.OPEN){
                    client.send(message);
                }
            })
            list_save(message);
            
        });
        ws.on('error',(error)=>{
            console.error(error);
        });
        ws.on('close',()=>{
            console.log('close');
    });
  });
  const list_save = (data) =>{

    let formatedTimestamp = ()=> {
        const d = new Date()
        const date = d.toISOString().split('T')[0];
        const time = d.toTimeString().split(' ')[0].replace(':','-');
        return `${date}`
    }

    const fs = require('fs');
    fs.appendFile('C:\\Users\\WON\\Desktop\\echo\\ws-electron\\data\\'+formatedTimestamp()+'.txt' , data + "\n" , (err)=>{
        if(err){
            throw err;
        }
    });
    };
};
