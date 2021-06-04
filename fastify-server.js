const students = [
    {
      id: 1,
      last: "Last1",
      first: "First1",
    },
    {
      id: 2,
      last: "Last2",
      first: "First2",
    },
    {
      id: 3,
      last: "Last3",
      first: "First3",
    }
  ];
const fastify = require("fastify")(); 


fastify.get("/cit/student", (request, reply) => {
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send (students)
})

fastify.get("/cit/student/:id", (request, reply) => {
    let loc = request.params.id;

    let student = locate(loc);
    if (student == -1) {
        reply
            .code(404)
            .header("Content-Type", "text/html; charset=utf-8")
            .send ("<h1>Student not located</h1>")

    }
    reply
        .code(200)
        .header("Content-Type", "application/json; charset=utf-8")
        .send (student)
})

fastify.post("/cit/student/add", (request, reply) => {

  let data = JSON.parse(request.body)
  console.log(data)
  reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send ("data received")
})


fastify.get("*", (request, reply) => {
    reply
        .code(200)
        .header("Content-Type", "text/html; charset=utf-8")
        .send ("<h1>wrong address</h1>")
})

const listenIP = "localhost";
const listenPort = 8080;
fastify.listen(listenPort, listenIP, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

function locate(loc) {
    let result = -1;
    for (let i = 0; i < students.length; i++) {
        if (students[i].id == loc) {
            result = students[i].first + ' ' +students[i].last;
            break;
        }
    }
    return result;
}

//console.log(locate(10))