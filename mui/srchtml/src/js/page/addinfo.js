define(["../lib/mui"],function(){
	function init(){
		mui.init()
		let mm=getId();
		//根据地址栏是否欧参数老判断是编辑还是添加
		//console.log(mm)
		if(mm){
			//存在参数是想要修改信息
			rander()
			return;
		}else{
			//不存在就是要添加
			OneEven()
			return;
		}
			
	}
	//添加信息
	function OneEven(){
		//点击确定绑定事件，并执行回调函数
		tureNow.addEventListener("tap",btnEven)
	}
	function btnEven(){
		let newData={
			name:naMe.value,
			age:agE.value,
			card:carD.value,
			address:addRess.value
		}
		//因为是要添加信息所以姓名和身份证不能使空白，身份证是确认身份的唯一性
		if(!naMe || !carD){
			alert("请输入用户名和身份证");
			return;
		}else{
		  //输入信息之后要发起请求，讲此人信息传入数据库
			mui.ajax("/addList",{
				type:"post",
				data:{
					name:naMe.value,
					age:agE.value,
					card:carD.value,
					address:addRess.value
				},
				success:function(obj){
					console.log(obj)
					location.href="../../index.html"
				}
			})
		}
	}
	//更新信息
	function rander(){
		 let mm=getId().id
		 //通过地址连穿过来的参数找到你要修改的数据，渲染到表格中
		 mui.ajax("/upData",{
			 type:"post",
			 data:{_id:mm},
			 success:function(obj){
				 let data=obj.data;
				 data.forEach((item)=>{
					 console.log(item)
					 naMe.value=`${item.name}`
					 agE.value=`${item.age}`
					 carD.value=`${item.card}`
					 addRess.value=`${item.address}`
				 })
			 }
		 })
		 //当信息修改完成后点击确认，通过后台来对数据库更新修改
		 tureNow.addEventListener("tap",upData)
	}
	//对地址栏参数的解析
	function getId(){
		let pathId=location.search;
		if(pathId){
			pathId=pathId.slice(1)
			// console.log("{"+pathId.replace(/&/g,",").replace(/=/g,":")+"}")
			return JSON.parse('{"'+pathId.replace(/&/g,'","').replace(/=/g,'":"')+'"}')
		}else{
			return ;
		}
		
	}
	//新数据的产生
	function upData(){
		let mm=getId().id
		//console.log(mm)
		mui.ajax("/newData",{
			type:"post",
			data:{
				_id:mm,
				name:naMe.value,
				age:agE.value,
				card:carD.value,
				address:addRess.value,
				
			},
			success:function(obj){
				console.log(obj)
				location.href="../../index.html"
			}
		})
	}
	init()
})