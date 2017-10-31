
/* 
  
    Christie Altadonna
    cha415
    CSE 264
    Magnetic Poetry
*/

            var topOffSet;
            var leftOffSet;
            var wordSelected;
            var Button = function(n, xcord, ycord, id, fs){
             this.text = n;
             this.x = xcord;
             this.y = ycord;
             this.index = id;
             this.fontsize = fs;
            };

           

    function addWord(){
        //Add a word 
        var newWord = $("#newWord").val();
        $("#newWord").val("");
        if(newWord !== null && newWord !==" "){
            $("body").append("<button class='word1' type='button' id="+newWord+" style='left:20px; top:90px'>"+newWord+"</button>");
         
        }

    }       
    
    function onMouseDown(obj){
        if(obj.target.className === "word1"){
            wordSelected = obj.target;
            //Get the difference between the cursor and the top left corner of button
            topOffSet = obj.clientY - parseInt(wordSelected.style.top, 10); //wordSelected.offsetTop;
            leftOffSet = obj.clientX - parseInt(wordSelected.style.left, 10);
           

        }
    }
    
    function onMouseMove(obj){
        //if the word selected is not null -move the object
        if(wordSelected){
            // console.log("in if");
            var x = obj.clientX;
            var y = obj.clientY;
            console.log(y);
            console.log(topOffSet);
            wordSelected.style.top = (y-topOffSet)+'px';
            wordSelected.style.left = (x-leftOffSet)+'px';
          
           
        }
    }
    
    function onMouseUp(obj){
       //console.log("in mouse up"+obj.target.id);
       var flag = true;
       if(wordSelected){
        console.log("in if");
       var trash = $("#trashcan");  //Must use an array index bc returns array of objects with #trash as ID
       //call offset 
       var trashOS = trash.offset();
       var trashL = trashOS.left;
       var trashTop = trashOS.top;
       var trashBottom = trashOS.top + trash.outerHeight() //trash.height();
       var trashR = trashOS.left + trash.outerWidth();
       var wordX = parseInt(wordSelected.style.left,10) + wordSelected.clientWidth;
       var wordY = parseInt(wordSelected.style.top, 10) + wordSelected.clientHeight;
       
       if(trashL> wordX || parseInt(wordSelected.style.left, 10) > trashR){
        flag =false;

       }
       if(trashTop > wordY || parseInt(wordSelected.style.top, 10) > trashBottom){
        flag =false;
       }
       if(flag){
        wordSelected.remove();
       }

   }
         wordSelected = null;
    }

   function saveWord(){
                var eleArray = $(".word1");
                console.log($(".word1"));
                var n = eleArray.length;
                var words = {};
                var i;
                for(i = 0; i < n; i++){
                    var element= eleArray[i];
                    var word = new Button(element.textContent, element.style.left, element.style.top,i, element.style.fontSize);
                    words[i] = word; 
                }

//                localStorage.setItem('words',JSON.stringify(words));
                localStorage.words = JSON.stringify(words);
                console.log(eleArray.length);
   }


//$(document).click(
//        function(e) {
function clickWithButton(e){
            var obj = e.target;
            if($(obj).attr("class") === "word1"){
                if(e.altKey || e.ctrlKey || e.metaKey){
                    var fontsize = $(obj).css("fontSize");  //or can use -
                    var pixels = parseFloat(fontsize); //fontsize.substring(0,fontsize.length-2); //or parseFloat
                    if(e.altKey){
                        fontsize = (pixels * 1.5)+"px";
                    }
                    else{
                        fontsize = (pixels / 1.5)+"px";
                    }
                    $(obj).css("fontSize", fontsize);
                }
            }
        }//);

 $(window).on('unload', function(){
                localStorage.clear();
                console.log("in unload");
                saveWord();
     
            });
            

   $(function() {
       var wds = JSON.parse(localStorage.getItem('words'));
        for(var wrd in wds){
            var wd = wds[wrd];
            $("body").append("<button class='word1' type='button' id="+wd.text+" style='top:"+wd.y+"; left:"+wd.x+"; font-size:"+wd.fontsize+"'>"+wd.text+"</button>");
        }
   
     });
    
    function buttonFunction(){
        document.onmousedown = onMouseDown;
        document.onmousemove = onMouseMove;
        document.onmouseup = onMouseUp;
        document.onclick = clickWithButton;

    }
