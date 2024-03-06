export const maskCPF = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement) {
        // check if greater than 14, return only first 14 chars
        e.target.value = e.target.value.slice(0, 14);
        // only allow digits
        e.target.value = e.target.value.replace(/[^0-9.-]/g, '');
        // Define regex patterns for different stages of CPF length
        const patterns = {
            // Matches strings up to 3 digits
            upTo3: /^(\d{3})$/,
            // Matches strings up to 6 digits, considering an optional dot after the first 3 digits
            upTo6: /^(\d{3})\.?(\d{3})$/,
            // Matches strings up to 9 digits, considering optional dots
            upTo9: /^(\d{3})\.?(\d{3})\.?(\d{3})$/,
            // Matches the full CPF, considering optional dots and a dash
            full: /^(\d{3})\.?(\d{3})\.?(\d{3})-?(\d{2})$/
        };
        // Partially apply formatting based on the current length of the input
        if (patterns.upTo3.test(e.target.value)) {
            e.target.value = e.target.value.replace(patterns.upTo3, "$1");
        } else if (patterns.upTo6.test(e.target.value)) {
            e.target.value = e.target.value.replace(patterns.upTo6, "$1.$2");
        } else if (patterns.upTo9.test(e.target.value)) {
            e.target.value = e.target.value.replace(patterns.upTo9, "$1.$2.$3");
        } else {
            e.target.value = e.target.value.replace(patterns.full, "$1.$2.$3-$4");
        }
        console.log(e.target.value)
    }
    
}