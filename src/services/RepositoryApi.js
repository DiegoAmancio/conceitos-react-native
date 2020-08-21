import Api from './api';

export const getRepositories = () => Api.get('/repositories');
export const addLike = (id) => Api.post(`/repositories/${id}/like`);
