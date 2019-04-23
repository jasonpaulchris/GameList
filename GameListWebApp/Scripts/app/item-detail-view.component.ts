import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute} from "@angular/router";
import { Item } from "./item";
import { ItemService } from "./item.service";

@Component({
    selector: "item-detail-view",
    template: `
        <div *ngIf="item" class="item-container">
        <div class="item-tab-menu">
        <span (click)="onItemDetailEdit(item)">Edit</span>
        <span class="selected">View</span>
        </div>
        <div class="item-details">
        <div class="mode">Display Mode</div>
        <h2>{{item.Title}}</h2>
        <p>{{Item.Description}}</p>
        </div> 
        </div>
`,
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

export class ItemDetailViewComponent {
    item: Item;

    constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnIt() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.itemService.get(id).subscribe(item => this.item = item);
        }
        else if (id === 0) {
            console.log("id is 0: switching to edit");
            this.router.navigate(["item/edit", 0]);
        }
        else {
            console.log("invalid id: routing back home");
            this.router.navigate([""]);
        }   
    }

    onItemDetailEdit(item: Item) {
        this.router.navigate(["item/edit", item.Id]);
    }
}