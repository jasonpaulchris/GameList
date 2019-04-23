import { Component, OnInit } from "@angular/core";
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

export class ItemDetailComponent {
    constructor(private itemService: ItemService, private router: Router, private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        var id = +this.activatedRoute.snapshot.params["id"];
        if (id) {
            this.itemService.get(id).subscribe(
                item => this.item = item
            );
        }

        else {
            console.log("Invalid id: routing back to home");
            this.router.navigate([""]);
        }
    }
}
   