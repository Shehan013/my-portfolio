export function validateLeadership(data) {
    const { role, organization, startDate, endDate, description } = data;

    if(!role || typeof role !== 'string'){
        return "Role is required and should be a string.";
    }

    if(!organization || typeof organization !== 'string'){
        return "Organization is required and should be a string.";
    }

    if(!startDate || !Date.parse(startDate)){       
        return "Start Date is required and should be a valid date.";
    }

    if(endDate && !Date.parse(endDate)){
        return "End Date should be a valid date if provided.";
    }

    if(description && typeof description !== 'string'){
        return "Description should be a string if provided.";
    }

    return null; // No validation errors
}