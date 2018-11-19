class itemsBoxObj {
	constructor(){
		this.nextPageTokien='';
		this.items=[];
		this.size=null;
		this.restOfClips=null;
		this.width=null;
		this.leftScroll=0;
		this.itemWidth=250;
		this.itemMarginRight=30;
		document.body.onresize=()=>{
			this.setSize(document.body.offsetWidth);
			this.setRestOfClips();
		}
	}
	createInterface(items){
		container.innerHTML='';
		this.createItemsBoxDom();
		this.createItemsWrapperDom();
		this.addItems(items);
		this.setSize(document.body.offsetWidth);
		this.setMouseSwipe();
		this.setMobileSwipe();
		this.setRestOfClips();

	}
	createItemsBoxDom(){
		this.itemsBoxDom=document.createElement("div");
		this.itemsBoxDom.id="itemsBoxDom";
		container.appendChild(this.itemsBoxDom);
	}
	createItemsWrapperDom(){
		this.itemsWrapperDom=document.createElement("div");
		this.itemsWrapperDom.id="itemsWrapperDom";
		this.itemsBoxDom.appendChild(this.itemsWrapperDom);
	}
	addItems(items){
		items.forEach((item)=>{
			this.items.push(item);
			let itemDom=document.createElement("div");
			itemDom.classList.add("itemDom");
			this.itemsWrapperDom.appendChild(itemDom);
			let title=document.createElement('h2');
			title.innerHTML=item.title;
			itemDom.appendChild(title);
			let image=document.createElement('img');
			image.src=item.imageUrl;
			itemDom.appendChild(image);
			let description=document.createElement('p');
			description.innerHTML=item.description.slice(0,200);
			itemDom.appendChild(description);
			let viewCount=document.createElement('p');
			viewCount.innerHTML=item.viewCount;
			itemDom.appendChild(viewCount);
			let link=document.createElement('a');
			link.innerHTML='Перейти';
			link.href="https://youtube.com/watch?v="+item.id;
			link.target="_blank";
			itemDom.appendChild(link);
		})
	}
	setSize(screenWidth){
		document.getElementById('size').innerHTML=screenWidth;
		this.size=Math.min(4,Math.floor(screenWidth/(this.itemWidth+
			this.itemMarginRight)));
		this.width=this.size*(this.itemWidth+this.itemMarginRight)-
		this.itemMarginRight;
		this.itemsBoxDom.style.width=this.width+"px";
	}
	setRestOfClips(){
		this.restOfClips=this.items.length-this.size+this.leftScroll;
		if(this.restOfClips<this.size)
			makeRequest(this);
	}
	deleteMouseSwipe(){
		let elem=this.itemsWrapperDom;
		elem.onmousedown=null;
	}
	setMouseSwipe(){
		let elem=this.itemsWrapperDom;
		let deltaLeft=0;
		elem.ondragstart=()=>{
			return false;
		}
		elem.onmousedown=(e)=>{
			//console.log('mousedown');
			let startLeftScroll=this.leftScroll;
			let startLeftMouse=e.pageX;
			elem.onmousemove=(e)=>{
				deltaLeft=e.pageX-startLeftMouse;
				const finishMove=()=>{
					deltaLeft=this.size*Math.sign(deltaLeft)*(Math.abs(deltaLeft)>20 ? 1 : 0);
					this.leftScroll=Math.min(0,startLeftScroll+deltaLeft);
					let promise=new Promise((resolve,reject)=>{
						this.setRestOfClips();
						resolve();
					})
					promise.then(()=>{
						elem.style.left=this.leftScroll*(this.itemWidth+this.itemMarginRight)+"px";
					})
					elem.onmousemove=null;
					elem.onmouseleave=null;
					window.onmouseup=null;
				}
				elem.onmouseleave=finishMove;
				window.onmouseup=finishMove;
			}
		}
	}
	setMobileSwipe(){
		let elem=this.itemsWrapperDom;
		let p=document.createElement('p');
		document.body.appendChild(p);
		elem.ontouchstart=(e)=>{
			let startLeftScroll=this.leftScroll;
			let startLeftTouch=e.touches[0].pageX;
			elem.ontouchmove=(e)=>{
				let deltaLeft=e.touches[0].pageX-startLeftTouch;
				deltaLeft=Math.abs(deltaLeft)>10 ? this.size*Math.sign(deltaLeft) : 0;
				this.leftScroll=Math.min(0,startLeftScroll+deltaLeft);
				this.setRestOfClips();
				p.innerHTML=this.leftScroll;elem.style.left=this.leftScroll*(this.itemWidth+this.itemMarginRight)+"px";
			}  
		}
	}
}
const search=document.getElementById('search');
const query=document.getElementById('query');
const results=document.getElementById('results');
const container=document.getElementById('container');
function init(){
	gapi.client.setApiKey('AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y');
	gapi.client.load('youtube','v3');
}
search.onclick=(e)=>{
	const itemsBox=new itemsBoxObj();
	makeRequest(itemsBox);
}
function makeRequest(itemsBox){
	if(itemsBox.items.length>0)
	{
		itemsBox.deleteMouseSwipe();
		document.body.onresize=null;
	}
	let request=gapi.client.youtube.search.list({
		part:"snippet",
		type:"video",
		pageToken:itemsBox.nextPageToken,
		q:query.value,
		maxResults:8	
	})
	let itemsArr=[];
	let promise=new Promise((resolve,reject)=>{
		request.execute(function(response){
			//console.log(response.nextPageToken)
			itemsBox.nextPageToken=response.nextPageToken;
			itemsArr=response.items.map((item)=>{
				return {
					title:item.snippet.title,
					description:item.snippet.description,
					channelId:item.snippet.channelId,
					channelTitle:item.channelTitle,
					id:item.id.videoId,
					imageUrl:item.snippet.thumbnails.medium.url
				}
			})
			resolve();
		})
	})
	promise.then(()=>{
		let idsConcat=itemsArr.reduce((str,item,ind)=>{
			str+=(ind===0 ? '' : ',')+item.id;
			return str;
		},'')
		let request=gapi.client.youtube.videos.list({
			id:idsConcat,
			part:"snippet,statistics"
		})
		request.execute(function(response){
			let items=response.items;
			itemsArr.forEach((item,ind)=>{
				item.viewCount=items[ind].statistics.viewCount;
			})
			if(itemsBox.items.length>0)
			{
				itemsBox.addItems(itemsArr);
				itemsBox.setMouseSwipe();
				document.body.onresize=()=>{
					itemsBox.setSize(document.body.offsetWidth);
					itemsBox.setRestOfClips();
				}
			}
			else
				itemsBox.createInterface(itemsArr);
		})
	})	
}


