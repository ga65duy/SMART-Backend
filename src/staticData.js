"use strict";

//Static variables to use in other modules
const fieldOfStudy = ['Informatics', 'Biomedical Computing','Computatuinal Science and Engineering','Robotics Cognition Intelligence','Data Engineering and Analytics','Bioinformatics','Information Systems','Games Engineering', ].sort(function (a, b) {
    return (a < b) ? -1 : (a > b) ? 1 : 0;
});

const degree = ['Bachelor', 'Master'];

module.exports = {
    fieldOfStudy,
    degree
};

