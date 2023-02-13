let searchaddtext=document.getElementById("searchtype");
let buttonadd=document.getElementById("add");
var target=document.getElementById("todosee");
var count=0;
var arraylist=[];
var delcount=0;



// function addButton(){
//     count++;
//     let a=searchaddtext.value;
//     if(a=="")
//     {
//         alert("write some text")
//     }
//     else{
//         //var newElement=`<p><input type="checkbox">${a}</p>`;
//         // var newElement=`<div><input type="checkbox"></input><div style="display:inline-block">-</div><p style="text-decoration:line-through;display:inline">${a}</p></div>`;
//         var newElement=`<div><input id="idd${count}" type="checkbox" style="text-decoration:line-through" onclick="checKmy(this)"><div style="display:inline-block">-</div>${a}</input><button id="deletebutton${count}" onclick="deleteText(this)">Delete</button>`;
//         target.insertAdjacentHTML("beforeend",newElement);
//         searchaddtext.value="";

//     }
    
// }

// function checKmy(x){
//     if(x.checked==true){

//         console.log(x);
//         console.log(document.getElementById(`${x.id}`).parentElement.style.textDecoration="line-through");
//     }
// }

// function deleteText(y){
//     console.log(document.getElementById(`${y.id}`).parentElement.style.display="none");
// }


function load(){
    if(localStorage.getItem("name")!=null){
        arraylist=JSON.parse(localStorage.getItem("name"));
        render(arraylist);
    }
    if(localStorage.getItem("delcount")!=0){
        delcount=Number(localStorage.getItem("delcount"));
    }
    else{
        localStorage.setItem("delcount",0);
        delcount=Number(localStorage.getItem("delcount"));
    }

    if(localStorage.getItem("count")!=0){
        count=Number(localStorage.getItem("count"));
    }
    
}
window.onload=load;


function addButton(){
    count=Number(localStorage.getItem("count"));
    console.log(count);
    if(searchaddtext.value=="")
    {
        alert("Enter Input Text");
    }
    else{
        count++;
        arraylist.push({
            name:`${searchaddtext.value}`,
            complete:false,
            id:`${count}`,
        })
        searchaddtext.value="";
        render(arraylist);
        localStorage.setItem("name",JSON.stringify(arraylist));
    }
    localStorage.setItem("count",count);
    document.getElementById("add").style.display="block";
    document.getElementById("addsave").style.display="none";
    if(document.getElementsByTagName("button").length!=0){
        var disnone=document.getElementsByTagName("button");
        for(let i=0;i<disnone.length;i++){
            disnone[i].style.display="clock";
        }
        //document.getElementsByTagName("button").style.display="none";
    }

}
function onlyif(){
    count=Number(localStorage.getItem("count"));
    window.addEventListener("keyup",keys=(event)=>{
            if(event.key=="Enter"){
                if(searchaddtext.value=="")
                {
                    alert("Enter Input Text");
                }
                else{
                    count++;
                    arraylist.push({
                    name:`${searchtype.value}`,
                    complete:false,
                    id:`${count}`,
                })
                searchtype.value="";
                render(arraylist);
                localStorage.setItem("name",JSON.stringify(arraylist));
                }
                console.log(count);
                localStorage.setItem("count",count);
                document.getElementById("add").style.display="block";
                document.getElementById("addsave").style.display="none";
                if(document.getElementsByTagName("button").length!=0){
                    var disnone=document.getElementsByTagName("button");
                    for(let i=0;i<disnone.length;i++){
                        disnone[i].style.display="clock";
                    }
                    //document.getElementsByTagName("button").style.display="none";
                }
            }
    })
    
}


function render(todo){
    target.innerHTML="";
    if(todo.length==0){
        target.innerHTML="Nothing To Show";
    }
    else{
        todo.forEach(function(x){  
            if(x.complete==true){
                target.insertAdjacentHTML("beforeend",`<p style="text-decoration:line-through"><input class="tick" type="checkbox" id="${x.id}" onclick="checkMy(this)" checked></input>${x.name}<button class="right decor" id="${x.id}" onclick="del(this)">Delete</button><button class="right" id="${x.id}" onclick="update(this)">Update</button></p>`);    
            }else{
                target.insertAdjacentHTML("beforeend",`<p><input class="tick" type="checkbox" id="${x.id}" onclick="checkMy(this)"></input>${x.name}<button class="right decor" id="${x.id}" onclick="del(this)">Delete</button><button class="right" id="${x.id}" onclick="update(this)">Update</button></p>`);
            }
        })
    }
}

function del(delp){
    delcount=localStorage.getItem("delcount");
    delcount++;
    console.log("delete element:"+arraylist.splice(delp.id-delcount,1));
    localStorage.setItem("delcount",delcount);
    render(arraylist);
    localStorage.setItem("name",JSON.stringify(arraylist));
}

function update(up){
    var upx=localStorage.getItem("delcount");
    searchaddtext.value=`${arraylist[up.id-upx-1].name}`;
    del(up);
    document.getElementById("addsave").style.display="block"
    document.getElementById("add").style.display="none";
    if(document.getElementsByTagName("button").length!=0){
        var disnone=document.getElementsByTagName("button");
        for(let i=0;i<disnone.length;i++){
            disnone[i].style.display="none";
        }
        //document.getElementsByTagName("button").style.display="none";
    }

    


}

function checkMy(chek){
    var newdel=localStorage.getItem("delcount");
    if(document.getElementById(`${chek.id}`).checked==true){
        document.getElementById(`${chek.id}`).parentElement.style.textDecoration="line-through";
        document.getElementById(`${chek.id}`).parentElement.style.color="grey";
        arraylist[chek.id-newdel-1].complete=true;
    }
    else{
        document.getElementById(`${chek.id}`).parentElement.style.textDecoration="none";
        document.getElementById(`${chek.id}`).parentElement.style.color="black";
        arraylist[chek.id-newdel-1].complete=false;
    }    
    localStorage.setItem("name",JSON.stringify(arraylist)); 
}

function searching(searcch){
    let arr=[];
    arraylist.forEach(function(x){
        let a=x.name;
        if(a.includes(searcch.value)){
            arr.push(x);
        }            
   })
    render(arr);
}


///end


