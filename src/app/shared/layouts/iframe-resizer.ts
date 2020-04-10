// based on https://stackoverflow.com/questions/42762295/angular2-application-embedded-in-iframe-resize-event
import { Directive, ElementRef, OnInit, Renderer2 } from "@angular/core";

@Directive({
    selector: "[iframeAutoHeight]"
})
export class IframeAutoHeightDirective implements OnInit {
    private el: any;
    private renderer: Renderer2;
    private prevHeight: number;
    private sameCount: number;

    constructor(_elementRef: ElementRef, _renderer: Renderer2) {
        this.el = _elementRef.nativeElement;
        this.renderer = _renderer;
    }

    ngOnInit() {
        const self = this;
        if (this.el.tagName === "IFRAME") {
            this.renderer.listen(this.el, "load", () => {
    setTimeout(() => {
        self.setHeight();
    }, 50);
});
        }
    }

    setHeight() {
        const self = this;
        this.el.contentWindow.document.body.background = "white";
        this.el.contentWindow.document.body.height = this.el.contentWindow.document.body.scrollHeight;
            this.renderer.setStyle(self.el, "height", this.el.contentWindow.document.body.scrollHeight + 20 + "px");

    }
}