const API_BASE_URL = 'http://localhost:5001/api';
async function apiCall(endpoint, method = 'GET', data = null) {
    const url = `${API_BASE_URL}${endpoint}`;
    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
    };
    if (data) options.body = JSON.stringify(data);

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Make API available globally
window.api = {
    health: () => apiCall('/health'),

    electricity: {
        calculate: (data) => apiCall('/electricity/calculate', 'POST', data),
    },

    water: {
        calculate: (data) => apiCall('/water/calculate', 'POST', data),
    },

    cleaning: {
        analyze: (data) => apiCall('/cleaning/analyze', 'POST', data),
    },

    analysis: {
        history: () => apiCall('/analysis/history'),
        summary: () => apiCall('/analysis/summary'),
    },

    achievements: {
        getAll: () => apiCall('/achievements'),
    },
};

console.log('✅ EcoSense API Ready on port 5001');
