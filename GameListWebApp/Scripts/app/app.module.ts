﻿import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AboutComponent } from "./about.component";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home.component";
import { ItemDetailComponent } from "./item-detail.component";
import { ItemListComponent } from "./item-list.component";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page-not-found.component";
import { ItemService } from "./item.service";
import { AppRouting } from "./app.routing";

@NgModule({
    declarations: [
        AboutComponent,
        AppComponent,
        HomeComponent,
        ItemListComponent,
        ItemDetailComponent,
        ItemListComponent,
        LoginComponent,
        PageNotFoundComponent
    ],

    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule,
        AppRouting
    ],

    providers: [
        ItemService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }