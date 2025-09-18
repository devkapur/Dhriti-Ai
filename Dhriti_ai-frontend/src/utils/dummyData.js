export const stats = [
    { id: 'activeProjects', label: 'Total Active Projects', value: 24, trend: '+3.4%', icon: '📁' },
    { id: 'totalTasksAdded', label: 'Total Tasks Added', value: 1280, trend: '+1.2%', icon: '➕' },
    { id: 'totalTasksAllocated', label: 'Total Tasks Allocated', value: 1160, trend: '+0.8%', icon: '📌' },
    { id: 'tasksNotStarted', label: 'Tasks Not Started', value: 140, trend: '-0.6%', icon: '⏳' },
    { id: 'tasksCompleted', label: 'Tasks Completed', value: 980, trend: '+4.1%', icon: '✅' },
    { id: 'activeTasks', label: 'Active Tasks', value: 180, trend: '+2.0%', icon: '⚙️' },
    { id: 'avgDailyCompletion', label: 'Avg Daily Task Completion', value: 72, trend: '+1.8%', icon: '📈' },
    { id: 'avgTaskingTime', label: 'Avg Tasking Time (min)', value: 12.4, trend: '-0.5%', icon: '⏱️' },
]

export const users = {
    admins: [
        { id: 1, name: 'Aarav Patel', email: 'aarav@dhriti.ai', phone: '+1 555-0101', status: 'Active' },
        { id: 2, name: 'Diya Sharma', email: 'diya@dhriti.ai', phone: '+1 555-0102', status: 'Active' },
    ],
    experts: [
        { id: 3, name: 'Kabir Mehta', email: 'kabir@dhriti.ai', phone: '+1 555-0201', status: 'Active' },
        { id: 4, name: 'Isha Rao', email: 'isha@dhriti.ai', phone: '+1 555-0202', status: 'Inactive' },
    ],
    vendors: [
        { id: 5, name: 'Rohan Gupta', email: 'rohan@vendor.com', phone: '+1 555-0301', status: 'Active' },
        { id: 6, name: 'Sneha Nair', email: 'sneha@vendor.com', phone: '+1 555-0302', status: 'Active' },
    ],
}

export const projects = [
    { id: 1, name: 'VisionAI Labeling', status: 'Active', tasksAdded: 420, tasksCompleted: 360, association: 'Internal' },
    { id: 2, name: 'NLP Taxonomy', status: 'Paused', tasksAdded: 210, tasksCompleted: 150, association: 'Client: ZenCorp' },
    { id: 3, name: 'Speech Corpus', status: 'Active', tasksAdded: 320, tasksCompleted: 290, association: 'Client: Soniq' },
    { id: 4, name: 'OCR Pipeline', status: 'Completed', tasksAdded: 190, tasksCompleted: 190, association: 'Internal' },
]