var Department = require('./models/department');
var Subject = require('./models/subject');

var Preload = function () {
    var departmentName2Id = {};
    var departmentId2Name = {};
    var departmentNames = [];
    Department.find().exec().catch(err => { console.log(err); }).then(docs => {
        docs.forEach(doc => {
            departmentName2Id[doc.name] = doc.id;
            departmentId2Name[doc.id] = doc.name;
        });
        departmentNames = Object.keys(departmentName2Id);
        this.departmentInfo = {
            name2id: departmentName2Id,
            id2name: departmentId2Name,
            names: departmentNames
        }
        var subjectName2Id = {};
        var subjectId2Name = {};
        var subjectNames = [];
        Subject.find().exec().catch(err => { console.log(err); }).then(docs => {
            docs.forEach(doc => {
                subjectName2Id[doc.name] = doc.id;
                subjectId2Name[doc.id] = doc.name;
            });
            subjectNames = Object.keys(subjectName2Id);
            this.subjectInfo = {
                name2id: subjectName2Id,
                id2name: subjectId2Name,
                names: subjectNames
            }
        });
    });
}

module.exports = new Preload();


// Department.find().exec().catch(err => { console.log(err); }).then(docs => {
//     docs.forEach(doc => {
//         departmentName2Id[doc.name] = doc.id;
//         departmentId2Name[doc.id] = doc.name;
//     });
//     departmentNames = Object.keys(departmentName2Id);
//     departmentInfo = {
//         name2id: departmentName2Id,
//         id2name: departmentId2Name,
//         names: departmentNames
//     }

//     Subject.find().exec().catch(err => { console.log(err); }).then(docs => {
//         docs.forEach(doc => {
//             subjectName2Id[doc.name] = doc.id;
//             subjectId2Name[doc.id] = doc.name;
//         });
//         subjectNames = Object.keys(subjectName2Id);
//         subjectInfo = {
//             name2id: subjectName2Id,
//             id2name: subjectId2Name,
//             names: subjectNames
//         }
//         preload = {
//             departmentInfo: departmentInfo,
//             subjectInfo: subjectInfo
//         };
//         module.exports = preload;
//     });
// });
