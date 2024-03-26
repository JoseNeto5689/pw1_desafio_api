export type User = {
    id: string,
    name: string,
    user_name: string,
    technologies: Technology[]
}

export type Technology = {
    id: string, 
    title: string,
    studied: boolean,
    deadline: Date,
    created_at: Date
}