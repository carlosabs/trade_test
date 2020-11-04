import {AfterViewInit, Component, ViewChild, ViewContainerRef} from "@angular/core";
import {ICellEditorAngularComp} from "ag-grid-angular";
import { UserService } from '../services/user.service';

@Component({
    selector: 'dropdown-cell-editor',
    templateUrl: "drop.down.editor.html"
})
export class DropDownEditor implements ICellEditorAngularComp, AfterViewInit {
    private params: any;
    public value: number;
    private options: any;
    public name: string;
    public selected: string = "";

    constructor(private userService: UserService) {

      }

    @ViewChild('input', {read: ViewContainerRef}) public input;

    agInit(params: any): void {
        this.params = params;
        this.value = this.params.value;
        this.options = params.options;
    }

    selectOption(id: HTMLSelectElement) {
        this.selected = id.options[id.selectedIndex].text;
        this.userService.idCounterparty = Number(this.value);
      }

    getValue(): any {

        return this.selected;
    }

    ngAfterViewInit() {
        window.setTimeout(() => {
            this.input.element.nativeElement.focus();
        })
    }

}