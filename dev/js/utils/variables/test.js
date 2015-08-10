const parser = require('./parser');
var variables = [
	"$a = U[b + 1;20;2]",
	"$e = E{$a + 1, $a + 2, $a + 3}",
	"$c = c{'lala', 'lelel', 'lolo'}",
	"a = ads"
]
var output = parser.generateCode(variables);
{
		for(var i=0; i < output.result.length; i++){
			try{
				eval(code[i])
			} catch(exception) {
				console.log(`Error at line ${i + 1}: ${exception.message}`);
			}
		}


}
