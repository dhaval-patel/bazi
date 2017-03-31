import { Routes, RouterModule } from '@angular/router';

// import { DashboardComponent }   from './components/dashboard/dashboard.component';
// import { HeroesComponent }      from './components/heroes/heroes.component';
// import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';


import { ConnectPlayerComponent } from './components/connectplayer/connectplayer.component';
import { CreateGameComponent } from './components/creategame/creategame.component';
import { JoinGameComponent } from './components/joingame/joingame.component';
import { StartGameComponent } from './components/startgame/startgame.component';
import { PlayGameComponent } from './components/playgame/playgame.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/connectplayer',
        pathMatch: 'full'
    },
    {
        path: 'connectplayer',
        component: ConnectPlayerComponent
    },
    {
        path: 'creategame',
        component: CreateGameComponent
    },
    {
        path: 'joingame/:gameId',
        component: JoinGameComponent
    },
    {
        path: 'startgame/:gameId',
        component: StartGameComponent
    },
    {
        path: 'playgame/:gameId',
        component: PlayGameComponent
    }
    // ,
    // {
    //   path: 'playgame/:id',
    //   component: PlayGameComponent
    // }
    //,
    // {
    //   path: 'heroes',
    //   component: HeroesComponent
    // }
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });
