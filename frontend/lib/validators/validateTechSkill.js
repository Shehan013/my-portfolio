export function validateTechSkill(data) {
    const { name, category, icon } = data;

    if (!name || typeof name !== 'string') {
        return "Name is required and should be a string.";
    }
    if (!category || typeof category !== 'string') {
        return "Category is required and should be a string.";
    }
    if (!icon || typeof icon !== 'string') {
        return "Icon Link is required and should be a string.";
    }
    return null;
}
