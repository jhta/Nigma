const parser = require('./parser');
var variables = [
	"$a = U[1;20;2]",
	"$e = E{$a + 1, $a + 2, $a + 3}",
	"$c = c{'lala', 'lelel', 'lolo'}",
	"a = ads"
]
var output = parser.generateCode(variables);
console.log(output.result);
console.log(JSON.stringify(output.result, 2,2))
{
	var code = output.result.map(function(variable) {
		var variable = variable.variable;
		if(variable.code)
			return variable.code.join(';');
		else
			return null;
	});
	console.log(code);
	eval(code.join("\n"));
	console.log({
		a: $a,
		e: $e,
		c: $c
	});

}
