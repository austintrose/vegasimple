let express = require('express')
    ,router = express.Router()
    ;

router.get('/', function(req, res) {
    res.render('home', {
        test: 'abc'
    })
}


// Check the session object to know if they're already logged in. If so,
// update that object with the latest copy from the database. Otherwise
// just render the login page.
// function update_session_user_model(req, res, callback) {
//     if (req.session.currentStudent) {
//         models.Student.find({
//             where: {
//                 id: req.session.currentStudent.id
//             },
//             include: [{all: true}]
//         }).then(function(student) {
//             req.session.currentStudent = student.get({plain: true});
//             callback(student, true);
//         });
//
//     } else if (req.session.currentProfessor) {
//         models.Professor.find({
//             where: {
//                 id: req.session.currentProfessor.id
//             },
//             include: [{all: true}]
//         }).then(function(professor) {
//             req.session.currentProfessor = professor.get({plain: true});
//             callback(professor, false);
//         });
//     } else {
//         res.render('login');
//     }
// }

// This should hopefully not happen much.
// Force the database schema to match the models.
// router.get('/sync', function (req, res) {
//     models.sequelize.sync({force: true}).then(function() {
//         res.status(200).json({sync: 'done'});
//     });
// });

// Just go to your home!
);

// // Redirect index to either student homepage, professor homepage, or login.
// router.get('/home', function(req, res) {
//     update_session_user_model(req, res, function(user, is_student) {
//         res.render('home', {
//             student_role: is_student,
//             id: user.id,
//             name: user.name,
//             profile: user.profile,
//             img_url: user.img_url,
//             courses: user.Courses
//         });
//     });
// });

// router.get('/courses/:id', function (req, res) {
//     update_session_user_model(req, res,  function(user, is_student) {
//         models.Course.find({
//             where: {
//                 id: req.params.id
//             },
//             include: [{all: true}]
//         }).then(function(course) {
//             var c = course.get({plain: true});
//             res.render('course', {
//                 name: c.name,
//                 course_id: c.id,
//                 description: c.description,
//                 created: c.createdAt.toString(),
//                 user_id: user.id,
//                 students: c.Students,
//                 student_role: is_student,
//                 professor: c.Professor
//             })
//         });
//     });
// });

// router.get('/courses/:id/game', function(req, res) {
//     models.Course.find({
//         where: {
//             id: req.params.id
//         },
//         include: [{all: true}]
//     }).then(function(course) {
//         var c = course.get({plain: true});
//         res.render('name_game', {
//             course: c,
//             students: c.Students,
//             students_count: c.Students.length
//         });
//     });
// });

// router.post('/courses/add', function(req, res) {
//     var professor_id = req.session.currentProfessor.id;
//     var course_name = req.body.name;
//     var course_description = req.body.description;
//
//     models.Course.find({
//         where: {
//             name: course_name,
//             ProfessorId: professor_id,
//         }
//     }).then(function(course) {
//         if (course) {
//             res.redirect('/courses');
//         } else {
//             models.Course.create({
//                 name: course_name,
//                 description: course_description,
//                 ProfessorId: professor_id,
//             }).then(function(course) {
//                 res.redirect('/courses');
//             });
//         }
//     })
// });

// router.post('/courses/all', function(req, res) {
//     var course_id = req.body.course_id;
//     var student_id = req.body.student_id;
//
//     models.Course.find({
//         where: {
//             id: course_id
//         }
//     }).then(function(course) {
//         models.Student.find({
//             where: {
//                 id: student_id
//             }
//         }).then(function(student) {
//             course.addStudent(student);
//             res.json(course);
//         });
//     });
// });
//
// router.post('/courses/drop', function(req, res) {
//     var course_id = req.body.course_id;
//     var student_id = req.body.student_id;
//
//     models.Course.find({
//         where: {
//             id: course_id
//         }
//     }).then(function(course) {
//         models.Student.find({
//             where: {
//                 id: student_id
//             }
//         }).then(function(student) {
//             course.removeStudent(student);
//             res.json(course.get({plain: true}));
//         });
//     });
// });
//
// router.post('/login', function(req, res) {
//     if (req.body.role === 'student') {
//         // Get or create student instance, save it to session.
//         models.Student.find({
//             where: {
//                 name: req.body.name
//             },
//             include: [{all: true}]
//         }).then(function(student) {
//             if (student) {
//                 req.session.currentStudent = student.get({plain: true});
//                 res.redirect('/home');
//             } else {
//                 models.Student.create({
//                     name: req.body.name,
//                 }).then(function(student) {
//                     req.session.currentStudent = student.get({plain: true});
//                     res.redirect('/home');
//                 });
//             }
//         });
//     }
//
//     else if (req.body.role === 'professor') {
//         // Get or create professor instance, save it to session.
//         models.Professor.find({
//             where: {
//                 name: req.body.name,
//             }
//         }).then(function(professor) {
//             if (professor) {
//                 req.session.currentProfessor = professor.get({plain: true});
//                 res.redirect('/');
//             } else {
//                 models.Professor.create({
//                     name: req.body.name,
//                 }).then(function(professor) {
//                     req.session.currentProfessor = professor.get({plain: true});
//                     res.redirect('/');
//                 });
//             }
//         });
//     }
//
//     else {
//         res.status(500);
//     }
// });
//
//
// router.get('/logout', function(req, res) {
//     req.session.currentStudent = false;
//     req.session.currentProfessor = false;
//     res.redirect('/');
// });
//
//
// // Update the attributes on a student.
// router.post('/student', function(req, res) {
//     var student_id = req.session.currentStudent.id;
//     models.Student.find({
//         where: {
//             id: student_id,
//         }
//     }).then(function(student) {
//         if (student) {
//             student.updateAttributes({
//                 name: student.name,
//                 profile: req.body.profile,
//                 img_url: req.body.img_url,
//             }).then(function(student) {
//                 req.session.currentStudent = student.get({plain: true});
//                 res.redirect('/');
//             });
//         }
//     });
// });
//
// // Update the attributes on a professor.
// router.post('/professor', function(req, res) {
//     var professor_id = req.session.currentProfessor.id;
//     models.Professor.find({
//         where: {
//             id: professor_id,
//         }
//     }).then(function(professor) {
//         if (professor) {
//             professor.updateAttributes({
//                 name: professor.name,
//                 profile: req.body.profile,
//                 img_url: req.body.img_url,
//             }).then(function(professor) {
//                 req.session.currentProfessor = professor.get({plain: true});
//                 res.redirect('/');
//             });
//         }
//     });
// });
//
// router.get('/students/:id', function(req, res){
//     models.Student.find({
//         where: {
//             id: req.params.id
//         }
//     }).then(function(student){
//         res.render('student', {
//             name: student.name,
//             profile: student.profile,
//             img_url: student.img_url,
//         });
//     });
// });

//router.post('/api/students', function(req, res) {
//  models.Student.find({
//    where: {
//      name: req.body.name,
//    }
//  }).then(function(student) {
//    if (student) {
//      res.json(student);
//    } else {
//      models.Student.create({
//        name: req.body.name,
//      }).then(function(student) {
//        res.json(student);
//      });
//    }
//  });
//});

// get all todos
//router.get('/todos', function(req, res) {
//  models.Todo.findAll({}).then(function(todos) {
//    res.json(todos);
//  });
//});
//
//// get single todo
//router.get('/todo/:id', function(req, res) {
//  models.Todo.find({
//    where: {
//      id: req.params.id
//    }
//  }).then(function(todo) {
//    res.json(todo);
//  });
//});
//
//// add new todo
//router.post('/todos', function(req, res) {
//  models.Todo.create({
//    title: req.body.title,
//    UserId: req.body.user_id
//  }).then(function(todo) {
//    res.json(todo);
//  });
//});
//
//// update single todo
//router.put('/todo/:id', function(req, res) {
//  models.Todo.find({
//    where: {
//      id: req.params.id
//    }
//  }).then(function(todo) {
//    if(todo){
//      todo.updateAttributes({
//        title: req.body.title,
//        complete: req.body.complete
//      }).then(function(todo) {
//        res.send(todo);
//      });
//    }
//  });
//});
//
//// delete a single todo
//router.delete('/todo/:id', function(req, res) {
//  models.Todo.destroy({
//    where: {
//      id: req.params.id
//    }
//  }).then(function(todo) {
//    res.json(todo);
//  });
//});

module.exports = router;