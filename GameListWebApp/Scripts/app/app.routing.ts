﻿import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from "./home.component";
import { AboutComponent } from "./about.component";
import { ItemDetailEditComponent } from "./item-detail-edit.component";
import { ItemDetailViewComponent } from "./item-detail-view.component";
import { LoginComponent } from "./login.component";
import { PageNotFoundComponent } from "./page-not-found.component";

const appRoutes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "home",
        redirectTo: ""
    },
    {
        path: "about",
        component: AboutComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "item/view:id",
        component: ItemDetailViewComponent
    },
    {
        path: "item/edit/:id",
        component: ItemDetailEditComponent
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

export const AppRoutingProviders: any[] = [
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);