const fs=require('fs')

fs.readFile('./msg.txt','utf-8',(err,data)=>{

    console.log(data)
})

const quote="As you sow so you reap"
fs.writeFile('./quotes.js',quote,(err)=>{

    console.log('Created quote file')
})

const data= '\nDreams do come true'
fs.appendFile('./quotes.txt',data,(err)=>{

    console.log('Updated Quote file')
})

const [,,j]=process.argv
for(let i=1;i<=j;i++)
{
    fs.writeFile(`./back-ups/test-file${i}.html`,quote,(err)=>{
        console.log(`Test file ${i} created.`)
    })
}

// fs.readFile('./msg.txt','utf-8',(err,quotedata)=>{

//     console.log(quotedata)

    
// fs.writeFile('./cool.html',quotedata,(err)=>{

//     console.log('Created cool file')
// })
// })


fs.copyFile('./msg.txt','./copymsg.html',err=>{

    console.log(err)
})
