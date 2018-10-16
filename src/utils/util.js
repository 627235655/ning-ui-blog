class Util {

	init() {
		String.prototype.firstUpperCase = function(){
		    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
		        return $1.toUpperCase() + $2.toLowerCase();
		    });
		}
	}

	firstUpperCase(str) {
	  return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
	}
}
let util = new Util();
util.init();
export default util;