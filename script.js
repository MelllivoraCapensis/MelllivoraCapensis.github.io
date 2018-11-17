class ItemsBoxObj {
	constructor(items){
	   this.items=items;
       this.size=null;
       this.restOfClips=null;
       this.width=null;
       this.leftScroll=0;
       this.itemWidth=250;
       this.itemMarginRight=30;
       this.createInterface();
       this.setSize(document.body.offsetWidth);
       this.setMouseSwipe();
       this.setMobileSwipe();
       this.setRestOfClips();
       const body=document.body;
       body.onresize=()=>{
       this.setSize(body.offsetWidth);
       this.setRestOfClips();
   }
	}
	createInterface(){
		this.createItemsBoxDom();
		this.createItemsWrapperDom();
		this.fillItemsWrapperDom();
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
	fillItemsWrapperDom(){
		this.items.forEach((item)=>{
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
			description.innerHTML=item.description;
			itemDom.appendChild(description);
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
		console.log(this.restOfClips)
	}
	setMouseSwipe(){
		let elem=this.itemsWrapperDom;
		let deltaLeft=0;
		elem.ondragstart=()=>{
			return false;
		}
		
		elem.onmousedown=(e)=>{
			let startLeftScroll=this.leftScroll;
			let startLeftMouse=e.pageX;
			elem.onmousemove=(e)=>{
               deltaLeft=e.pageX-startLeftMouse;
               elem.onmouseleave=window.onmouseup=()=>{
           		deltaLeft=this.size*Math.sign(deltaLeft);
            	this.leftScroll=Math.min(0,startLeftScroll+deltaLeft);
            	this.setRestOfClips();
                elem.style.left=this.leftScroll*(this.itemWidth+this.itemMarginRight)+"px";
		    	elem.onmousemove=null;
		    	elem.onmouseleave=null;
		        }
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
	container.innerHTML='';
	let request=gapi.client.youtube.search.list({
		part:"snippet",
		type:"video",
		q:query.value,
		maxResults:20,
		order:"viewCount"
	})
    request.execute(function(response){
    let itemsArr=response.items.map((item)=>{
			return {
				title:item.snippet.title,
				description:item.snippet.description,
				channelId:item.snippet.channelId,
				channelTitle:item.channelTitle,
				id:item.id.videoId,
				imageUrl:item.snippet.thumbnails.medium.url
			}
		})
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
	 var box=new ItemsBoxObj(itemsArr); 

	})

	})
}


