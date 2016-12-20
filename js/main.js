;(function(){
    var canvEle=document.getElementById("arrowLine"),
        canv=canvEle.getContext('2d');

    canv.strokeStyle="#0000ff";
    canv.lineWidth=2;
    canv.font = '14px Helvetica';
    canv.textBaseline = 'middle';//设置文本的垂直对齐方式
    canv.textAlign = 'center'; //设置文本的水平对对齐方式


    var options=[
        [
            {
                "title":"选项0,0",
                "id":"0,0",
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

    paint.config(canvEle,canv,options,{width:40,height:15,bgColor:"orange"}).init();

    initEvent();

    function initEvent(){
        document.getElementById("clear").addEventListener("click",function(){
            paint.clear();
        })

        document.getElementById("back").addEventListener("click",function(){
            paint.goBack();
        })
    }

})();
