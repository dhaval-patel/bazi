import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

// import { HeroesComponent }      from './components/heroes/heroes.component';
// import { DashboardComponent }   from './components/dashboard/dashboard.component';
// import { HeroDetailComponent }  from './components/heroDetail/hero-detail.component';

import { ConnectPlayerComponent } from './components/connectplayer/connectplayer.component';
import { CreateGameComponent } from './components/creategame/creategame.component';
import { JoinGameComponent } from './components/joingame/joingame.component';
import { StartGameComponent } from './components/startgame/startgame.component';
import { PlayGameComponent } from './components/playgame/playgame.component';

import { SocketService } from './services/socket.service';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';

// import { HeroService }  from './services/hero.service';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        ConnectPlayerComponent,
        CreateGameComponent,
        JoinGameComponent,
        StartGameComponent,
        PlayGameComponent
    ],
    providers: [
        // HeroService
        SocketService,
        PlayerService,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
