import { AreasFromSubjectsSequelize } from "./models/subjects/areas";
import { AreaSubjectFromSubjectsSequelize } from "./models/subjects/areasSubjects";
import { ProgramFromSubjectsSequelize } from "./models/subjects/programs";
import { ProgramVersionFromSubjectsSequelize } from "./models/subjects/programSubject";
import { SubjectFromSubjectSequelize } from "./models/subjects/subject";
import { VersionFromSubjectsSequelize } from "./models/subjects/version";

export const DbSequelize = async () => {
    try {
        // Initialize Sequelize connection
        //areas
        //programs
        //subjects
        await AreasFromSubjectsSequelize.sync();
        await AreaSubjectFromSubjectsSequelize.sync();
        await ProgramVersionFromSubjectsSequelize.sync();
        await SubjectFromSubjectSequelize.sync();
        await VersionFromSubjectsSequelize.sync();
        await ProgramFromSubjectsSequelize.sync();
    } catch (error) {
        console.error("Error initializing database:", error);
    }
}
