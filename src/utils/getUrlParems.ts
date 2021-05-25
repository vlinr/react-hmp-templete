
function getUrlParems(name:string){
    var reg:RegExp = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r:any = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]); return null;
}


export default getUrlParems;