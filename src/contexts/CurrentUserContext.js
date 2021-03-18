import React from 'react';
//Текущий пользовательский контекст
//createContext() специальный способ передачи данных одновременно во все компоненты поддерева или даже всего приложения. Этот метод возвращает новый объект контекста.
export const CurrentUserContext = React.createContext();