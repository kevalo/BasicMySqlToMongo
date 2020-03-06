document.getElementById("btn").addEventListener("click", function(){

	let mysql = document.getElementById("mysql").value;
	let mongo = "";

	if(!mysql){
		return;
	}

	mysql = mysql.split(";");
	for (let i = 0; i < mysql.length; i++) {
		let line = mysql[i];
		if(!line){
			continue;
		}
		let mongoLine = "";
		if(line.indexOf("update") !== -1){
			// Get the table name
			let tableName = line.replace(/\n/g, "").match(/^update\s[A-z]*/);
			if(!tableName){
				alert("Could not get table name on line "+(i+1));
				return;
			}
			tableName = tableName[0].split(" ");
			mongoLine = `db.${tableName[1]}.update(`;

			// Get the condition
			let condition = line.match(/where([A-z\s=0-9]*)/);
			if(condition){
				condition = condition[0].replace("where", "").replace(/\s/g, "").split("=");
				mongoLine += `{${condition[0]}:${condition[1]}},{$set:{`;
			}else{
				mongoLine += `{},{$set:{`;
			}

			// Get the fields to update
			let fields = line.match(/set([A-z\s='"0-9@\.,]*\swhere)/);
			if(fields){
				fields = fields[0].replace("where", "").replace("set", "").replace(/\s/g, "").split(",");
				for (let j = 0; j < fields.length; j++) {
					let field = fields[j].split("=");
					mongoLine += `${field[0]}:${field[1]},`;
				}
				mongoLine = mongoLine.replace(/\,$/, "").replace(/\'/g, '"');
			}

			mongoLine += "}});\n";
			
		}else if(line.indexOf("delete") !== -1){
			// Get the table name
			let tableName = line.replace(/\n/g, "").match(/^delete from\s[A-z]*/);
			if(!tableName){
				alert("Could not get table name on line"+(i+1));
				return;
			}
			tableName = tableName[0].split(" ");
			mongoLine = `db.${tableName[2]}.remove(`;

			// Get the condition
			let condition = line.match(/where([A-z\s=0-9\'@\.-]*)/);
			if(condition){
				condition = condition[0].replace("where", "").replace(/\s/g, "").split("=");
				mongoLine += `{${condition[0]}:{$eq:${condition[1].replace(/\'/g, '"')}}}`;
			}
			mongoLine += ");\n";
		}
		mongo += mongoLine;
	}
	document.getElementById("mongo").value = mongo;
});