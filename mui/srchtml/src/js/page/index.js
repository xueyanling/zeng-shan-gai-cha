define(["mui"],function(){
	function init(){
		mui.init()
		getData(mui)
	}
	//初始化列表
	function getData(mui){
		mui.ajax("/getList",{
			type:"get",
			success:function(obj){
				rander(obj)
				//console.log(obj)
			}
		})
	}
	//渲染
	function rander(obj){
		let data=obj.data
		console.log(obj.data)
		let str=""
		data.map((item)=>{
			str+=`<li class="mui-table-view-cell">
					<span>${item.name}</span>
					<div class="chose">
						<button type="button" class="mui-btn btn-change" data-id="${item._id}">
							编辑
						</button>
						<button type="button" class="mui-btn btn-remove" data-id="${item._id}">
							删除
						</button>
				</li>`
		})
		megList.innerHTML=str
		mui("#megList").on("tap","button",function(e){
			let tar=e.target
			//console.log(e.target)
			removEvent(tar)
			changEvent(tar)
		})
	}
	//删除数据
	function removEvent(tar){
		let id=tar.getAttribute("data-id")
		//console.log(id)
		if(tar.classList.contains("btn-remove")){
			mui.ajax("/delList",{
				data:{_id:id},
				success:function(obj){
					if(obj.code==1){
						let lis=tar.parentNode.parentNode;
						lis.parentNode.removeChild(lis)
					}
					//console.log(obj)
				}
			})
		}
	}
	//修改数据
	function changEvent(tar){
		let id=tar.getAttribute("data-id")
		if(tar.classList.contains("btn-change")){
			mui.ajax("/upList",{
				type:"post",
				data:{_id:id},
				success:function(obj){
					console.log(obj.data[0]._id)
					location.href="../../htmlPage/addinfo.html?id="+ obj.data[0]._id
				}
			})
		}
	}
	init()
})