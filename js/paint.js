/**
 * Created by Administrator on 2016/12/20 0020.
 */
(function(){
    var paint=(function(){

        var arrowList=[],
            options=[],
            startPoint={},
            endPoint={},
            startOption=null,
            endOption=null,
            canvEle,
            canv;

        var idList=[],  //存储选择的optionid
            keyOptions={};  //对options整理，以id为key

        var params={
            width:30,
            height:15
        };

        var ar=new window.mapleque.arrow();

        function paintArrow(){
            arrowList.forEach(function(arrowItem){
                ar.set(arrowItem.startPoint,arrowItem.endPoint);
                ar.paint(canv);
            })
        }

        function paintOption(){
            var l=options.length,
                _x=canvEle.width/ (l+1),
                _y=0;

            options.forEach(function(list,index){
                _y=canvEle.height/(list.length+1);
                list.forEach(function(option,_index){
                    var x=(index+1)*_x,
                        y=(_index+1)*_y;

                    option.center={"x":x,"y":y};
                    option.level=index;

                    drawRect(x,y);
                    drawText(option.title,x,y);
                })
            })
        }

        //画文本
        function drawText(text,x,y) {
            canv.fillStyle = '#fff';
            //canv.strokeStyle = 'cornflowerblue';
            canv.fillText(text, x, y);
        };

        //画矩形
        function drawRect(x,y){
            canv.fillStyle=params.bgColor;

            canv.fillRect(x-params.width,y-params.height,params.width*2,params.height*2);
        }



        function init(){

            var mousedown=false;

            canvEle.addEventListener("mousedown",function(e){
                var point={
                    x:e.offsetX,
                    y:e.offsetY
                },option= getOptions(point);

                //检查落点是否在选项内
                if(!option){return ""}

                //记录选项
                startOption=option;

                point.x=option.center.x+params.width;
                point.y=option.center.y;

                mousedown=true;
                startPoint=point;
            })

            canvEle.addEventListener("mousemove",function(e){
                if(!mousedown){return ""};

                rePaint();

                onePaint({"startPoint":startPoint,"endPoint":{"x":e.offsetX,"y":e.offsetY}});
            })

            canvEle.addEventListener("mouseup",function(e){
                var point={
                    x:e.offsetX,
                    y:e.offsetY
                },option= getOptions(point);

                mousedown=false;

                endOption=option;

                //检查落点是否在选项内
                if(!option){rePaint();return ""}

                if(!checkLegitimate()){
                    rePaint();return ""
                }

                point.x=option.center.x-params.width;
                point.y=option.center.y;

                endPoint=point;

                idList.push([startOption.id,endOption.id].join(";"));console.log(idList)

                arrowList.push({"startPoint":startPoint,"endPoint":endPoint});
                rePaint();
            })
        }

        function checkLegitimate(){
            //检查选项是否符合要求
            //层级
            if((endOption.level-startOption.level)!==1){
                return false
            }

            //是否包含
            if(idList.indexOf(startOption.id+";"+endOption.id)>-1){
                return false
            }

            //复选检查
            /*
             Multiselect
             BeMultiselected
             */
            if(!startOption.Multiselect&&idsHas(startOption.id+";")){
                return false
            }
            if(!endOption.BeMultiselected&&idsHas(";"+endOption.id)){
                return false
            }

            return true
        }

        function idsHas(str){
            var idsStr=idList.join("#");
            if(idsStr.indexOf(str)>-1){
                return true;
            }else{
                return false;
            }
        }

        function onePaint(point){
            ar.set(point.startPoint,point.endPoint);
            ar.paint(canv);
        }

        function getOptions(point){

            for(var i in keyOptions){
                var option=keyOptions[i],
                    center=option.center;
                if(Math.abs(center.x-point.x)<=params.width&&Math.abs(center.y-point.y)<=params.height){
                    return option;
                }
            }

            return null;
        }

        function rePaint(){
            canv.clearRect(0,0,canvEle.width,canvEle.height);

            paintOption();

            paintArrow();
        }

        function goBack(){
            idList.pop();
            arrowList.pop();
            rePaint();
        }

        function clear(){
            idList=[];
            arrowList=[];
            rePaint();
        }

        function config(canvE,can,obj,style){
            canvEle=canvE;
            canv=can;

            options=obj;

            formatSelect(options);

            params=Object.assign(params,style);

            paintOption();

            return this;
        }

        //判断是否可以多选，是否支持多次被选中
        function formatSelect(options){
            //options  二维数组
            //以键值对的形式整理options方便检索

            for(var m=0;m<options.length;m++){
                var list=options[m],
                    length=list.length,
                    preList=options[m-1],
                    nextList=options[m+1],
                    preLength= preList&&preList.length||0,
                    nextLength= nextList&&nextList.length||0,
                    Multiselect=false,
                    BeMultiselected=false;

                if(preLength&&preLength>length){
                    BeMultiselected=true;
                }else{
                    BeMultiselected=false;
                }

                if(nextLength&&length<nextLength){
                    Multiselect=true;
                }else{
                    Multiselect=false;
                }

                for(var n=0;n<length;n++){
                    list[n].Multiselect=Multiselect;
                    list[n].BeMultiselected=BeMultiselected;
                    keyOptions[list[n].id]=list[n];
                }

            }
        }

        function getResult(){
            return idList;
        }

        return {
            config:config,
            init:init,
            goBack:goBack,
            clear:clear,
            getResult:getResult
        }

    })();

    window.paint=paint;
})()