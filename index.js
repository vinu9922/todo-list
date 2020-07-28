const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
const dotenv = require('dotenv');
dotenv.config();


mongoose.set("useFindAndModify", false);

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => 
	{
		console.log("Connected to db!");
	});

app.set("view engine", "ejs");

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => 
	{
		TodoTask.find({}, (err, tasks) =>
		 {
		 	res.render("todo.ejs", { todoTasks: tasks });
		 });
		 
	});;

app.post('/',async (req, res) => 
{
	const todoTask = new TodoTask({
		content: req.body.content
	});
	try{
	 	await todoTask.save();res.redirect("/");
	 }
	  catch (err) {
	  	res.redirect("/");
	  }
});
app.route("/remove/:id").get((req, res) => {
	const id = req.params.id;TodoTask.findByIdAndRemove
	(id, err => 
		{
			if (err) return res.send(500, err);res.redirect("/")
		;});
});


app.listen(5000, () => console.log("Server Up and running"));