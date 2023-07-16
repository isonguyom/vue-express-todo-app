import express from "express";
const router = express.Router();
const todos = [
  { id: 101, todo: "First todo item" },
  { id: 102, todo: "2nd todo item" },
  { id: 103, todo: "3rd todo item" },
];

router
  .route("/")
  .get(function (req, res) {
    res.json(todos);
  })

  .post(function (req, res) {
    //Check if all fields are provided and are valid:
    try {
      todos.push({
        id: 100 + todos.length + 1,
        todo: req.body.todo,
      });
      res.json({ message: "New todo added." });
    } catch (error) {
      res.status(400);
      res.json({ message: "Bad Request" });
    }
  });

router
  .route("/:id")
  .get(function (req, res) {
    let currentTodo = todos.filter(function (todo) {
      if (todo.id == req.params.id) {
        return true;
      }
    });
    if (currentTodo.length == 1) {
      res.json(currentTodo[0]);
    } else {
      res.status(404); //Set status to 404 as movie was not found
      res.json({ message: "Not Found" });
    }
  })

  .put(function (req, res) {
    //Check if all fields are provided and are valid:
    try {
      //Gets us the index of movie with given id.
      let updateIndex = todos
        .map(function (todo) {
          return todo.id;
        })
        .indexOf(parseInt(req.params.id));

      if (updateIndex === -1) {
        //Movie not found, create new
        todos.push({
          id: parseInt(req.params.id),
          todo: req.body.todo,
        });
        res.json({
          message: "New todo added.",
        });
      } else {
        //Update existing movie
        todos[updateIndex] = {
          id: parseInt(req.params.id),
          todo: req.body.todo,
        };
        res.json({
          message: "Todo updated.",
        });
      }
    } catch (error) {
      res.status(400);
      res.json({ message: "Bad Request" });
    }
  })

  .delete(function (req, res) {
    let removeIndex = todos
      .map(function (todo) {
        return todo.id;
      })
      .indexOf(parseInt(req.params.id)); //Gets us the index of todo with given id.
    try {
      todos.splice(removeIndex, 1);
      res.send({ message: "Todo removed." });
    } catch (error) {
      res.json({ message: "Not found" });
    }
  });

//Routes will go here
export default router;
