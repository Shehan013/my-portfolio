export function validateEducation(data) {
    const { institution, degree, fieldOfStudy, startDate, endDate, description } = data;

     if (!institution || typeof institution !== 'string') {
         return "Institution is required and should be a string.";
    }
    if(!degree || typeof degree !== 'string') {
        return "Degree is required and should be a string.";
    }
    if(fieldOfStudy && typeof fieldOfStudy !== 'string' ) {
        return "Field of study should be a string.";
    }
    if(!startDate || !Date.parse(startDate)) {
        return "Start date is required and should be a valid date.";
    }
    if(endDate && !Date.parse(endDate)) {
        return "End date should be a valid date if provided.";
    }
    if(description && typeof description !== 'string') {
        return "Description should be a string.";
    }
    return null;
}