export function validateProject(data) {
    const { projectName, techStack, role, startDate, endDate, description, contributions, link } = data;

    if (!projectName || typeof projectName !== 'string') {
        return "Project name is required and should be a string.";
    }
    if (!techStack || !Array.isArray(techStack)) {
        return "Tech stack is required and should be an array.";
    }
    if (!role || typeof role !== 'string') {
        return "Role is required and should be a string.";
    }
    if (!startDate || !Date.parse(startDate)) {
        return "Start date is required and should be a valid date.";
    }
    if (endDate && !Date.parse(endDate)) {
        return "End date should be a valid date if provided.";
    }
    if (!description || typeof description !== 'string') {
        return "Description is required and should be a string.";
    }
    if (!contributions || !Array.isArray(contributions)) {
        return "Contributions are required and should be an array.";
    }
    if (link && typeof link !== 'string') {
        return "Link should be a string if provided.";
    }
    return null;
}
