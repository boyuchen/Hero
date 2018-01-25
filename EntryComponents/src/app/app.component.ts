import {
  Component, ViewChild, ViewContainerRef, ComponentFactory,
  ComponentRef, ComponentFactoryResolver, OnDestroy
} from '@angular/core';
import { AlertComponent } from './exe-alert.component';

@Component({
  selector: 'app-root',
  template: `
    <ng-template #alertContainer></ng-template>
    <button (click)="createComponent('success')">Create success alert</button>
    <button (click)="createComponent('danger')">Create danger alert</button>
    <button (click)="insertComponent('insert',2)">insert success alert</button>
  `
})
export class AppComponent implements OnDestroy {
  componentRef: ComponentRef<AlertComponent>;

  @ViewChild("alertContainer", { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  createComponent(type: string) {
    //this.container.clear();
    const factory: ComponentFactory<AlertComponent> =
      this.resolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.type = type;
     this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
  }

  insertComponent(type: string,index:number) {
    //this.container.clear();
    const factory: ComponentFactory<AlertComponent> =
      this.resolver.resolveComponentFactory(AlertComponent);
    this.componentRef = this.container.createComponent(factory,index);
    this.componentRef.instance.type = type;
     this.componentRef.instance.output.subscribe((msg: string) => console.log(msg));
  }

  ngOnDestroy() {
    this.componentRef.destroy()
  }
}