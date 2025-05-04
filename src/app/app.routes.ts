import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'selection',
        loadComponent: () => import('./pages/selection-page/selection-page.component'),
    },
    {
        path: 'quiz-game',
        loadComponent: () => import('./pages/main-quiz-page/main-quiz-page.component'),
    },
    {
        path: 'results',
        loadComponent: () => import('./pages/results-page/results-page.component'),
    },
    {
        path: '**',
        redirectTo: 'selection'
    }
];
