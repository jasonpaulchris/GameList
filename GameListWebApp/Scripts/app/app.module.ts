import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import "rxjs/Rx";

import { AppComponent } from "./app.component";
import { ItemDetailComponent } from "./item-detail.component";
import { ItemListComponent } from "./item-list.component";

@NgModule({
    declarations: [
        AppComponent,
        ItemListComponent,
        ItemDetailComponent,
        ItemListComponent
    ],

    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule
    ],

    providers: [
        ItemService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }