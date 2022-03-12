export const ObjectUtils = {
    copy: data => {
        try {
            if(!data) return data
            return JSON.parse(JSON.stringify(data));
        } catch (error) {
            console.log("object-utils got error during object copy", error);
            return null;
        }
    }
}