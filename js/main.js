;(function(){
    var canvEle=document.getElementById("arrowLine"),
        canv=canvEle.getContext('2d');

    canv.strokeStyle="#0000ff";
    canv.lineWidth=2;
    canv.font = '14px Helvetica';
    canv.textBaseline = 'middle';//设置文本的垂直对齐方式
    canv.textAlign = 'center'; //设置文本的水平对对齐方式


    var paint=(function(){

        var arrowList=[],
            options=[],
            startPoint={},
            endPoint={},
            canvEle,
            canv;

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
            canv.fillStyle="orange";
            //canv.strokeRect(x-30,y-15,60,30);
            canv.fillRect(x-30,y-15,60,30);
        }



        function init(){

            var mousedown=false;

            canvEle.addEventListener("mousedown",function(e){
                mousedown=true;
                startPoint={
                    x:e.offsetX,
                    y:e.offsetY
                }
            })

            canvEle.addEventListener("mousemove",function(e){
                if(!mousedown){return ""};

                rePaint();

                onePaint({"startPoint":startPoint,"endPoint":{"x":e.offsetX,"y":e.offsetY}});
            })

            canvEle.addEventListener("mouseup",function(e){
                mousedown=false;
                endPoint={
                    x:e.offsetX,
                    y:e.offsetY
                };

                arrowList.push({"startPoint":startPoint,"endPoint":endPoint});
                rePaint();
            })
        }

        function onePaint(point){
            ar.set(point.startPoint,point.endPoint);
            ar.paint(canv);
        }

        function rePaint(){
            canv.clearRect(0,0,canvEle.width,canvEle.height);

            paintOption();

            paintArrow();
        }

        function config(canvE,can,obj){
            canvEle=canvE;
            canv=can;

            options=obj;

            paintOption();

            return this;
        }


        return {
            config:config,
            init:init
        }

    })();

    var options=[
        [
            {
                "title":"选项0,0",
                "id":"0,0"
            },
            {
                "title":"选项0,1",
                "id":"0,1"
            }
        ],
        [
            {
                "title":"选项1,0",
                "id":"1,0"
            },
            {
                "title":"选项1,1",
                "id":"1,1"
            }
        ],
        [
            {
                "title":"选项2,0",
                "id":"2,0"
            },
            {
                "title":"选项2,1",
                "id":"2,1"
            },
            {
                "title":"选项2,2",
                "id":"2,2"
            },
            {
                "title":"选项2,3",
                "id":"2,3"
            }
        ]
    ]

    paint.config(canvEle,canv,options).init();

})();
