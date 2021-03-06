﻿import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "item-detail",
    template: `
        <div *ngIf="item" class="item-details">
        <h2>{{item.Title}} Detail View</h2>
        <ul>
            <li>
                <label>Title:</Label>
                <input [(ngModel)]="item.Title" placeholder="Insert the title..."/>
            </li>
            <li>
                <label>Description:</Label>
                <textarea [(ngModel)]="item.Description" placeholder="Insert the description..."/>
            </li>
        </ul>
        <div *ngIf="item.Id == 0" class="commands insert">
            <input type = "button" value = "Save" (click)="onInsert(item)"/>
            <input type = "button" value = "Cancel (click)="onBack()"/>
        </div>
        <div *ngIf="item.Id == 0" class="commands insert">
            <input type = "button" value = "Update" (click)="onUpdate(item)"/>
            <input type = "button" value = "Delete (click)="onDelete()"/>
            <input type = "button" value = "Back (click)="onBack()"/>
        </div>
        </div>
       
`
    ,
    styles: [`
        .item-details{
            margin: 5px;
            padding: 5px 10px;
            border: 1px solid black;
            background-color: #dddddd;
            width: 300px;
            }  
            .item-details * {
                vertical-align: middle;
            }
            .item-details ul li {
                padding: 5px 0;
            }
            `]
        })

export class ItemDetailEditComponent {
    constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.itemService.get(id).subscribe(
                item => this.item = item
            );
        }
        else if (id === 0) {
            console.log("id is 0: adding a new item...");
            this.item = new Item(0, "New Item", null);
        }
        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }
    }

    onInsert(item: Item) {
        this.itemService.add(item).subscribe(
            (data) => {
                this.item = data;
                console.log("item " + this.item.id + " has been added.");
                this.router.navigate([""]);
            },
            (error) => console.log(error)
        );
    }

    onBack() {
        this.router.navigate([""]);
    }

    onItemDetailEdit(item: Item) {
        this.router.navigate(["item/view", item.Id]);
    }
}
   